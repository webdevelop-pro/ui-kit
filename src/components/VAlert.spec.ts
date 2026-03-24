import {
  describe,
  expect,
  it,
} from 'vitest';
import { mount } from '@vue/test-utils';
import VAlert from './VAlert.vue';

describe('VAlert', () => {
  it('keeps the close affordance hidden by default', () => {
    const wrapper = mount(VAlert, {
      slots: {
        title: 'Heads up',
        description: 'Alert body',
      },
    });

    expect(wrapper.find('[aria-label="Close alert"]').exists()).toBe(false);
  });

  it('renders the optional close affordance and emits separate close/click events', async () => {
    const wrapper = mount(VAlert, {
      props: {
        showClose: true,
        buttonText: 'Retry',
      },
      slots: {
        title: 'Heads up',
        description: 'Alert body',
      },
    });

    await wrapper.get('.v-alert-default__button').trigger('click');
    await wrapper.get('[aria-label="Close alert"]').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
