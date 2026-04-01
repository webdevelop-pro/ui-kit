import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue';

export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type SidebarSide = 'left' | 'right';

export interface SidebarContextValue {
  open: Ref<boolean>;
  mobileOpen: Ref<boolean>;
  isMobile: Ref<boolean>;
  collapsible: Ref<SidebarCollapsible>;
  side: Ref<SidebarSide>;
  isCollapsed: ComputedRef<boolean>;
  toggleSidebar: () => void;
  setOpen: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
}

export const sidebarContextKey: InjectionKey<SidebarContextValue> = Symbol('sidebar-context');

export function createSidebarState(options: {
  defaultOpen?: boolean;
  open?: Ref<boolean | undefined>;
  collapsible?: Ref<SidebarCollapsible | undefined>;
  side?: Ref<SidebarSide | undefined>;
  mobileBreakpoint?: Ref<number | undefined>;
  onOpenChange?: (value: boolean) => void;
} = {}): SidebarContextValue {
  const internalOpen = shallowRef(options.defaultOpen ?? true);
  const mobileOpen = shallowRef(false);
  const isMobile = shallowRef(false);

  const open = computed(() => options.open?.value ?? internalOpen.value);
  const collapsible = computed(() => options.collapsible?.value ?? 'icon');
  const side = computed(() => options.side?.value ?? 'left');
  const mobileBreakpoint = computed(() => options.mobileBreakpoint?.value ?? 768);
  const isCollapsed = computed(() => (
    !isMobile.value && collapsible.value !== 'none' && !open.value
  ));

  function setOpen(value: boolean) {
    internalOpen.value = value;
    options.onOpenChange?.(value);
  }

  function setMobileOpen(value: boolean) {
    mobileOpen.value = value;
  }

  function toggleSidebar() {
    if (isMobile.value) {
      mobileOpen.value = !mobileOpen.value;
      return;
    }

    setOpen(!open.value);
  }

  function syncViewport() {
    isMobile.value = window.innerWidth < mobileBreakpoint.value;

    if (!isMobile.value) {
      mobileOpen.value = false;
    }
  }

  onMounted(() => {
    syncViewport();
    window.addEventListener('resize', syncViewport);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', syncViewport);
  });

  return {
    open,
    mobileOpen,
    isMobile,
    collapsible,
    side,
    isCollapsed,
    toggleSidebar,
    setOpen,
    setMobileOpen,
  };
}

export function useSidebar() {
  const context = inject(sidebarContextKey, null);

  if (!context) {
    throw new Error('useSidebar must be used inside VSidebarProvider.');
  }

  return {
    ...context,
    state: computed(() => (context.open.value ? 'expanded' : 'collapsed')),
  };
}
