<script setup lang="ts">
import { computed, PropType } from 'vue';
import {
  VBreadcrumb, VBreadcrumbList, VBreadcrumbItem, VBreadcrumbLink, VBreadcrumbSeparator,
  VBreadcrumbEllipsis,
} from 'UiKit/components/Base/VBreadcrumb';
import { IBreadcrumb, IBreadcrumbDropdown } from './interface';
import VDropdown from 'UiKit/components/VDropdown.vue';


const props = defineProps({
  data: {
    type: Array as PropType<IBreadcrumb[]>,
    required: true,
  },
});

// Compute the visible breadcrumbs based on the data length
const visibleBreadcrumbs = computed(() => {
  if (props.data.length <= 3) {
    return props.data;
  }

  // Show first item, ellipsis, and last two items
  return [props.data[0], { dropdown: true }, ...props.data.slice(-1)] as IBreadcrumbDropdown[];
});
</script>

<template>
  <VBreadcrumb>
    <VBreadcrumbList>
      <template
        v-for="item in visibleBreadcrumbs"
        :key="item.text"
      >
        <!-- Handle ellipsis item -->
        <VBreadcrumbItem v-if="item.dropdown">
          <VDropdown
            :menu="data.slice(1, -1)"
          >
            <VBreadcrumbEllipsis />
          </VDropdown>
        </VBreadcrumbItem>

        <!-- Handle regular items -->
        <VBreadcrumbItem v-else>
          <VBreadcrumbLink
            :href="encodeURI(item.href)"
          >
            {{ item.text }}
          </VBreadcrumbLink>
        </VBreadcrumbItem>

        <!-- Separator -->
        <VBreadcrumbSeparator>
          <slot>
            /
          </slot>
        </VBreadcrumbSeparator>
      </template>
    </VBreadcrumbList>
  </VBreadcrumb>
</template>
