<script setup lang="ts">
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ SwitchRootProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits</* @vue-ignore */ SwitchRootEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="props.class"
    class="VSwitch v-switch"
  >
    <SwitchThumb
      class="v-switch-thumb"
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-switch {
    width: 34px;
    height: 16px;
    display: flex;
    padding: 2px 20px 2px 2px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    border-radius: 48px;
    background: $gray-60;
    position: relative;
    cursor: pointer;
}

.v-switch[data-state='checked'] {
  background-color: $primary;
}

.v-switch[disabled] {
  pointer-events: none;
  opacity: 0.3;
}

.v-switch-thumb {
  display: block;
  width: 12px;
  height: 12px;
  background-color: $white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(0);
  will-change: transform;
}

.v-switch-thumb[data-state='checked'] {
  transform: translateX(18px);
}
</style>
