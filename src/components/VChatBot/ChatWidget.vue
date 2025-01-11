<script setup lang="ts">
import {
  IChatBody, IMessage, IMessageArrayItem, MessageType,
} from './types';
import {
  computed, onBeforeUnmount, ref, watch,
} from 'vue';
import { useChat } from './store/useChat';
import { nanoid } from 'nanoid';
import {
  me, bot, defaultMessages, inactivityMessageDelay, queryTextDelay, links,
} from './utils';
import { storeToRefs } from 'pinia';
import { useArrayDifference } from '@vueuse/core';
import ChatBox from './components/ChatBox.vue';

// store init
const chatStore = useChat();
const {
  messages, botTypingId, choices, topic,
} = storeToRefs(chatStore);

const queryText = computed(() => (
  (window && window.location.search) ? new URLSearchParams(window.location.search).get('text') : null));
const queryTopic = computed(() => (
  (window && window.location.search) ? new URLSearchParams(window.location.search).get('topic') : null));
const queryTextPrinted = ref(false);
const queryTextCanPrint = ref(true);
const defaultAttributes = computed(() => ({ topic: topic.value, step: '' }));
let inactivityTimer: ReturnType<typeof setTimeout>;
let queryTextTimer: ReturnType<typeof setTimeout>;

// init vars
const messageInit = computed(() => ({
  id: nanoid(),
  user: me.value,
  attributes: {
    topic: queryTopic.value ? queryTopic.value : topic.value,
    step: 'init',
  },
  message: {
    type: MessageType.text,
    value: 'Hello',
  },
}));

const init = () => {
  // init chat by sending hello message
  void chatStore.handleInitMessage(messageInit.value);
};

init();


const latestMessage = computed(() => messages.value[messages.value.length - 1]);
const latestMessageHasChoices = computed(() => (latestMessage.value.choices && latestMessage.value.choices.length > 0));
const isLatestInactivityMessage = computed(() => {
  const inactivityMessage = defaultMessages.filter((item) => item.event === 'inactivity');
  const inactivityMessage2 = defaultMessages.filter((item) => item.event === 'inactivity2');
  return (latestMessage.value.message.value === inactivityMessage[0].value)
   || (latestMessage.value.message.value === inactivityMessage2[0].value);
});
const isEmbedCodeMessage = computed(() => latestMessage.value.message.type === MessageType.embedCode);
const isHubspotMessage = computed(() => latestMessage.value.message.type === MessageType.embedCode);
const noInactivityMessage = computed(() => isLatestInactivityMessage.value || isEmbedCodeMessage.value
  || isHubspotMessage.value || latestMessageHasChoices.value);
const isStartTimer = computed(() => ((latestMessage.value?.user === bot.value) && (botTypingId.value.length === 0)
  && !noInactivityMessage.value));

const handleDefaultMessage = (item: IMessageArrayItem, addNewMessage = true) => {
  queryTextCanPrint.value = false;
  const defaultMessage = defaultMessages.filter((defaultItem) => (
    defaultItem.value.toLowerCase() === item.message.value.toLowerCase()));
  if (defaultMessage.length === 0) {
    void chatStore.handleNewMessage(item);
  } else {
    defaultMessage.forEach((defaultItem) => {
      if (addNewMessage) chatStore.addNewMessage({ ...item, ...defaultItem });
      if (defaultItem?.answear && (defaultItem?.answear?.length > 0)) {
        defaultItem?.answear.forEach((answear) => {
          chatStore.addNewMessage({
            id: nanoid(),
            user: bot.value,
            attributes: defaultAttributes.value,
            message: {
              ...answear,
              prefill: {
                message: queryTopic.value,
              }, // TODO make prefill more general
            },
          });
        });
      }
    });
  }
};

const checkForMatchingLinkAndSetTopic = (inputText: string) => {
  const matchedLink = Object.entries(links).find(([key]) => inputText.toLowerCase().includes(key));
  const matchedTopic = matchedLink ? matchedLink[1].attributes.topic : null;
  if (matchedTopic) {
    chatStore.setTopic(matchedTopic);
  }
};

