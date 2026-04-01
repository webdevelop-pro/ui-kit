<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next';
import { computed } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useSidebar } from './useSidebar';

const props = defineProps<{
  class?: string;
}>();

const sidebar = useSidebar();

const isSidebarClosed = computed(() => (
  sidebar.isMobile.value ? !sidebar.mobileOpen.value : sidebar.isCollapsed.value
));
const TriggerIcon = computed(() => (isSidebarClosed.value ? PanelLeftOpen : PanelLeftClose));
</script>

<template>
  <VButton
    as="button"
    :class="['VSidebarTrigger v-sidebar-trigger', props.class]"
    aria-label="Toggle sidebar"
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
