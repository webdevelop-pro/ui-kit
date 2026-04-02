/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  defineComponent,
  nextTick,
  ref,
} from 'vue';
import VTabs from './VTabs.vue';

vi.mock('radix-vue', () => ({
  TabsRoot: defineComponent({
    name: 'TabsRoot',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    template: '<div data-testid="tabs-root"><slot /></div>',
  }),
  useForwardPropsEmits: (props: unknown) => props,
}));

const mountTabsWithModel = (activeTab: ReturnType<typeof ref<string>>) => mount(defineComponent({
  components: {
    VTabs,
  },
  setup() {
    return { activeTab };
  },
  template: `
    <VTabs
      v-model="activeTab"
      default-value="all"
      query-key="notification-tab"
      tabs-to-url
    />
  `,
}));

const flushWatchers = async () => {
  await nextTick();
  await nextTick();
};

describe('VTabs', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/notifications');
  });

  it('keeps the initial tab from the URL instead of overwriting it with the default model value', async () => {
    window.history.replaceState({}, '', '/notifications?notification-tab=accounts');
    const activeTab = ref('all');

    const wrapper = mountTabsWithModel(activeTab);

    await flushWatchers();

    expect(activeTab.value).toBe('accounts');
    expect(window.location.search).toBe('?notification-tab=accounts');

    wrapper.unmount();
  });

  it('still syncs later parent model changes back into the URL', async () => {
    window.history.replaceState({}, '', '/notifications?notification-tab=accounts');
    const activeTab = ref('all');

    const wrapper = mountTabsWithModel(activeTab);

    await flushWatchers();

    activeTab.value = 'investments';
    await flushWatchers();

    expect(window.location.search).toBe('?notification-tab=investments');

    wrapper.unmount();
  });

  it('removes the tab query on unmount without clearing history state', async () => {
    const historyState = { preserve: 'me' };

    window.history.replaceState(historyState, '', '/notifications?notification-tab=accounts');

    const activeTab = ref('accounts');
    const wrapper = mountTabsWithModel(activeTab);

    await flushWatchers();
    wrapper.unmount();

    expect(window.location.search).toBe('');
    expect(window.history.state).toEqual(historyState);
  });
});
