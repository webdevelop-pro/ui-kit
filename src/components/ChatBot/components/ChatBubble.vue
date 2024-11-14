<script setup lang="ts">
import {
  defineProps, computed, ref, onMounted, watch,
  defineAsyncComponent,
  hydrateOnVisible,
} from 'vue';
import { links, me, bot } from '../utils';
import { IMessageArrayItem, MessageType, User } from '../types';
import ThreeDotsLoading from './ThreeDotsLoading.vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import { marked } from 'marked';
import { useChat } from '../store/useChat';
import { storeToRefs } from 'pinia';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ChatAvatar = defineAsyncComponent({
  loader: () => import('./ChatAvatar.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ChatEmbedCode = defineAsyncComponent({
  loader: () => import('./ChatEmbedCode.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ChatHubspotForm = defineAsyncComponent({
  loader: () => import('./ChatHubspotForm.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ChatChoices = defineAsyncComponent({
  loader: () => import('./ChatChoices.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const props = defineProps<{
  message?: IMessageArrayItem;
  user?: User;
  disabled?: boolean;
  isDots?: boolean;
}>();
const emit = defineEmits(['linkChoice', 'embedCodeSuccess', 'choice']);
const myMessage = computed(() => props.user?.id === me.value.id);
const isEmbedCode = computed(() => (props.message?.message?.type === MessageType.embedCode));
const isHsForm = computed(() => (props.message?.message?.type === MessageType.hsForm));
const chatStore = useChat();
const { messages } = storeToRefs(chatStore);
const botText = ref('');

const latestUserMessage = computed(() => {
  const filteresUserMessages = messages.value.filter((msg) => msg.user === me.value);
  const latestUserMessageInner = filteresUserMessages[filteresUserMessages.length - 1];
  return latestUserMessageInner;
});

function replaceLinks(text: string) {
  const replacedKeys = new Set();
  Object.keys(links).forEach((key) => {
    const regex = new RegExp(`(?<!data-key=")\\b${key}\\b(?!")`, 'gi');
    if (latestUserMessage.value?.message?.value.toLowerCase().includes(key.toLowerCase())) {
      return;
    }
    // eslint-disable-next-line
    text = text.replace(regex, (match) => {
      const spanRegex = new RegExp(`<span[^>]*?data-key="${key}"[^>]*?>.*?</span>`, 'gi');
      if (!replacedKeys.has(key) && !spanRegex.test(match) && !props.message?.message?.disableLinkReplace) {
        replacedKeys.add(key);
        return `<span class="is--link-regular is--link-replaced" data-key="${key}">${match}</span>`;
      }
      return match;
    });
  });
  return text;
}

const onLinkChoiceClick = (key: string) => {
  emit('linkChoice', links[key]);
};

const handleClick = (event: Event) => {
  if (!event.target) return;
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  // Handle click event here
  const { key } = event.target.dataset;
  if (key) {
    onLinkChoiceClick(key);
  }
};

const onEmbedCodeSuccess = (message: IMessageArrayItem) => {
  emit('embedCodeSuccess', message);
};

const onButtonClick = (message: string) => {
  emit('choice', message);
};

const parseBotText = () => {
  if (!props.message?.message?.value) return;
  // eslint-disable-next-line
  botText.value = replaceLinks(marked.parse(props.message?.message?.value));
};

onMounted(() => {
  parseBotText();
});

watch(() => props.message?.message?.value, () => {
  parseBotText();
});
</script>

<template>
  <div
    class="ChatBubble chat-bubble is--no-margin"
    :class="{
      'is--chat-end': myMessage,
      'is--chat-start': !myMessage,
    }"
  >
    <!-- Avatar -->
    <div
      v-if="user?.avatar"
      class="chat-bubble__avatar-wrap"
    >
      <ChatAvatar class="chat-bubble__avatar" />
    </div>

    <!-- Main text -->
    <div
      v-if="!isDots"
      class="chat-bubble__bubble is--body"
      :class="{ 'is--embde-code': isEmbedCode }"
    >
      <slot>
        <div
          v-if="props.message?.user === bot"
          class="chat-bubble__markdown"
          @click="handleClick"
          v-html="botText"
        />
        <div
          v-else
          class="chat-bubble__markdown"
          @click="handleClick"
          v-html="marked.parse(props.message?.message?.value)"
        />

        <ChatEmbedCode
          v-if="isEmbedCode"
          :message="message"
          class="chat-bubble__embed-code"
          @success="onEmbedCodeSuccess"
        />

        <ChatHubspotForm
          v-if="isHsForm"
          :message="message"
          class="chat-bubble__embed-code"
          @success="onEmbedCodeSuccess"
        />

        <Transition
          name="fade"
          mode="out-in"
        >
          <ChatChoices
            v-if="message?.choices && props.message?.finished"
            :choices="message?.choices"
            @choice="emit('choice', $event)"
          />
        </Transition>

        <VButton
          v-if="props.message?.message.button"
          :size="props.message?.message.button.size"
          :variant="props.message?.message.button.type"
          :block="props.message?.message.button.block"
          class="chat-bubble__button"
          @click="onButtonClick(props.message?.message.button.text)"
        >
          {{ props.message?.message.button.text }}
        </VButton>
      </slot>
    </div>

    <ThreeDotsLoading
      v-if="isDots"
      class="chat-bubble__dots"
    />
  </div>
</template>

<style lang="scss">
.chat-bubble {
  $root: &;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @include media-lte(tablet) {
    grid-template-columns: repeat(1, 1fr);
  }

  &__avatar {
    --chat-avatar--size: 34px;
  }

  &__avatar-wrap {
    flex-shrink: 0;
  }

  &__markdown {
    width: 100%;

    p {
      margin: 0 !important;
      color: inherit;
    }

    h1 {
      font-size: 20px;
      line-height: 30px;
    }

    li {
      list-style: disc;
      margin-left: 20px;
    }

    ul, ol {
      padding: 0;
    }
  }

  &__bubble {
    display: flex;
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    color: $gray-80;

    @include media-lte(tablet) {
      padding: 12px 16px;
    }

    &.is--embde-code {
      width: 100%;
    }
  }

  &.is--chat-start {
    width: 100%;
    margin-top: 12px;
    column-gap: 12px;

    @include media-gte(tablet) {
      padding-right: 40px;
      place-items: end start;
      grid-template-columns: auto 1fr;
    }

    #{$root}__avatar-wrap {
      @include media-gte(tablet) {
        grid-column-start: 1;
      }
    }

    #{$root}__header{
      @include media-gte(tablet) {
        grid-column-start: 2;
      }
    }

    #{$root}__bubble{
      border-radius: 12px 12px 12px 0;
      background: $primary-light;

      @include media-gte(tablet) {
        grid-column-start: 2;
      }

      @include media-lte(tablet) {
        grid-row-start: 1;
        margin-bottom: 4px;
      }
    }

    & + & {
      margin-top: 4px;
    }
  }
  &.is--chat-end {
    place-items: end;
    grid-template-columns: 1fr auto;
    margin-top: 12px;
    padding-left: 40px;

    #{$root}__avatar {
      grid-column-start: 2;
    }

    #{$root}__header{
      grid-column-start: 1;
    }

    #{$root}__bubble{
      grid-column-start: 1;
      border-radius: 12px 12px 0 12px;
      background: $primary-dark;
      color: $white !important;
      p {
        color: $white !important;
      }
    }
  }

  &__embed-code {
    width: 100%;
  }

  &__dots {
    color: $gray-20 !important;
    margin: 38px 0 -3px;
  }

  &__button {
    margin-top: 16px;
  }
}

:deep(code) {
  background: none;
  width: 100%;
  overflow: auto;
}
:deep(pre) {
  background: none;
  width: 100%;
  overflow: auto;
}
</style>
