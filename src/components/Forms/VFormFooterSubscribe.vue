<script setup lang="ts">
import {
  computed, nextTick, reactive, ref, watch,
} from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VFormInput from 'UiKit/components/VForm/VFormInput.vue';
import { JSONSchemaType } from 'ajv';
import { emailRule, errorMessageRule } from 'UiKit/helpers/validation/rules';
import { PrecompiledValidator } from 'UiKit/helpers/validation/PrecompiledValidator';
import VFormGroup from 'UiKit/components/VForm/VFormGroup.vue';
import { isEmpty } from 'UiKit/helpers/general';
import { scrollToError } from 'UiKit/helpers/validation/general';

const emit = defineEmits(['submit']);
defineProps({
  loading: Boolean,
})

type FormModelSubscribe = {
  email: number;
}
const schemaSubscribe = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    PatchIndividualProfile: {
      properties: {
        email: emailRule,
      },
      type: 'object',
      required: ['email'],
      errorMessage: errorMessageRule,
    },
  },
  $ref: '#/definitions/PatchIndividualProfile',
} as unknown as JSONSchemaType<FormModelSubscribe>;

const model = reactive({
} as FormModelSubscribe);
const validator = new PrecompiledValidator<FormModelSubscribe>(
  schemaSubscribe,
);
const validation = ref<unknown>();
const isValid = computed(() => isEmpty(validation.value || {}));
const isDisabledButton = computed(() => (!isValid.value));

const onValidate = () => {
  validation.value = validator.getFormValidationErrors(model);
};

const onSubmit = () => {
  onValidate();
  if (!isValid.value) {
    void nextTick(() => scrollToError('FooterSubscribeForm'));
    return;
  }

  emit('submit', model.email);
};


watch(() => model, () => {
  if (!isValid.value) onValidate();
}, { deep: true });
</script>

<template>
  <div class="VFormFooterSubscribe v-form-footer-subscribe">
    <div class="v-form-footer-subscribe__title is--h6__title">
            Receive latest news:
          </div>
          <form
            novalidate
            class="form-submit"
            @submit.prevent="onSubmit"
          >
            <div class="field-group form-control">
              <VFormGroup
                v-slot="baseFormGroupProps"
                :model="model"
                :validation="validation"
                :schema-front="schemaSubscribe"
                path="email"
                class="v-form-footer-subscribe__group"
              >
                <VFormInput
                  :is-error="baseFormGroupProps.isFieldError"
                  :model-value="model.email"
                  placeholder="Email Address"
                  name="email"
                  text
                  type="email"
                  size="large"
                  @update:model-value="model.email = $event"
                />
              </VFormGroup>
              <VButton
                size="large"
                :loading="loading"
                :disabled="isDisabledButton || loading"
                :uppercase="false"
              >
                Subscribe
              </VButton>
              <span class="form-control-error" />
            </div>
            <div class="general-form-error" />
          </form>
  </div>
</template>


<style lang="scss">
.v-form-footer-subscribe {
  $root: &;

  &__group {
    width: 100%;
  }

  &__form {
    width: 100%;
  }

  &__title {
    margin-bottom: 8px;
  }
  
  .field-group {
    position: relative;
    width: 100%;
    display: flex;
    align-items: start;
    margin-bottom: 0;
    gap: 4px;
  }
}
</style>
