<script setup lang="ts">
import {
  computed, nextTick, reactive,
} from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import VFormGroup from 'UiKit/components/Base/VForm/VFormGroup.vue';
import { useFormValidation } from 'UiKit/helpers/validation/useFormValidation';
import type { JSONSchemaType } from 'ajv/dist/types/json-schema';

const props = defineProps({
  loading: Boolean,
  label: String,
});

const emit = defineEmits(['submit']);

type FormModelSubscribe = {
  email: string;
}

const schemaSubscribe: JSONSchemaType<FormModelSubscribe> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
  },
  required: ['email'],
  additionalProperties: false,
};

const initialModel: FormModelSubscribe = reactive({
  email: '',
});

const {
  model,
  validation,
  isValid,
  onValidate,
  scrollToError,
  getErrorText,
  isFieldRequired,
} = useFormValidation<FormModelSubscribe>(
  schemaSubscribe,
  undefined,
  initialModel,
  ['email'],
);

const onSubmit = () => {
  onValidate();
  if (!isValid.value) {
    nextTick(() => scrollToError('v-form-footer-subscribe'));
    return;
  }

  emit('submit', model.email);
};

const isDisabledButton = computed(() => !isValid.value || props.loading);
</script>

<template>
  <div class="VFormFooterSubscribe v-form-footer-subscribe">
    <form
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="v-form-footer-subscribe__group">
        <VFormGroup
          v-slot="baseFormGroupProps"
          :label="label"
          :error-text="getErrorText('email', validation)"
          :required="isFieldRequired('email')"
          dark
        >
          <VFormInput
            :is-error="baseFormGroupProps.isFieldError"
            :model-value="model.email"
            placeholder="Email Address"
            type="email"
            size="large"
            @update:model-value="model.email = $event"
          />
        </VFormGroup>
        <VButton
          size="large"
          :loading="loading"
          :disabled="isDisabledButton || loading"
          class="v-form-footer-subscribe__button"
        >
          Subscribe
        </VButton>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.v-form-footer-subscribe {
  &__group {
    display: flex;
    gap: 4px;
  }

  &__button {
    position: relative;
    top: 28px;
  }
}
</style>
