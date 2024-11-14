<script setup lang="ts">
import { PropType, computed } from 'vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';
import VButton from 'UiKit/components/VButton/VButton.vue';

type INotificationData = {
  status: number;
  description?: string;
}

defineEmits(['close']);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  data: {
    type: Object as PropType<INotificationData>,
  },
  type: {
    type: String as PropType<'error' | 'success' | 'info'>,
  },
  duration: {
    type: Number,
    default: 10000,
  },
});

const title = computed(() => (props.text ? props.text : ''));

const description = computed(() => {
  if (props.data?.description) return props.data?.description;
  if (props.description) return props.description;
  return undefined;
});
</script>

<template>
  <div
    class="VToaster v-toaster"
    :class="[`is--${type}`]"
  >
    <VSvgIcon
      v-if="(type === 'error')"
      class="v-toaster__icon"
      name="circle-exclamation"
    />
    <VSvgIcon
      v-else-if="(type === 'info')"
      class="v-toaster__icon"
      name="circle-info"
    />
    <VSvgIcon
      v-else
      class="v-toaster__icon"
      name="circle-check"
    />

    <div class="v-toaster__info">
      <div
        v-if="title"
        class="v-toaster__title is--h5__title"
        data-testid="notification-status"
        v-text="title"
      />
      <div
        v-if="description"
        class="v-toaster__description is--body"
        data-testid="notification-description"
        v-text="description"
      />
    </div>

    <div class="v-toaster__progress-bar">
      <div
        v-if="duration > 0"
        :style="{ animationDuration: `${duration}ms` }"
        class="v-toaster__progress-bar-inner"
      />
    </div>

    <VButton
      size="small"
      icon-only
      variant="link"
      class="v-toaster__close-button is--no-margin"
      @click="$emit('close')"
    >
      <VSvgIcon
        name="close"
        class="v-toaster__close"
        data-testid="close-notification-button"
      />
    </VButton>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
@use 'UiKit/styles/_variables.sass' as variables

.v-toaster
  $root: &

  position: relative
  display: flex
  width: 450px
  height: auto
  min-height: 66px
  padding: 21px 18px
  margin-bottom: 10px
  background: colors.$white
  border-left: 2px solid transparent
  box-shadow: variables.$box-shadow-medium

  @media screen and (max-width: 768px)
    width: 100%
    min-height: auto
    padding: 21px 18px !important
    margin-bottom: 0

  &__icon
    margin-right: 8px
    margin-top: 1px
    width: 20px
    flex-shrink: 0

  &__title
    color: colors.$black

  &__description
    margin-top: 4px
    color: colors.$gray-80

  &__close-button
    position: absolute !important
    top: 8px
    right: 8px

  &__close
    width: 14px
    height: 14px
    color: colors.$black

  &__progress-bar
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 2px
    background: colors.$white
    border-radius: 10px

  &__progress-bar-inner
    width: 0
    height: 2px
    background: colors.$primary
    border-radius: 10px
    animation: v-toaster__progress 10000ms ease

  &.is--success
    border-color: colors.$secondary
    #{$root}__icon
      color: colors.$secondary
    #{$root}__progress-bar-inner
      background: colors.$secondary
  &.is--error
    border-color: colors.$red
    #{$root}__icon
      color: colors.$red
    #{$root}__progress-bar-inner
      background: colors.$red
    #{$root}__close
      color: colors.$red
  &.is--info
    border-color: colors.$primary
    #{$root}__icon
      color: colors.$primary
    #{$root}__progress-bar-inner
      background: colors.$primary
    #{$root}__close
      color: colors.$primary

@keyframes v-toaster__progress
  from
    width: 100%
  to
    width: 0

.vue-notification-wrapper
  overflow: visible
  @media screen and (max-width: 768px)
    margin-top: 10px !important

  &:last-child
    .v-toaster
      @media screen and (max-width: 768px)
        width: 100%
        height: auto

.vue-notification-group
  @media screen and (max-width: 768px)
    top: auto !important
    bottom: 0 !important
    left: 0 !important
    width: 100% !important

  @media screen and (min-width: 768px)
    top: 20px !important
    right: 20px !important
    width: fit-content !important
</style>
