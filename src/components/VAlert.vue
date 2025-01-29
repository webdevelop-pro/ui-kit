<script setup lang="ts">
import { VAlert, VAlertTitle, VAlertDescription } from 'UiKit/components/Base/VAlert';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import errorIcon from 'UiKit/assets/images/circle-exclamation.svg';
import infoIcon from 'UiKit/assets/images/circle-info.svg';
import checkIcon from 'UiKit/assets/images/circle-check.svg';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    variant?: 'error' | 'success' | 'info';
    buttonText?: string;
}>(), {
  variant: 'info',
});

const emit = defineEmits(['click']);


const onClick = () => {
  emit('click');
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
    :class="[`is--${variant}`]"
  >
    <div class="VAlertDefault v-alert-default__content">
      <component
        :is="componentIcon"
        class="v-alert-default__icon"
      />
      <VAlertTitle>
        <slot name="title" />
      </VAlertTitle>
      <VAlertDescription>
        <slot name="description" />
      </VAlertDescription>
    </div>

    <VButton
      v-if="buttonText"
      size="small"
      :color="buttonColor"
      class="v-alert-default__button"
      @click="onClick"
    >
      {{ buttonText }}
    </VButton>
  </VAlert>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-alert-default {
    $root: &;

    &__icon {
        width: 20px;
        height: 20px;
        margin-top: -1px;
        flex-shrink: 0;
    }

    &__content {
        display: flex;
        gap:8px;
        align-items: center;
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
}
</style>
