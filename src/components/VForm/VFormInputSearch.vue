<script lang="ts" setup>
import VFormInput from 'UiKit/components/VForm/VFormInput.vue';
import { computed, ref, watch } from 'vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['@update:modelValue']);

const model = ref(props.modelValue);

const showClearButton = computed(() => Boolean(model.value));

const onClearClick = () => {
  model.value = '';
};
watch(() => model.value, () => {
  emit('@update:modelValue', model.value);
});
watch(() => props.modelValue, () => {
  model.value = props.modelValue;
});
</script>

<template>
  <div
    class="VFormInputSearch v-form-input-search"
  >
    <VFormInput
      :model-value="model"
      name="search"
      append
      prepend
      v-bind="$attrs"
      placeholder="Search"
      class="v-form-input-search__search-input"
      @update:model-value="model = $event"
    >
      <template #append>
        <VSvgIcon
          name="search"
          class="v-form-input-search__search-icon"
        />
      </template>
      <template #prepend>
        <div
          v-if="showClearButton"
          @click="onClearClick"
        >
          <VSvgIcon
            name="close"
            class="v-form-input-search__close-icon"
          />
        </div>
      </template>
    </VFormInput>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
.v-form-input-search
  &__search-icon
    width: 20px
    color: colors.$gray-70
  &__close-icon
    width: 10px !important
    color: colors.$gray-80
    cursor: pointer
    display: block
</style>
