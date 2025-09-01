<script setup lang="ts">
import VSwitch from 'UiKit/components/Base/VSwitch/VSwitch.vue';
import VFormLabel from 'UiKit/components/Base/VForm/VFormLabel.vue';
import { computed, HTMLAttributes } from 'vue';
import {
  type SwitchRootEmits,
  type SwitchRootProps,
  useForwardPropsEmits,
} from 'radix-vue';

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const disabled = computed(() => props.disabled);

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <div
    class="VSwitchDefault v-switch-default"
    :class="props.class"
  >
    <VSwitch
      v-bind="forwarded"
    />
    <VFormLabel
      :disabled="disabled"
    >
      <slot />
    </VFormLabel>
  </div>
</template>

<style lang="scss">
.v-switch-default {
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: center;
}
</style>
