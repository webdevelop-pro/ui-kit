<script setup lang="ts">
import {
  watch, computed, nextTick,
} from 'vue';
import { useFormValidation } from 'UiKit/helpers/validation/useFormValidation';
import VFormGroup from 'UiKit/components/Base/VForm/VFormGroup.vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormTextarea from 'UiKit/components/Base/VForm/VFormTextarea.vue';
import VFormSelect from 'UiKit/components/Base/VForm/VFormSelect.vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { emailRule, errorMessageRule, firstNameRule } from 'UiKit/helpers/validation/rules';
import { JSONSchemaType } from 'ajv/dist/types/json-schema';
import { useToast } from 'UiKit/components/Base/VToast/use-toast';
import { useSyncWithUrl } from 'UiKit/composables/useSyncWithUrl';


const SELECT_SUBJECT = [
  {
    value: 'investment',
    label: 'Investment',
  },
  {
    value: 'report an issue',
    label: 'Report an issue',
  },
  {
    value: 'i have a question',
    label: 'I have a question',
  },
  {
    value: 'Account deactivation',
    label: 'Account deactivation',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const props = defineProps({
  isInDialog: {
    type: Boolean,
    default: false,
  },
  subject: String,
  userSessionTraits: {
    type: Object,
    default: null,
  },
  hubspotFormId: {
    type: String,
    required: true,
  },
  selectSubject: {
    type: Array,
  },
});

const selectSubjectOptions = computed(() => props.selectSubject || SELECT_SUBJECT);

const emit = defineEmits(['close']);

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'Sent',
  description: 'Form sent success',
  variant: 'success',
};

type FormModelContactUs = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schemaContactUs = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    ContactUs: {
      properties: {
        name: firstNameRule,
        email: emailRule,
        message: {
          minLength: 10,
          type: 'string',
        },
      },
      type: 'object',
      required: ['name', 'subject', 'email', 'message'],
      errorMessage: errorMessageRule,
    },
  },
  $ref: '#/definitions/ContactUs',
} as unknown as JSONSchemaType<FormModelContactUs>;


const fieldsPaths = ['name', 'email', 'subject', 'message'];
const {
  model,
  isValid,
  onValidate,
  isFieldRequired,
  getErrorText,
  scrollToError,
} = useFormValidation<FormModelContactUs>(
  schemaContactUs,
  undefined,
  {} as FormModelContactUs,
  fieldsPaths
);

// Sync form fields with URL query parameters
const syncFieldWithUrl = <K extends keyof FormModelContactUs>(key: K) => {
  const urlValue = useSyncWithUrl({
    key,
    defaultValue: '',
  });

  // Sync URL → Model
  watch(urlValue, (newVal) => {
    if (newVal && model[key] !== newVal) {
      model[key] = newVal as FormModelContactUs[K];
    }
  }, { immediate: true });

  // Sync Model → URL
  watch(() => model[key], (newVal) => {
    if (urlValue.value !== newVal) {
      urlValue.value = newVal;
    }
  });

  return urlValue;
};

const [nameFromUrl, emailFromUrl, subjectFromUrl, messageFromUrl] = [
  syncFieldWithUrl('name'),
  syncFieldWithUrl('email'),
  syncFieldWithUrl('subject'),
  syncFieldWithUrl('message'),
];

const isDisabledButton = computed(() => (!isValid.value));

watch(() => [props.userSessionTraits?.first_name, props.userSessionTraits?.last_name], () => {
  if (props.userSessionTraits?.first_name || props.userSessionTraits?.last_name) {
    model.name = `${props.userSessionTraits?.first_name} ${props.userSessionTraits?.last_name}`;
  }
}, { deep: true, immediate: true });

watch(() => props.userSessionTraits?.email, () => {
  if (props.userSessionTraits?.email) {
    model.email = props.userSessionTraits?.email || '';
  }
}, { deep: true, immediate: true });

watch(() => props.subject, () => {
  if (props.subject) {
    model.subject = props.subject;
  }
}, { immediate: true });

