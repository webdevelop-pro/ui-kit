<script setup lang="ts">
import {
  computed, defineAsyncComponent, nextTick, reactive, ref, watch,
} from 'vue';

const VButton = defineAsyncComponent(() => import('UiKit/components/VButton/VButton.vue'));
const VFormInput = defineAsyncComponent(() => import('UiKit/components/VForm/VFormInput.vue'));
const VFormGroup = defineAsyncComponent(() => import('UiKit/components/VForm/VFormGroup.vue'));


const emit = defineEmits(['submit']);
const props = defineProps({
  loading: Boolean,
});

type FormModelSubscribe = {
  email: number;
}

const model = reactive({} as FormModelSubscribe);
const validation = ref<unknown>();
const isValid = computed(() => validation.value && !Object.keys(validation.value).length);
const isDisabledButton = computed(() => !isValid.value || props.loading);
let schemaSubscribe = {};

const setupValidator = async () => {
  const { JSONSchemaType } = await import('ajv');
  const { emailRule, errorMessageRule } = await import('UiKit/helpers/validation/rules');
  const { PrecompiledValidator } = await import('UiKit/helpers/validation/PrecompiledValidator');
  const { scrollToError } = await import('UiKit/helpers/validation/general');

  schemaSubscribe = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions: {
      Individual: {
        properties: {
          email: emailRule,
        },
        type: 'object',
        required: ['email'],
        errorMessage: errorMessageRule,
      },
    },
    $ref: '#/definitions/Individual',
  } as unknown as JSONSchemaType<FormModelSubscribe>;

  return new PrecompiledValidator<FormModelSubscribe>(schemaSubscribe);
};

// const schemaSubscribe = {
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   definitions: {
//     Individual: {
//       properties: {
//         email: emailRule,
//       },
//       type: 'object',
//       required: ['email'],
//       errorMessage: errorMessageRule,
//     },
//   },
//   $ref: '#/definitions/Individual',
// } as unknown as JSONSchemaType<FormModelSubscribe>;


const validator = ref<PrecompiledValidator<FormModelSubscribe> | null>(null);
setupValidator().then((v) => { validator.value = v; });

// const validator = new PrecompiledValidator<FormModelSubscribe>(
//   schemaSubscribe,
// );

// const onValidate = () => {
//   validation.value = validator.getFormValidationErrors(model);
// };

const onValidate = () => {
  if (validator.value) {
    validation.value = validator.value.getFormValidationErrors(model);
  }
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
  <div class="FooterSubscribeForm footer-subscribe-form">
    <div class="footer-subscribe-form__title is--h6__title">
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
          class="footer-subscribe-form__group"
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
.footer-subscribe-form {
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