const handleChoice = (text: string) => {
  const message = {
    id: nanoid(),
    user: me.value,
    attributes: defaultAttributes.value,
    message: {
      type: MessageType.choice,
      value: text,
    },
  };
  checkForMatchingLinkAndSetTopic(text);
  handleDefaultMessage(message);
};

const handleInput = (text: string) => {
  const message = {
    id: nanoid(),
    user: me.value,
    attributes: defaultAttributes.value,
    message: {
      type: MessageType.text,
      value: text,
    },
  };
  checkForMatchingLinkAndSetTopic(text);
  handleDefaultMessage(message);
};

const handleLinkChoice = (value: IChatBody) => {
  const message: IMessageArrayItem = {
    id: nanoid(),
    user: me.value,
    attributes: value.attributes,
    message: value.message,
  };
  if (value.attributes.topic) chatStore.setTopic(value.attributes.topic);
  handleDefaultMessage(message);
};

const handleSideClick = (item: IMessage) => {
  const message: IMessageArrayItem = {
    id: nanoid(),
    user: me.value,
    attributes: defaultAttributes.value,
    message: item,
  };
  if (item.value) chatStore.setTopic(item.value);
  handleDefaultMessage(message);
};

const handleEmbedCodeSuccess = (message: IMessageArrayItem) => {
  const afterMeetingMessages = defaultMessages.filter((item) => item.event === message?.message?.event);
  afterMeetingMessages.forEach((item) => {
    chatStore.addNewMessage({
      id: nanoid(),
      user: bot.value,
      attributes: defaultAttributes.value,
      message: {
        type: item.type,
        value: item.value,
      },
    });
  });
};

const handleInactivityMessage = () => {
  let inactivityMessage = defaultMessages.filter((item) => item.event === 'inactivity');
  if (inactivityMessage[0].choices && (choices.value.length > 0)) {
    const result = useArrayDifference(choices.value, inactivityMessage[0].choices);
    if (result.value.length === 0) {
      inactivityMessage = defaultMessages.filter((item) => item.event === 'inactivity2');
    }
  }
  const message = {
    id: nanoid(),
    user: bot.value,
    attributes: defaultAttributes.value,
    message: {
      type: inactivityMessage[0].type,
      value: inactivityMessage[0].value,
    },
    choices: inactivityMessage[0].choices,
    finished: true,
  };
  void chatStore.addNewMessage(message);
};

const handleQueryText = () => {
  const bookACall = defaultMessages.find((message) => message.value.toLowerCase() === queryText.value?.toLowerCase());
  if (!bookACall) return;
  const message = {
    id: nanoid(),
    user: me.value,
    attributes: defaultAttributes.value,
    message: bookACall,
  };
  handleDefaultMessage(message, false);
  queryTextPrinted.value = true;
};

const startInactivityTimer = () => {
  inactivityTimer = setTimeout(handleInactivityMessage, inactivityMessageDelay);
};

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
};

onBeforeUnmount(() => {
  chatStore.cancelStream();
  resetInactivityTimer();
  chatStore.resetChatAll();
});


watch(() => [queryText.value, botTypingId.value.length, queryTextCanPrint.value], () => {
  clearTimeout(queryTextTimer);
  if ((botTypingId.value.length === 0) && queryText.value && !queryTextPrinted.value && queryTextCanPrint.value) {
    queryTextTimer = setTimeout(() => handleQueryText(), queryTextDelay);
  }
});

watch(() => [messages.value.length, isStartTimer.value], () => {
  if (isStartTimer.value) {
    resetInactivityTimer();
    startInactivityTimer();
  } else {
    resetInactivityTimer();
  }
}, { immediate: true });


watch(() => queryTopic.value, () => {
  if (queryTopic.value && !topic.value) chatStore.setTopic(queryTopic.value);
}, { immediate: true });
</script>

<template>
  <ChatBox
    :messages="messages"
    :bot-typing-id="botTypingId"
    :disabled="false"
    @choice="handleChoice"
    @text="handleInput"
    @link-choice="handleLinkChoice"
    @side-click="handleSideClick"
    @embed-code-success="handleEmbedCodeSuccess"
  />
</template>
