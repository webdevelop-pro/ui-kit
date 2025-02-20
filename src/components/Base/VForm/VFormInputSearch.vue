<script lang="ts" setup>
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import { computed, ref, watch } from 'vue';
import searchIcon from 'UiKit/assets/images/search.svg';
import closeIcon from 'UiKit/assets/images/close.svg';

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
        <component
          :is="searchIcon"
          class="v-form-input-search__search-icon"
        />
      </template>
      <template #prepend>
        <div
          v-if="showClearButton"
          @click="onClearClick"
        >
          <component
            :is="closeIcon"
            class="v-form-input-search__close-icon"
          />
        </div>
      </template>
    </VFormInput>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-form-input-search {
  &__search-icon {
    width: 20px;
    color: colors.$gray-70;
  }
  &__close-icon {
    width: 10px !important;
    color: colors.$gray-80;
    cursor: pointer;
    display: block;
  }
}
</style>
