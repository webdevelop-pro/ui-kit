<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { toRaw } from 'vue';

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

function resolveRef(ref, schema) {
    const refPath = ref.replace('#/', '').split('/');
    let currentSchema = schema;
    return get(currentSchema, refPath.join('.'));
}

function isFieldRequiredInSchema(fieldName, schema) {
    return schema.required ? schema.required.includes(fieldName) : false;
}

function getFieldSchema(path, ref, schema) {
  if (!path || !ref) return undefined;
    const objectFromRefPath = resolveRef(ref, schema);
    const pathSegments = path.split('.');
    const firstChild = pathSegments.shift();
    const restSegments = pathSegments.join('.');
    const segment0Property = objectFromRefPath.properties[firstChild];
    if (segment0Property?.$ref) {
      return getFieldSchema(restSegments, segment0Property.$ref, schema);
    }
    return objectFromRefPath;
}

function isFieldRequiredAtPath(path, schema) {
    const parentSchema = getFieldSchema(path, schema.$ref, schema);
    if (!parentSchema) return false;
    const fieldName = path.split('.').pop();
    return isFieldRequiredInSchema(fieldName, parentSchema);
}

const required = computed(() => {
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
