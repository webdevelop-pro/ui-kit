import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';
import { defineComponent, markRaw, nextTick } from 'vue';
import AppSidebar from './components/AppSidebar.vue';
import VHeaderAuthorized from 'UiKit/components/VHeader/VHeaderAuthorized.vue';
import VHeaderGuest from 'UiKit/components/VHeader/VHeaderGuest.vue';

describe('Sidebar07/AppSidebar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1280,
    });

    window.dispatchEvent(new Event('resize'));
  });

  it('renders the standard sections from typed props', () => {
    const wrapper = mount(AppSidebar, {
      props: {
        title: 'Acme',
        subtitle: 'Operations',
        defaultOpen: true,
        mainNav: [{ title: 'Overview', href: '#overview', active: true }],
        projects: [{ title: 'Treasury', href: '#treasury' }],
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
      slots: {
        default: '<div data-testid="page-content">Page content</div>',
      },
    });

    expect(wrapper.text()).toContain('Acme');
    expect(wrapper.text()).toContain('Overview');
    expect(wrapper.text()).toContain('Treasury');
    expect(wrapper.text()).toContain('Avery Stone');
    expect(wrapper.text()).toContain('Page content');
    expect(wrapper.findComponent(VHeaderAuthorized).exists()).toBe(true);
    expect(wrapper.findComponent(VHeaderGuest).exists()).toBe(false);
  });

  it('shows the guest header and hides the sidebar for guests', () => {
    const wrapper = mount(AppSidebar, {
      props: {
        title: 'Acme',
        mainNav: [{ title: 'Overview', href: '#overview', active: true }],
        projects: [{ title: 'Treasury', href: '#treasury' }],
        user: null,
      },
      slots: {
        default: '<div data-testid="page-content">Page content</div>',
      },
    });

    expect(wrapper.findComponent(VHeaderGuest).exists()).toBe(true);
    expect(wrapper.findComponent(VHeaderAuthorized).exists()).toBe(false);
    expect(wrapper.find('[data-sidebar="sidebar"]').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Overview');
    expect(wrapper.text()).not.toContain('Treasury');
    expect(wrapper.text()).toContain('Page content');
  });

  it('prefers named slot overrides over the default section presenters', () => {
    const wrapper = mount(AppSidebar, {
      props: {
        title: 'Acme',
        mainNav: [{ title: 'Overview', href: '#overview' }],
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
      slots: {
        header: '<div data-testid="custom-header">Custom Header</div>',
        projects: '<div data-testid="custom-projects">Custom Projects</div>',
      },
    });

    expect(wrapper.find('[data-testid="custom-header"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="custom-projects"]').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('Sidebar block');
  });

  it('collapses the desktop sidebar content when the trigger is clicked', async () => {
    const wrapper = mount(AppSidebar, {
      props: {
        title: 'Acme',
        defaultOpen: true,
        mainNav: [{ title: 'Overview', href: '#overview' }],
        projects: [{ title: 'Treasury', href: '#treasury' }],
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
    });

    expect(wrapper.text()).toContain('Overview');

    await wrapper.get('[data-sidebar-trigger]').trigger('click');
    await nextTick();

    expect(wrapper.text()).not.toContain('Overview');
    expect(wrapper.text()).not.toContain('Treasury');
    expect(wrapper.text()).not.toContain('Avery Stone');
  });

  it('renders the mobile drawer expanded and can hide the sidebar header', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 390,
    });

    const wrapper = mount(AppSidebar, {
      props: {
        title: 'Acme',
        mainNav: [{ title: 'Overview', href: '#overview' }],
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
        showHeaderOnMobile: false,
      },
    });

    window.dispatchEvent(new Event('resize'));
    await nextTick();

    await wrapper.get('[data-sidebar-trigger]').trigger('click');
    await nextTick();

    expect(wrapper.find('[data-sidebar-close]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Overview');
    expect(wrapper.text()).toContain('Avery Stone');
    expect(wrapper.text()).not.toContain('Acme');
  });

  it('closes the mobile drawer after selecting a navigation item', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 390,
    });

    const wrapper = mount(AppSidebar, {
      props: {
        mainNav: [{ title: 'Overview', href: '#overview' }],
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
    });

    window.dispatchEvent(new Event('resize'));
    await nextTick();

    await wrapper.get('[data-sidebar-trigger]').trigger('click');
    await nextTick();

    const mobileSidebar = wrapper.get('.v-sidebar-mobile .v-sidebar');
    expect(mobileSidebar.classes()).toContain('translate-x-0');

    await wrapper.get('.nav-main__button').trigger('click');
    await nextTick();

    expect(wrapper.get('.v-sidebar-mobile .v-sidebar').classes()).toContain('-translate-x-full');
  });

  it('closes the mobile drawer after selecting a user dropdown action', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 390,
    });

    const wrapper = mount(AppSidebar, {
      props: {
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
      global: {
        stubs: {
          VDropdownMenu: {
            template: '<div data-testid="dropdown-root"><slot /></div>',
          },
          VDropdownMenuContent: {
            template: '<div data-testid="dropdown-content"><slot /></div>',
          },
          VDropdownMenuItem: {
            template: '<button type="button" @click="$emit(\'select\')"><slot /></button>',
          },
          VDropdownMenuTrigger: {
            template: '<div data-testid="dropdown-trigger"><slot /></div>',
          },
        },
      },
    });

    window.dispatchEvent(new Event('resize'));
    await nextTick();

    await wrapper.get('[data-sidebar-trigger]').trigger('click');
    await nextTick();

    expect(wrapper.get('.v-sidebar-mobile .v-sidebar').classes()).toContain('translate-x-0');

    const settingsAction = wrapper.findAll('button')
      .find((button) => button.text().includes('User settings'));

    expect(settingsAction).toBeDefined();

    await settingsAction!.trigger('click');
    await nextTick();

    expect(wrapper.emitted('userAction')).toEqual([['settings']]);
    expect(wrapper.get('.v-sidebar-mobile .v-sidebar').classes()).toContain('-translate-x-full');
  });

  it('maps a custom team dropdown component back to sidebar events', async () => {
    const CustomTeamDropdown = markRaw(defineComponent({
      emits: ['select'],
      template: `
        <div data-testid="custom-team-dropdown">
          <button
            data-testid="select-profile"
            type="button"
            @click="$emit('select', '2')"
          >
            Select profile
          </button>
          <button
            data-testid="create-profile"
            type="button"
            @click="$emit('select', 'new')"
          >
            Create profile
          </button>
        </div>
      `,
    }));

    const wrapper = mount(AppSidebar, {
      props: {
        teams: [
          { id: 1, title: 'Profile 1', active: true },
          { id: 2, title: 'Profile 2' },
        ],
        teamDropdownComponent: CustomTeamDropdown,
        user: { name: 'Avery Stone', email: 'avery@acme.test' },
      },
      global: {
        stubs: {
          VDropdownMenu: {
            template: '<div data-testid="dropdown-root"><slot /></div>',
          },
          VDropdownMenuContent: {
            template: '<div data-testid="dropdown-content"><slot /></div>',
          },
          VDropdownMenuItem: {
            template: '<div data-testid="dropdown-item"><slot /></div>',
          },
          VDropdownMenuTrigger: {
            template: '<div data-testid="dropdown-trigger"><slot /></div>',
          },
        },
      },
    });

    expect(wrapper.find('[data-testid="custom-team-dropdown"]').exists()).toBe(true);

    await wrapper.get('[data-testid="select-profile"]').trigger('click');

    expect(wrapper.emitted('teamSelect')).toEqual([
      [{ id: 2, title: 'Profile 2' }],
    ]);

    await wrapper.get('[data-testid="create-profile"]').trigger('click');

    expect(wrapper.emitted('teamCreate')).toHaveLength(1);
  });
});
