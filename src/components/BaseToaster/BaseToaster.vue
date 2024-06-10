<script setup lang="ts">
import { PropType, computed } from 'vue'
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'
import { BaseButton } from 'UiKit/components/BaseButton'

type INotificationData = {
  status: number
  description?: string
}

defineEmits(['close'])

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
})

const title = computed(() => (props.text ? props.text : ''))

const description = computed(() => {
  if (props.data?.description) return props.data?.description;
  if (props.description) return props.description;
  return undefined;
})
</script>

<template>
  <div
    class="BaseToaster base-toaster"
		:class="[`is--${type}`]"
  >
    <BaseSvgIcon
			v-if="(type === 'error')"
      class="base-toaster__icon"
			alt="exclamation-circle-icon"
			name="circle-exclamation"
		/>
		<BaseSvgIcon
			v-else-if="(type === 'info')"
			alt="info-circle-icon"
      class="base-toaster__icon"
			name="circle-info"
		/>
		<BaseSvgIcon
			v-else
			alt="info-circle-icon"
      class="base-toaster__icon"
			name="circle-check"
		/>

    <div class="base-toaster__info">
      <div
        v-if="title"
        class="base-toaster__title is--h5__title"
        data-testid="notification-status"
        v-text="title"
      />
      <div
        v-if="description"
        class="base-toaster__description is--body"
        data-testid="notification-description"
        v-text="description"
      />
    </div>

    <div class="base-toaster__progress-bar">
      <div
        v-if="duration > 0"
        :style="{ animationDuration: `${duration}ms` }"
        class="base-toaster__progress-bar-inner"
      />
    </div>

    <BaseButton
      size="small"
      icon-only
      variant="link"
      class="base-toaster__close-button"
      @click="$emit('close')"
    >
      <BaseSvgIcon
        name="close"
        class="base-toaster__close"
        data-testid="close-notification-button"
        alt="notification close icon"
      />
    </BaseButton>
  </div>
</template>

<style lang="sass">
@import 'index.sass'
.base-toaster
  $root: &

  position: relative
  display: flex
  width: 450px
  height: auto
  min-height: 66px
  padding: 21px 18px
  margin-bottom: 10px
  background: $white
  border-left: 2px solid transparent
  box-shadow: $box-shadow-medium

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
    color: $black

  &__description
    margin-top: 4px
    color: $gray-80

  &__close-button
    position: absolute !important
    top: 8px
    right: 8px

  &__close
    width: 14px
    height: 14px
    color: $black

  &__progress-bar
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 2px
    background: $white
    border-radius: 10px

  &__progress-bar-inner
    width: 0
    height: 2px
    background: $primary
    border-radius: 10px
    animation: base-toaster__progress 10000ms ease

  &.is--success
    border-color: $secondary
    #{$root}__icon
      color: $secondary
    #{$root}__progress-bar-inner
      background: $secondary
  &.is--error
    border-color: $red
    #{$root}__icon
      color: $red
    #{$root}__progress-bar-inner
      background: $red
    #{$root}__close
      color: $red
  &.is--info
    border-color: $primary
    #{$root}__icon
      color: $primary
    #{$root}__progress-bar-inner
      background: $primary
    #{$root}__close
      color: $primary

@keyframes base-toaster__progress
  from
    width: 100%
  to
    width: 0

.vue-notification-wrapper
  overflow: visible
  @media screen and (max-width: 768px)
    margin-top: 10px !important

  &:last-child
    .base-toaster
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
