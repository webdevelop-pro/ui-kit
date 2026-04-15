<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { ComboboxContent, useForwardPropsEmits } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps</* @vue-ignore */ ComboboxContentProps & { class?: HTMLAttributes['class'] }>(), {
  dismissable: false,
});
const emits = defineEmits</* @vue-ignore */ ComboboxContentEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxContent
    v-bind="forwarded"
    :class="props.class"
    class="VCommandList v-command-list"
  >
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
