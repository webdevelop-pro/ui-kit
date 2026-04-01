<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next';
import { computed, type HTMLAttributes, useSlots } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { cn } from 'UiKit/lib/utils';
import { useSidebar } from './useSidebar';

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class'];
}>(), {
  class: undefined,
});

const sidebar = useSidebar();
const slots = useSlots();

const isSidebarClosed = computed(() => (
  sidebar.isMobile.value ? !sidebar.mobileOpen.value : sidebar.isCollapsed.value
));
const hasCustomContent = computed(() => Boolean(slots.default));
const TriggerIcon = computed(() => (isSidebarClosed.value ? PanelLeftOpen : PanelLeftClose));
const triggerAriaLabel = computed(() => (isSidebarClosed.value ? 'Open sidebar' : 'Close sidebar'));
</script>

<template>
  <button
    v-if="hasCustomContent"
    :aria-label="triggerAriaLabel"
    :class="cn('VSidebarTrigger v-sidebar-trigger v-sidebar-trigger--custom', props.class)"
    data-sidebar-trigger
    type="button"
    @click="sidebar.toggleSidebar"
  >
    <slot />
  </button>

  <VButton
    v-else
    as="button"
    :aria-label="triggerAriaLabel"
    :class="['VSidebarTrigger v-sidebar-trigger', props.class]"
    data-sidebar-trigger
    icon-only
    size="small"
    type="button"
    variant="link"
    @click="sidebar.toggleSidebar"
  >
    <component
      :is="TriggerIcon"
      class="h-4 w-4 is--color-gray-70"
    />
  </VButton>
</template>

<style scoped lang="scss">
.v-sidebar-trigger--custom {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
</style>
