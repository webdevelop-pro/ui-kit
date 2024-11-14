<script setup lang="ts">
import { PropType, onMounted } from 'vue';
import { IMessageArrayItem } from '../types';
import { env } from '@/config/env';

const emit = defineEmits(['success']);

const props = defineProps({
  message: Object as PropType<IMessageArrayItem>,
});

const prepopulate = (formElement: HTMLElement) => {
  if (props.message?.message.code === env.leaveEmail) {
    const element = formElement.querySelector<HTMLInputElement>('*[name="message"]');
    if (element) element.value = props.message?.message?.prefill?.message || '';
  }
};

const init = () => {
  const script = document.createElement('script');
  script.src = 'https://js.hsforms.net/forms/v2.js';
  script.defer = true;
  script.async = true;
  document.body.appendChild(script);
  script.addEventListener('load', () => {
    if (window.hbspt) {
      // eslint-disable-next-line
      window.hbspt.forms.create({
        portalId: '6876576',
        formId: props.message?.message.code,
        target: `#hubspotForm${props.message?.id}`,
        onFormReady(formElement: HTMLElement) {
          prepopulate(formElement);
        },
        onFormSubmit(formElement: HTMLElement) {
          prepopulate(formElement);
        },
        onFormSubmitted() {
          emit('success', props.message);
        },
      });
    }
  });
};
onMounted(() => {
  init();
});
</script>

<template>
  <div class="ChatEmbedCode chat-embed-code">
    <div
      v-once
      :id="`hubspotForm${message?.id}`"
      class="chat-embed-code__form"
    />
  </div>
</template>

<style lang="scss">
.chat-embed-code {
  $root: &;

  display: flex;
  align-items: flex-start;
  gap: 4px;
  width: 100%;

  &__form {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
