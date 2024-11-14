<script lang="ts" setup>
import { ref } from 'vue';
import VFormCheckbox from 'UiKit/components/VForm/VFormCheckbox.vue';

const props = withDefaults(defineProps<{
  options: string[];
  modelValue: string[];
}>(), {
  options: () => [],
});

const emit = defineEmits<{(e: 'update:modelValue', value: string[]): void;
}>();

const value = ref(props.modelValue);

function onUpdate(option: string, checked: boolean) {
  if (checked) {
    value?.value?.push(option);
  } else {
    value?.value?.splice(value.value.indexOf(option), 1);
  }
  emit('update:modelValue', value?.value);
}

</script>

<template>
  <div class="VFormCheckboxGroup v-form-checkbox-group">
    <template
      v-for="(option, index) in options"
      :key="index"
    >
      <VFormCheckbox
        v-bind="$attrs"
        :model-value="value.includes(option)"
        class="v-form-checkbox-group__item"
        @update:model-value="onUpdate(option, $event)"
      >
        <span> {{ option }}</span>
      </VFormCheckbox>
    </template>
  </div>
</template>

<style lang="sass">
.v-form-checkbox-group
  $root: &
  width: 100%

  --v-form-checkbox-group-item--padding: 15px 12px
  --v-form-checkbox-group-item--background-color: #E9ECEF

  display: flex
  flex-direction: column
  align-items: flex-start

  &__item
    padding: var(--v-form-checkbox-group-item--padding)
    width: 100%
    cursor: pointer
    transition: all 0.2s ease
    &:hover
      background: var(--v-form-checkbox-group-item--background-color)
</style>
