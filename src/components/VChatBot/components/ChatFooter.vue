<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import Arrow from 'UiKit/assets/images/arrow-up.svg';

const props = defineProps({
  isBotTyping: Boolean,
  disabled: Boolean,
});

const emit = defineEmits<{
  (e: 'text', text: string): void;
  (e: 'choice', choice: string): void;
}>();

const messageInput = ref('');
const disabledButton = computed(() => (props.disabled || (messageInput.value === '')));

//  Send a new message to the server and add it to our messages list
const onClick = () => {
  emit('text', messageInput.value);
  nextTick(() => {
    messageInput.value = '';
  });
};
</script>

<template>
  <footer class="ChatFooter chat-footer">
    <div class="chat-footer__wrap">
      <!-- User message input field -->
      <VFormInput
        ref="input"
        :model-value="messageInput"
        placeholder="Type in"
        class="chat-footer__input"
        :disabled="disabled"
        size="large"
        @update:model-value="messageInput = $event"
        @enter="onClick"
      />
      <VButton
        variant="outlined"
        icon-only
        size="large"
        :disabled="disabledButton"
        class="chat-footer__send-icon "
        aria-label="Send message"
        @click="onClick"
      >
        <component
          :is="Arrow"
        />
      </VButton>
    </div>

    <!-- Indicator who is typing -->
    <div class="chat-footer__typing is--small">
      <span v-if="isBotTyping">
        Bot is typing
      </span>
    </div>
  </footer>
</template>

<style lang="scss">
.chat-footer {
  width: 100%;
  position: relative;

  &__wrap {
    display: flex;
    gap: 4px;
  }

  &__typing {
    position: absolute;
    bottom: 0;
  }

  &__send-icon {
    width: 20px;
  }
}
</style>
