<script lang="ts" setup>
import VInputOtp from './VInputOtp.vue';
import VInputOtpGroup from './VInputOtpGroup.vue';
import VInputOtpSlot from './VInputOtpSlot.vue';
import VInputOtpSeparator from './VInputOtpSeparator.vue';

const props = withDefaults(defineProps<{
  maxlength?: number;
  isError?: boolean;
  inputmode?: 'numeric' | 'text';
}>(), {
  maxlength: 6,
  isError: false,
  inputmode: 'numeric',
});

const modelValue = defineModel<string>({ default: '' });

const emit = defineEmits<{
  complete: [value: string];
}>();

const half = Math.ceil(props.maxlength / 2);
</script>

<template>
  <VInputOtp
    v-model="modelValue"
    v-bind="props"
    @complete="emit('complete', $event)"
  >
    <template #default="{ slots }">
      <VInputOtpGroup>
        <VInputOtpSlot
          v-for="(slot, i) in slots.slice(0, half)"
          :key="i"
          v-bind="slot"
        />
      </VInputOtpGroup>
      <VInputOtpSeparator />
      <VInputOtpGroup>
        <VInputOtpSlot
          v-for="(slot, i) in slots.slice(half)"
          :key="i + half"
          v-bind="slot"
        />
      </VInputOtpGroup>
    </template>
  </VInputOtp>
</template>
