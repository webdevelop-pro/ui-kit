/* @vitest-environment jsdom */
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
import VDialog from './VDialog.vue';

vi.mock('radix-vue', () => ({
  DialogRoot: defineComponent({
    name: 'DialogRoot',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:open'],
    template: '<div class="dialog-root" :data-open="String(open)"><slot /></div>',
  }),
  useForwardPropsEmits: (props: unknown) => props,
}));

const flushWatchers = async () => {
  await nextTick();
  await nextTick();
};

const mountSharedPopupDialogs = () => {
  const logoutOpen = ref(false);
  const contactUsOpen = ref(false);
  const wrapper = mount(defineComponent({
    components: {
      VDialog,
    },
    setup() {
      return {
        contactUsOpen,
        logoutOpen,
      };
    },
    template: `
      <div>
        <VDialog
          v-model:open="logoutOpen"
          query-key="popup"
          query-value="log-out"
        >
          <span>Logout</span>
        </VDialog>
        <VDialog
          v-model:open="contactUsOpen"
          query-key="popup"
          query-value="contact-us"
        >
          <span>Contact us</span>
        </VDialog>
      </div>
    `,
  }));

  return {
    contactUsOpen,
    logoutOpen,
    wrapper,
  };
};

describe('VDialog', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/dashboard');
  });

  it('hydrates the matching dialog from a shared popup query on mount', async () => {
    window.history.replaceState({}, '', '/dashboard?popup=log-out');
    const {
      contactUsOpen,
      logoutOpen,
      wrapper,
    } = mountSharedPopupDialogs();

    await flushWatchers();

    expect(logoutOpen.value).toBe(true);
    expect(contactUsOpen.value).toBe(false);
    expect(window.location.search).toBe('?popup=log-out');

    wrapper.unmount();
  });

  it('does not clear a sibling dialog query value when dialogs share the same key', async () => {
    const {
      contactUsOpen,
      logoutOpen,
      wrapper,
    } = mountSharedPopupDialogs();

    logoutOpen.value = true;
    await flushWatchers();

    expect(logoutOpen.value).toBe(true);
    expect(contactUsOpen.value).toBe(false);
    expect(window.location.search).toBe('?popup=log-out');

    wrapper.unmount();
  });

  it('switches the shared popup query between sibling dialogs without clearing it', async () => {
    const {
      contactUsOpen,
      logoutOpen,
      wrapper,
    } = mountSharedPopupDialogs();

    logoutOpen.value = true;
    await flushWatchers();

    contactUsOpen.value = true;
    await flushWatchers();

    expect(window.location.search).toBe('?popup=contact-us');
    expect(logoutOpen.value).toBe(false);
    expect(contactUsOpen.value).toBe(true);

    wrapper.unmount();
  });
});
