<script setup lang="ts">
import { VAlert, VAlertTitle, VAlertDescription } from 'UiKit/components/Base/VAlert';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import errorIcon from 'UiKit/assets/images/circle-exclamation.svg';
import infoIcon from 'UiKit/assets/images/circle-info.svg';
import checkIcon from 'UiKit/assets/images/circle-check.svg';
import closeIcon from 'UiKit/assets/images/close.svg?component';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    variant?: 'error' | 'success' | 'info';
    buttonText?: string;
    showClose?: boolean;
}>(), {
  variant: 'info',
  showClose: false,
});

const emit = defineEmits<{
  click: [];
  close: [];
}>();

const onClick = () => {
  emit('click');
};

const onClose = () => {
  emit('close');
};

const buttonColor = computed(() => {
  if (props.variant === 'success') {
    return 'secondary';
  }
  if (props.variant === 'info') {
    return 'primary';
  }
  return 'red';
});

const componentIcon = computed(() => {
  if (props.variant === 'success') {
    return checkIcon;
  }
  if (props.variant === 'info') {
    return infoIcon;
  }
  return errorIcon;
});
</script>

<template>
  <VAlert
    :variant="variant"
    class="VAlertDefault v-alert-default"
    :class="[{ 'has-close': showClose }, `is--${variant}`]"
  >
    <div class="VAlertDefault v-alert-default__content">
      <template v-if="$slots.title">
        <div class="v-alert-default__title-group">
          <component
            :is="componentIcon"
            class="v-alert-default__icon"
          />
          <VAlertTitle>
            <slot name="title" />
          </VAlertTitle>
        </div>
        <VAlertDescription v-if="$slots.description">
          <slot name="description" />
        </VAlertDescription>
      </template>
      <template v-else-if="$slots.description">
        <div class="v-alert-default__description-group">
          <component
            :is="componentIcon"
            class="v-alert-default__icon"
          />
          <VAlertDescription>
            <slot name="description" />
          </VAlertDescription>
        </div>
      </template>
      <component
        :is="componentIcon"
        v-else
        class="v-alert-default__icon"
      />
    </div>

    <div
      v-if="$slots.default || buttonText"
      class="v-alert-default__controls"
    >
      <div
        v-if="$slots.default"
        class="v-alert-default__actions"
      >
        <slot />
      </div>

      <VButton
        v-if="buttonText"
        size="small"
        :color="buttonColor"
        class="v-alert-default__button is--margin-top-0"
        @click="onClick"
      >
        {{ buttonText }}
      </VButton>
    </div>

    <VButton
      v-if="showClose"
      icon-only
      variant="link"
      size="small"
      aria-label="Close alert"
      class="v-alert-default__close is--margin-top-0"
      @click="onClose"
    >
      <closeIcon class="v-alert-default__close-icon" />
    </VButton>
  </VAlert>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-alert-default {
    $root: &;

    position: relative;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
      align-items: flex-start;

      .v-alert-default__button {
        width: 100%;
      }
    }

    &.has-close {
      padding-right: 56px;
    }

    &__icon {
        width: 20px;
        height: 20px;
        margin-top: 1px;
        flex-shrink: 0;
    }

    &__content {
        display: flex;
        gap:8px;
        flex: 1 1 auto;

      @media screen and (width < $tablet) {
        flex-direction: column;
      }
    }

    &__controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-left: auto;
      flex-shrink: 0;
    }

    &__title-group,
    &__description-group {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    // On desktop, ungroup the icon from title/description and reorder
    @media screen and (min-width: $tablet) {
      &__title-group,
      &__description-group {
        display: contents;
      }

      &__title-group .v-alert-default__icon,
      &__description-group .v-alert-default__icon {
        order: -1;
      }
    }

    @media screen and (max-width: $tablet) {
      &__controls {
        width: 100%;
        margin-left: 0;
      }

      &__actions {
        width: 100%;
      }

      &__button {
        width: 100%;
      }
    }

    &__close {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    &__close-icon {
      width: 14px;
      height: 14px;
      color: colors.$gray-80;
    }

    &.is--error {
        #{$root}__icon {
            color: colors.$red;
        }
    }

    &.is--success {
        #{$root}__icon {
            color: $secondary-dark;
        }
    }

    &.is--info {
        #{$root}__icon {
            color: colors.$primary;
        }
    }

  .v-alert-title {
    margin-top: 0 !important;
  }

  .v-alert-description {
    margin-top: 0 !important;
  }
}
</style>
