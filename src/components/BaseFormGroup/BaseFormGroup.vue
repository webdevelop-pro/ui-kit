<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { resolveRef } from '@/helpers/validation/general';

const props = defineProps<{
  label?: string;
  model?: object;
  path?: string;
  validation?: object | unknown;
  schemaBack?: object;
  schemaFront?: object;
  errorText?: string[];
}>();

const schema = ref();

function extractFieldName(path: string): string | null {
  const parts = path.split('/');
  if (parts.length > 1) return parts[parts.length - 1];
  if (parts.length === 1) return parts[0];
  return null;
}

const required = computed(() => {
  if (!props.path) return false;
  const fieldName = extractFieldName(props.path);
  const schemaObject = resolveRef(schema.value);
  // eslint-disable-next-line
  return schemaObject?.required?.includes(fieldName);
});

const errorText = computed(() => {
  if (!props.path) return '';
  let errorsArray = [];
  const validationError = get(props.validation, props.path);
  const backendError = props.errorText;
  if (validationError) errorsArray.push(validationError);
  if (backendError) errorsArray = [...errorsArray, backendError];
  return errorsArray.join(', ') || '';
});
const isError = computed(() => (errorText.value.length > 0));

watch(() => [props.schemaBack, props.schemaFront], () => {
  schema.value = merge(props.schemaBack, props.schemaFront);
}, { immediate: true, deep: true });
</script>

<template>
  <div class="BaseFormGroup base-form-group">
    <label
      v-if="label"
      class="base-form-group__label is--h6__title"
    >
      <span class="base-form-group__label-text">{{ label }}</span>
      <span
        v-if="required"
        class="base-form-group__label-required"
      >*</span>
    </label>
    <div class="base-form-group__input">
      <slot
        :is-field-error="isError"
      />
    </div>
    <div
      v-if="isError"
      class="base-form-group__error is--small"
      data-testid="input-error"
    >
      <slot
        name="error"
      >
        {{ errorText }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-form-group {
  display: flex;
  flex-direction: column;
  position: relative;

  &__label {
    display: inline-block;
    position: relative;
    color: $gray-70;
    text-align: left;
    margin-bottom: 8px;
  }

  &__label-link {
    position: absolute;
    right: 0;
    top: 0;
  }

  &__label-required {
    color: $wd-color-red;
  }

  &__error {
    margin-top: 4px;
    color: $red-dark;
  }

  &__input {
    width: 100%;
  }
}
</style>
