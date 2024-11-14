<script setup lang="ts">
import { IMessage } from '../types';
import { chatSideInfoMobileText, chatSideInfoMobileButtons } from '../utils';
import VButton from 'UiKit/components/VButton/VButton.vue';

const emit = defineEmits(['clickSide']);

const onClick = (item: IMessage) => {
  emit('clickSide', item);
};

</script>

<template>
  <div
    class="ChatSideMobile chat-side-mobile is--no-margin"
  >
    <div
      class="chat-side-mobile__text-wrap"
    >
      <template
        v-for="(item) in chatSideInfoMobileText"
        :key="item.text"
      >
        <div
          v-if="item.type === 'title'"
          class="chat-side-mobile__title is--h6__title"
        >
          {{ item.value }}
        </div>
        <div
          v-if="item.type === 'text'"
          class="chat-side-mobile__text is--small"
        >
          {{ item.value }}
        </div>
      </template>
    </div>

    <div
      class="chat-side-mobile__buttons-wrap"
    >
      <template
        v-for="(item) in chatSideInfoMobileButtons"
        :key="item.text"
      >
        <div
          v-if="item.type === 'button'"
          class="chat-side-mobile__link"
        >
          <VButton
            size="small"
            variant="link"
            class="chat-side-mobile__button"
            @click="onClick(item)"
          >
            {{ item.value }}
          </VButton>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.chat-side-mobile {
  $root: &;

  display: flex;
  align-items: center;
  background: $gray-10;
  position: relative;
  width: 100%;
  transition: width 0.3s ease;
  padding: 12px;

  &__title {
    color: $black;
  }

  &__text {
    color: $black;
  }

  &__link {
    width: 100%;
  }

  &__text-wrap {
    display: flex;
    padding-right: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
  }

  &__buttons-wrap {
    display: flex;
    padding-left: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    border-left: 1px solid $gray-20;
  }
}
</style>
