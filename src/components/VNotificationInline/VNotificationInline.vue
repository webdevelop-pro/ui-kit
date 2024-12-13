<script lang="ts" setup="">
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  type?: 'error' | 'success' | 'info';
  show?: boolean;
  icon?: boolean;
  buttonText?: string;
}>(), {
  type: 'error',
});

const emit = defineEmits(['click']);

const buttonColor = computed(() => {
  if (props.type === 'success') {
    return 'success';
  }
  if (props.type === 'info') {
    return 'primary';
  }
  return 'danger';
});

const onClick = () => {
  emit('click');
};
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="show"
    class="VNotificationInline notification-inline"
    :class="[`is--${type}`, { 'is--icon': icon }]"
  >
    <p class="notification-inline__body">
      <VSvgIcon
        v-if="(type === 'error') && icon"
        class="svg-icon notification-inline__icon"
        name="circle-exclamation"
      />
      <VSvgIcon
        v-else-if="(type === 'info') && icon"
        class="svg-icon notification-inline__icon"
        name="circle-info"
      />
      <VSvgIcon
        v-else-if="icon"
        class="svg-icon notification-inline__icon"
        name="circle-check"
      />
      <span class="notification-inline__content">
        <div>
          <span
            v-if="$slots.title"
            class="notification-inline__title is--h5__title"
          >
            <slot name="title" />
          </span>
          <slot />
        </div>
        <VButton
          v-if="buttonText"
          size="small"
          :color="buttonColor"
          class="notification-inline__button"
          @click="onClick"
        >
          {{ buttonText }}
        </VButton>
      </span>
    </p>
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *

.notification-inline
  color: $notification-inline-color
  margin: $notification-inline-margin
  border-left: solid 2px transparent

  &__body
    font-size: $notification-inline-font-size
    font-weight: $notification-inline-font-weight
    line-height: $notification-inline-line-height
    padding: $notification-inline-padding
    margin-bottom: 0
    @include font(400)
    display: flex
    align-items: center

  &__icon
    width: $notification-inline-width
    height: $notification-inline-height
    margin-top: -1px
    flex-shrink: 0

  &__button
    flex-shrink: 0

  &__content
    margin-left: $notification-inline-margin-left
    display: flex
    align-items: center
    gap: 20px
    justify-content: space-between
    width: 100%
    a
      position: relative
      display: inline
      z-index: 1
      @include mt(.3s)
      color: $notification-inline-link-color
      font-size: $notification-inline-font-size
      line-height: $notification-inline-line-height
      @include font(400)
      // border-bottom: solid 1px $notification-inline-link-color
      &:hover
        @include mt(.3s)
        // border-bottom: solid 1px transparent
        color: $notification-inline-a-hover-color
  &____title
    margin-right: 4px

  &.is--error
    background-color: $notification-inline-error-background-color
    border-color: $notification-inline-error-color
    .notification-inline__icon
      color: $notification-inline-error-color
    .notification-inline__content
      a
        color: $notification-inline-error-color
        border-color: $notification-inline-error-color
        &:hover
          color: $notification-inline-error-color
          border-color: transparent
  &.is--info
    background-color: $notification-inline-info-background-color
    border-color: $notification-inline-info-color
    .notification-inline__icon
      color: $notification-inline-info-color
    .notification-inline__content
      a
        color: $notification-inline-info-color
        border-color: $notification-inline-info-color
        &:hover
          color: $notification-inline-info-color
          border-color: transparent
  &.is--success
    background-color: $notification-inline-success-background-color
    border-color: $notification-inline-success-color
    .notification-inline__icon
      color: $notification-inline-success-color
    .notification-inline__content
      a
        color: $notification-inline-success-color
        border-color: $notification-inline-success-color
        &:hover
          color: $notification-inline-success-color
          border-color: transparent
</style>
