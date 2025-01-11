<script setup lang="ts">
import { PropType } from 'vue';
import {
  VBreadcrumb, VBreadcrumbList, VBreadcrumbItem, VBreadcrumbLink, VBreadcrumbSeparator,
} from 'UiKit/components/Base/VBreadcrumb';
import { IBreadcrumb } from './interface';


defineProps({
  data: {
    type: Array as PropType<IBreadcrumb[]>,
    required: true,
  },
});
</script>

<template>
  <VBreadcrumb>
    <VBreadcrumbList>
      <template
        v-for="item in data"
        :key="item.label"
      >
        <VBreadcrumbItem>
          <VBreadcrumbLink
            :href="item.href"
          >
            {{ item.label }}
          </VBreadcrumbLink>
        </VBreadcrumbItem>
        <VBreadcrumbSeparator>
          <slot>
            /
          </slot>
        </VBreadcrumbSeparator>
      </template>
    </VBreadcrumbList>
  </VBreadcrumb>
</template>