const onSubmit = async () => {
  onValidate();
  if (!isValid.value) {
    nextTick(() => scrollToError('VFormContactUs'));
    return;
  }

  await useHubspotForm(props.hubspotFormId).submitFormToHubspot({
    ...model,
    first_name: model.name,
    email: model.email,
    message: model.message,
  });

  toast(TOAST_OPTIONS);
  Object.assign(model, {
    name: '',
    email: '',
    subject: '',
    message: '',
  } as FormModelContactUs);
  // Clear URL parameters when form is reset
  [nameFromUrl, emailFromUrl, subjectFromUrl, messageFromUrl].forEach((ref) => {
    ref.value = '';
  });
  emit('close');
};
</script>

<template>
  <div
    class="contact-us-form__wrap"
    :class="{'is--bg-image': !isInDialog}"
  >
    <form
      class="VFormContactUs contact-us-form"
      :class="{ 'is--in-dialog': isInDialog }"
      novalidate
      @submit.prevent="onSubmit"
    >
      <VFormGroup
        v-slot="VFormGroupProps"
        :required="isFieldRequired('name')"
        :error-text="getErrorText('name')"
        label="Your Name"
        class="contact-us-form__input"
      >
        <VFormInput
          :model-value="model.name"
          :is-error="VFormGroupProps.isFieldError"
          placeholder="Your Name"
          name="name"
          size="large"
          data-testid="name"
          type="text"
          @update:model-value="model.name = $event"
        />
      </VFormGroup>

      <VFormGroup
        v-slot="VFormGroupProps"
        :required="isFieldRequired('email')"
        :error-text="getErrorText('email')"
        label="Email Address"
        class="contact-us-form__input"
      >
        <VFormInput
          :model-value="model.email"
          :is-error="VFormGroupProps.isFieldError"
          placeholder="Email Address"
          name="email"
          data-testid="email"
          size="large"
          type="text"
          @update:model-value="model.email = $event"
        />
      </VFormGroup>

      <VFormGroup
        v-slot="VFormGroupProps"
        :required="isFieldRequired('subject')"
        :error-text="getErrorText('subject')"
        label="Subject"
        class="contact-us-form__input"
      >
        <VFormSelect
          v-model="model.subject"
          item-label="label"
          item-value="value"
          placeholder="Select"
          :is-error="VFormGroupProps.isFieldError"
          name="subject"
          data-testid="subject"
          size="large"
          :options="selectSubjectOptions"
          :loading="(selectSubjectOptions.length === 0)"
        />
      </VFormGroup>

      <VFormGroup
        v-slot="VFormGroupProps"
        class="contact-us-form__input"
        :required="isFieldRequired('message')"
        :error-text="getErrorText('message')"
        label="Message"
      >
        <VFormTextarea
          :model-value="model.message"
          rows="3"
          placeholder="Enter your message"
          :is-error="VFormGroupProps.isFieldError"
          @update:model-value="model.message = $event"
        />
      </VFormGroup>
      <div class="contact-us-form__buttons is--margin-top-40">
        <VButton
          v-if="isInDialog"
          size="large"
          variant="outlined"
          @click="emit('close')"
        >
          Cancel
        </VButton>
        <VButton
          size="large"
          :block="!isInDialog"
          data-testid="button"
          :disabled="isDisabledButton"
        >
          Submit
        </VButton>
      </div>

      <div class="contact-us-form__info">
        <div>
          +1 609 733 7724
        </div>
        <div>
          manager@webdevelop.pro
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.contact-us-form {
  position: relative;
  z-index: 1;

  &:not(.is--in-dialog) {
    padding: 40px;
    background: $white;
    box-shadow: $box-shadow-medium;
  }

  &__info {
    margin-top: 40px;
    color: $black;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__input {
    & + & {
      margin-top: 20px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @include media-lt(tablet) {
      flex-direction: column-reverse;
      align-items: stretch;
      justify-content: flex-start;
    }

    .v-button {
      flex-grow: 1;
    }
  }

  &__wrap.is--bg-image {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -79.5px;
      bottom: -88px;
      width: calc(100% + (79.5px * 2));
      height: 100%;
      background: url('UiKit/assets/images/backgrounds/dots.svg') no-repeat;
      background-size: contain;
      background-position: left bottom;
      z-index: 0;
    }
  }
}
</style>
