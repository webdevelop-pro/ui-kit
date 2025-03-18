import { acceptHMRUpdate, defineStore } from 'pinia';
import { generalErrorHandling } from 'UiKit/helpers/generalErrorHandling';
import { ref } from 'vue';
import {
  IMessageArrayItem, IStreamItem, IChatAttributes, MessageType,
} from '../types';
import { fetchPostMessageChat } from '../api/chat';
import { bot } from '../utils';

const messages = ref<IMessageArrayItem[]>([]);
const choices = ref<string[]>([]);
const botTypingId = ref<string[]>([]);
const topic = ref<string>('');

export const useChat = defineStore('chat', () => {
  const addNewMessage = (message: IMessageArrayItem) => {
    messages.value.push(message);
  };

  let buffer = '';

  const handleStreamData = (value: string, attributes: IChatAttributes) => {
    if (!value || (value === '{}')) return;
    const arrayOfValue = value.split('\n');
    arrayOfValue.forEach((item: string) => {
      if (!item) {
        return;
      }
      try {
        const data = JSON.parse(buffer + item) as IStreamItem;
        buffer = '';
        // if don't have this stream in botTypingId then add
        if (botTypingId.value.filter((streamId) => streamId === data.id).length === 0) {
          botTypingId.value.push(data.id);
        }
        // check if we have stream message in messages array
        let messagesHasStreamId = messages.value.filter((messageItem: IMessageArrayItem) => messageItem.id === data.id);
        // if there is no messagesHasStreamId means this is new stream, then push new message object
        if (messagesHasStreamId.length === 0) {
          addNewMessage({
            id: data.id,
            user: bot.value,
            attributes,
            message: { type: MessageType.text, value: '' },
            choices: data.choices,
            finished: false,
          });
          choices.value = data.choices;
          messagesHasStreamId = messages.value.filter((messageItem: IMessageArrayItem) => messageItem.id === data.id);
        }
        const { ai_response } = data;

        if (ai_response && ai_response.length > 0) {
          const { content } = ai_response[0].delta;
          if (content) {
            setTimeout(() => {
              messagesHasStreamId[0].message.value += content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            }, 100);
          }
          if (ai_response[0].finish_reason === 'stop') {
            setTimeout(() => {
              botTypingId.value = botTypingId.value.filter((streamId) => streamId !== data.id);
              messagesHasStreamId[0].finished = true;
            }, 150);
          }
        }
      } catch (e) {
        // meaning we don't have full json yet
        if (e instanceof SyntaxError) {
          buffer = item;
        } else {
          console.error(e);
        }
      }
    });
  };

  const isPostMessageLoading = ref(false);
  const isPostMessageError = ref(false);
  const streamReader = ref<ReadableStreamDefaultReader>();
  const postMessage = async (message: IMessageArrayItem) => {
    isPostMessageLoading.value = true;
    isPostMessageError.value = false;
    const response = await fetchPostMessageChat({
      attributes: message.attributes,
      message: message.message,
    }).catch((error: Response) => {
      isPostMessageError.value = true;
      botTypingId.value = [];
      void generalErrorHandling(error);
    });
    // handle stream data
    if (response && response.body) {
      streamReader.value = response.body.pipeThrough(new TextDecoderStream()).getReader();

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await streamReader.value.read();
        if (done) break;

        handleStreamData(value, message.attributes);
      }
    }
    isPostMessageLoading.value = false;
  };

  // add to array and send to backend
  const handleNewMessage = async (message: IMessageArrayItem) => {
    messages.value.push(message);
    await postMessage(message);
  };

  // add to array and send to backend
  const handleInitMessage = async (message: IMessageArrayItem) => {
    await postMessage(message);
  };

  const shiftMessage = () => {
    messages.value.shift();
  };

  const setTopic = (text: string | undefined) => {
    if (text) topic.value = text;
  };

  const cancelStream = () => {
    if (!streamReader.value) return;
    void streamReader.value.cancel();
  };

  const resetChatAll = () => {
    isPostMessageLoading.value = false;
    isPostMessageError.value = false;
    botTypingId.value = [];
    messages.value = [];
    choices.value = [];
  };

  return {
    postMessage,
    resetChatAll,
    addNewMessage, // add to array
    shiftMessage,
    handleNewMessage, // add to array and send to backend
    handleInitMessage,
    cancelStream,

    isPostMessageLoading,

    isPostMessageError,

    messages,
    botTypingId,
    choices,
    topic,
    setTopic,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChat, import.meta.hot));
}
