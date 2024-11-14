<script setup lang="ts">
import { IMessage } from '../types';
import { chatSideInfo } from '../utils';
import VButton from 'UiKit/components/VButton/VButton.vue';
import CloseIcon from '../assets/angles-left.svg?component';
import { ref } from 'vue';

const emit = defineEmits(['clickSide']);

const isOpened = ref(true);

const onClick = (item: IMessage) => {
  emit('clickSide', item);
};

const onHideSideBar = () => {
  isOpened.value = !isOpened.value;
};
</script>

<template>
  <div
    class="ChatSide chat-side"
    :class="{ 'is--closed': !isOpened }"
  >
    <VButton
      icon-only
      size="small"
      variant="link"
      class="chat-side__hide-button is--no-margin"
      @click="onHideSideBar"
    >
      <CloseIcon
        alt="hide sidebar icon"
        class="chat-side__hide-button-icon"
      />
    </VButton>
    <Transition
      name="transition-translate-right"
      mode="out-in"
    >
      <div
        v-if="isOpened"
        class="chat-side__wrap"
      >
        <template
          v-for="(item) in chatSideInfo"
          :key="item.text"
        >
          <div
            v-if="item.type === 'title'"
            class="chat-side__title is--h6__title"
          >
            {{ item.value }}
          </div>
          <div
            v-if="item.type === 'text'"
            class="chat-side__text is--small"
          >
            {{ item.value }}
          </div>
          <div
            v-if="item.type === 'subtitle'"
            class="chat-side__subtitle is--h6__title"
          >
            {{ item.value }}
          </div>
          <div
            v-if="item.type === 'button'"
            class="chat-side__link"
          >
            <VButton
              size="small"
              variant="link"
              class="chat-side__button is--no-margin"
              @click="onClick(item)"
            >
              {{ item.value }}
            </VButton>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.chat-side {
  $root: &;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: $gray-10;
  position: relative;
  width: 100%;
  transition: width 0.3s ease;

  &.is--closed {
    width: 32px;
  }

  &__wrap {
    padding: 40px;
    width: 264px;
    height: 100%;
  }

  &__text {
    margin-top: 8px !important;
  }

  &__link {
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid $gray-40;

    &:first-of-type {
      margin-top: 16px;
      border-top: 1px solid $gray-40;
    }
  }

  &__subtitle {
    margin-top: 28px !important;
    color: $black;
  }

  &__text + &__link,
  &__subtitle + &__link,
  &__title + &__link {
    margin-top: 16px;
    border-top: 1px solid $gray-40;
  }

  &__hide-button {
    position: absolute !important;
    right: 0;
    top: 19px;
    transition: transform 0.3s ease;

    #{$root}.is--closed & {
      transform: rotate(180deg);
    }
  }

  &__hide-button-icon {
    width: 16px;
  }
}

.transition-translate-right {
  &-enter-active {
    transition: transform 0.4s ease;
  }
  &-leave-active {
    transition: transform 0.3s ease;
  }

  &-enter-from {
    transform: translateX(-100%);
  }
  &-leave-to {
    transform: translateX(-100%);
  }
}
</style>
