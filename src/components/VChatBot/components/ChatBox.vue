<script setup lang="ts">
import {
  IChatBody, IMessage, IMessageArrayItem, MessageType,
} from '../types';
import {
  PropType, computed, nextTick, ref, watch,
} from 'vue';
import { bot } from '../utils';
import { useChat } from '../store/useChat';
import { storeToRefs } from 'pinia';
import { useScroll, watchThrottled } from '@vueuse/core';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import ChatBubble from './ChatBubble.vue';
import ChatFooter from './ChatFooter.vue';
import ChatSide from './ChatSide.vue';
import ChatSideMobile from './ChatSideMobile.vue';
import ChatHeader from './ChatHeader.vue';


const chatStore = useChat();
const { isPostMessageLoading } = storeToRefs(chatStore);
const { isTablet } = storeToRefs(useBreakpoints());

const props = defineProps({
  messages: Array as PropType<IMessageArrayItem[]>,
  botTypingId: Array as PropType<string[]>,
  disabled: Boolean,
});

// eslint-disable-next-line
const emit = defineEmits<{
  (e: 'text', text: string): void;
  (e: 'choice', choice: string): void;
  (e: 'linkChoice', value: IChatBody): void;
  (e: 'sideClick', item: IMessage): void;
  (e: 'embedCodeSuccess', item: IMessageArrayItem): void;
}>();

const messageBox = ref<HTMLElement | null>(null);
const { y } = useScroll(messageBox);
const autoScroll = ref(true);
const showChatBubbleWithDots = computed(() => (isPostMessageLoading.value && (props.botTypingId?.length === 0)));
// const showBotTyping = computed(() => (isPostMessageLoading.value || ((props.botTypingId?.length || 0) > 0)));

const onSideClick = (item: IMessage) => {
  emit('sideClick', item);
};

const isShowAvatar = (index: number) => {
  if (!props.messages) return;
  // eslint-disable-next-line consistent-return
  if (index === props.messages?.length) return true;
  // eslint-disable-next-line consistent-return
  return props.messages[index]?.user !== props.messages[index + 1]?.user;
};


const scrollToTopNewMessage = () => {
  if (!messageBox.value) return;

  const userChatBubbles = document.getElementsByClassName('chat-box__chat-bubble is--chat-end');
  const lastUserChatBubble = userChatBubbles[userChatBubbles.length - 1] as HTMLElement;
  if (!lastUserChatBubble) return;
  const difference = lastUserChatBubble.offsetTop - 70;
  // eslint-disable-next-line
  messageBox.value.scrollTo({
    top: difference,
    behavior: 'smooth',
  });
};

const scrollToTopLastMessage = () => {
  if (!messageBox.value) return;

  const botChatBubbles = document.getElementsByClassName('chat-box__chat-bubble is--chat-start');
  const lastBotChatBubble = botChatBubbles[botChatBubbles.length - 1] as HTMLElement;
  if (!lastBotChatBubble) return;
  const difference = lastBotChatBubble.offsetTop - 70;
  // eslint-disable-next-line
  messageBox.value.scrollTo({
    top: difference,
    behavior: 'smooth',
  });
};
// 12
const scrollToBottom = () => {
  if (!messageBox.value) return;
  messageBox.value.scrollTo({
    top: messageBox.value.scrollHeight,
  });
};

const checkIfLastMessageEmbed = () => {
  if (!props.messages) return;
  const lastMessage = props.messages[props.messages.length - 1];
  if (lastMessage?.message.type === MessageType.embedCode) scrollToTopLastMessage();
};

watch(() => props.messages?.length, async () => {
  await nextTick(
    () => {
      checkIfLastMessageEmbed();
      scrollToTopNewMessage();
    },
  );
});

watch(() => y.value, () => {
  if (!messageBox.value) return;
  const height = messageBox.value?.scrollHeight;
  // eslint-disable-next-line
  const top = messageBox.value?.clientHeight + y.value;
  // if user scrolled to top
  const defaultSafeDistance = isTablet.value ? 60 : 30;
  if (top + defaultSafeDistance < height) {
    autoScroll.value = false; // disable your action
  } else {
    autoScroll.value = true; // else, re-enable your action
  }
}, { deep: true });

watchThrottled(() => props.messages, () => {
  // if user did not scroll -> autoScroll is true, then scroll to bottom chat window
  if (autoScroll.value) scrollToBottom();
}, { deep: true, throttle: 500 });
</script>

<template>
  <div class="ChatBox chat-box">
    <ChatSide
      class="chat-box__side"
      @click-side="onSideClick"
    />
    <div class="chat-box__content">
      <ChatHeader />
      <!-- Messages -->
      <div
        ref="messageBox"
        class="chat-box__message-box"
      >
        <ClientOnly>
          <ChatBubble
            v-for="(message, index) in messages"
            :key="message.id"
            :message="message"
            :disabled="disabled"
            :user="message.user"
            class="chat-box__chat-bubble"
            :class="{ 'is--show-avatar': isShowAvatar(index) }"
            @link-choice="emit('linkChoice', $event)"
            @embed-code-success="emit('embedCodeSuccess', $event)"
            @choice="emit('choice', $event)"
          />

          <Transition
            name="fade"
            mode="out-in"
          >
            <ChatBubble
              v-show="showChatBubbleWithDots"
              :user="bot"
              is-dots
              class="chat-box__chat-bubble-loading"
            />
          </Transition>
        </ClientOnly>
      </div>

      <!-- Footer -->
      <ChatFooter
        class="chat-box__footer"
        :disabled="disabled"
        @text="emit('text', $event)"
      />

      <ChatSideMobile
        class="chat-box__contact-mobile"
        @click-side="onSideClick"
      />
    </div>
  </div>
</template>

<style lang="scss">
.chat-box {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid $gray-20;
  border-radius: 2px;
  overflow: hidden;

  &__side {
    width: 264px;
    flex-shrink: 0;
    position: relative;
    z-index: 0;

    @include media-lte(tablet) {
      display: none;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
    box-shadow: $box-shadow-small;
    position: relative;
    z-index: 1;
  }

  &__message-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px 40px;

    @include media-lte(tablet) {
      padding: 12px;
    }
  }

  &__footer {
    padding: 16px 40px;

    @include media-lte(tablet) {
      padding: 12px;
    }
  }

  &__chat-bubble-loading {
    min-height: 58px;
  }

  &__chat-bubble {
    min-height: 58px;

    &.is--chat-start {
      .chat-bubble__avatar {
        visibility: hidden;
        @include media-lte(tablet) {
          display: none;
        }
      }
    }

    &.is--show-avatar {
      .chat-bubble__avatar {
        visibility: visible !important;
        @include media-lte(tablet) {
          display: flex;
        }
      }
    }
  }

  &__contact-mobile {
    display: none;

    @include media-lte(tablet) {
      display: flex;
    }
  }
}
</style>
