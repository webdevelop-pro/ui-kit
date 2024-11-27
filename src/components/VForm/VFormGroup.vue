<script lang="ts" setup>
import {
  computed, ref, watch, toRaw,
} from 'vue';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { getFieldSchema } from 'UiKit/helpers/validation/general';

const props = defineProps<{
  label?: string;
  model?: object;
  path?: string;
  validation?: object | unknown;
  schemaBack?: object;
  schemaFront?: object;
  errorText?: string[];
  required?: boolean;
}>();

const schema = ref();

function isFieldRequiredInSchema(fieldName, schema) {
    return schema.required ? schema.required.includes(fieldName) : false;
}


function isFieldRequiredAtPath(path, schema) {
    const parentSchema = getFieldSchema(path, schema.$ref, schema);
    if (!parentSchema) return false;
    const fieldName = path.split('.').pop();
    return isFieldRequiredInSchema(fieldName, parentSchema);
}

const required = computed(() => {
  if (props.required) return true;
  if (!props.path || !schema.value) return false;
  // eslint-disable-next-line
  return isFieldRequiredAtPath(props.path, schema.value);
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
  const schema1 = structuredClone(toRaw(props.schemaBack))
  const schema2 = structuredClone(toRaw(props.schemaFront))
  schema.value = merge(schema1, schema2);
}, { immediate: true, deep: true });
</script>

<template>
  <div class="VFormGroup v-form-group">
    <label
      v-if="label"
      class="v-form-group__label is--h6__title"
    >
      <span class="v-form-group__label-text">{{ label }}</span>
      <span
        v-if="required"
        class="v-form-group__label-required"
      >*</span>
    </label>
    <div class="v-form-group__input">
      <slot
        :is-field-error="isError"
      />
    </div>
    <div
      v-if="isError"
      class="v-form-group__error is--small"
      :class="{ 'is--error': isError }"
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

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
.v-form-group
  display: flex
  flex-direction: column
  position: relative

  &__label
    display: inline-block
    position: relative
    color: colors.$gray-70
    text-align: left
    margin-bottom: 4px

  &__label-link
    position: absolute
    right: 0
    top: 0

  &__label-required
    color: colors.$red

  &__error
    color: colors.$red-dark
    transition: all 0.3s ease
    transform: translateY(-5px)
    &.is--error
      height: auto
      transition: all 0.3s ease
      transform: translateY(0)

  &__input
    width: 100%
    position: relative
    margin-bottom: 4px
</style>
