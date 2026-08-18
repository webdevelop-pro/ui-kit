/* @vitest-environment jsdom */

import { mount } from '@vue/test-utils';
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  nextTick,
  reactive,
} from 'vue';
import type {
  UseSyncWithUrlRouteLike,
  UseSyncWithUrlRouterLike,
} from 'UiKit/composables/useSyncWithUrl';

vi.mock('UiKit/components/Base/VButton/VButton.vue', () => ({
  default: {
    name: 'VButton',
    emits: ['click'],
    template: '<button type="button" @click="$emit(\'click\', $event)"><slot /></button>',
  },
}));

vi.mock('UiKit/components/Base/VForm/VFormCheckboxGroup.vue', () => ({
  default: {
    name: 'VFormCheckboxGroup',
    props: {
      modelValue: {
        type: Array,
        default: () => [],
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['update:modelValue'],
    methods: {
      toggle(option: string) {
        const modelValue = Array.isArray(this.modelValue) ? this.modelValue : [];
        const nextValue = modelValue.includes(option)
          ? modelValue.filter((value: string) => value !== option)
          : [...modelValue, option];

        this.$emit('update:modelValue', nextValue);
      },
    },
    template: `
      <div class="checkbox-group-stub">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          :data-option="option"
          @click="toggle(option)"
        >
          {{ option }}
        </button>
      </div>
    `,
  },
}));

vi.mock('UiKit/assets/images/filter.svg', () => ({
  default: {
    name: 'FilterIconMock',
    template: '<span data-testid="filter-icon" />',
  },
}));

import VFilter, { type IVFilter } from './VFilter.vue';

const flushComponent = async () => {
  await nextTick();
  await nextTick();
};

const getButtonByText = (wrapper: ReturnType<typeof mount>, text: string) => {
  const match = wrapper.findAll('button').find((button) => button.text().trim() === text);

  if (!match) {
    throw new Error(`Button "${text}" not found`);
  }

  return match;
};

const buildFilter = (overrides: Partial<IVFilter> = {}): IVFilter => ({
  value: 'status',
  title: 'By status:',
  options: ['Success', 'Pending'],
  model: [],
  ...overrides,
});

beforeAll(() => {
  Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  });
});

describe('VFilter', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/table');
  });

  it('hydrates applied filters from the URL and canonicalizes the query', async () => {
    window.history.replaceState(
      {},
      '',
      '/table?portfolio-filter-status=Pending&portfolio-filter-status=Success&portfolio-filter-status=Unknown',
    );

    const wrapper = mount(VFilter, {
      props: {
        items: [buildFilter()],
        filtersToUrl: true,
        queryKey: 'portfolio-filter',
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[buildFilter({ model: ['Success', 'Pending'] })]],
    ]);
    expect(window.location.search).toBe(
      '?portfolio-filter-status=Success&portfolio-filter-status=Pending',
    );
    expect(wrapper.text()).toContain('(2)');
  });

  it('updates the URL once when Apply is clicked and preserves unrelated params', async () => {
    window.history.replaceState({}, '', '/table?tab=all');

    const wrapper = mount(VFilter, {
      props: {
        items: [
          buildFilter({ options: ['Read', 'Unread'] }),
          buildFilter({
            value: 'type',
            title: 'By tag:',
            options: ['Wallet', 'System'],
          }),
        ],
        filtersToUrl: true,
        queryKey: 'notification-filter',
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();
    await wrapper.get('button').trigger('click');
    await wrapper.get('[data-option="Unread"]').trigger('click');
    await wrapper.get('[data-option="Wallet"]').trigger('click');
    await getButtonByText(wrapper, 'Apply').trigger('click');
    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[
        buildFilter({ options: ['Read', 'Unread'], model: ['Unread'] }),
        buildFilter({
          value: 'type',
          title: 'By tag:',
          options: ['Wallet', 'System'],
          model: ['Wallet'],
        }),
      ]],
    ]);
    expect(window.location.search).toBe(
      '?tab=all&notification-filter-status=Unread&notification-filter-type=Wallet',
    );
  });

  it('clears its own query params without touching unrelated search params', async () => {
    window.history.replaceState(
      {},
      '',
      '/table?tab=all&distribution-filter-status=Pending',
    );

    const wrapper = mount(VFilter, {
      props: {
        items: [buildFilter()],
        filtersToUrl: true,
        queryKey: 'distribution-filter',
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();
    await wrapper.get('button').trigger('click');
    await getButtonByText(wrapper, 'Clear Selected').trigger('click');
    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[buildFilter({ model: ['Pending'] })]],
      [[buildFilter()]],
    ]);
    expect(window.location.search).toBe('?tab=all');
  });

  it('reapplies filters when the location changes after mount', async () => {
    const wrapper = mount(VFilter, {
      props: {
        items: [buildFilter()],
        filtersToUrl: true,
        queryKey: 'distribution-filter',
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();
    window.history.replaceState({}, '', '/table?distribution-filter-status=Pending');
    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[buildFilter({ model: ['Pending'] })]],
    ]);
  });

  it('hydrates the active filter set when the available filters change', async () => {
    window.history.replaceState({}, '', '/table?wallet-filter-transactionType=Deposit');

    const wrapper = mount(VFilter, {
      props: {
        items: [
          buildFilter({
            value: 'holdingType',
            title: 'By holding type:',
            options: ['RWA', 'Stable Coin'],
          }),
        ],
        filtersToUrl: true,
        queryKey: 'wallet-filter',
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();
    expect(wrapper.emitted('apply')).toBeUndefined();

    await wrapper.setProps({
      items: [
        buildFilter({
          value: 'transactionType',
          title: 'By transaction type:',
          options: ['Deposit', 'Withdrawal'],
        }),
      ],
    });
    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[buildFilter({
        value: 'transactionType',
        title: 'By transaction type:',
        options: ['Deposit', 'Withdrawal'],
        model: ['Deposit'],
      })]],
    ]);
  });

  it('supports router-backed filter syncing through component props', async () => {
    const route = reactive<UseSyncWithUrlRouteLike>({
      hash: '#notifications',
      query: {
        tab: 'all',
        'notification-filter-status': 'Pending',
      },
    });
    const router: UseSyncWithUrlRouterLike = {
      push: vi.fn((location) => {
        route.hash = location.hash ?? '';
        route.query = { ...(location.query ?? {}) };
        return Promise.resolve();
      }),
      replace: vi.fn((location) => {
        route.hash = location.hash ?? '';
        route.query = { ...(location.query ?? {}) };
        return Promise.resolve();
      }),
    };

    const wrapper = mount(VFilter, {
      props: {
        items: [buildFilter()],
        filtersToUrl: true,
        queryKey: 'notification-filter',
        urlSyncAdapter: 'router',
        route,
        router,
      },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    await flushComponent();

    expect(wrapper.emitted('apply')).toEqual([
      [[buildFilter({ model: ['Pending'] })]],
    ]);
    expect(route.query['notification-filter-status']).toBe('Pending');
  });
});
