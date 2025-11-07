<script lang="ts" setup>
import { computed } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

const props = withDefaults(defineProps<{
  showButton?: boolean;
  buttonText?: string;
  align?: 'start' | 'center' | 'end';
  imageClass?: string;
  buttonClass?: string;
  withDefaultDistance?: boolean;
  imageProps?: Record<string, unknown>;
  buttonProps?: Record<string, unknown>;
  buttonIcon?: string | Component;
}>(), {
  showButton: true,
  buttonText: 'Action',
  align: 'center',
  withDefaultDistance: false,
  imageProps: () => ({}),
  buttonProps: () => ({}),
});


const alignClass = computed(() => {
  if (props.align === 'start') return 'is--align-start';
  if (props.align === 'end') return 'is--align-end';
  return 'is--align-center';
});

const emit = defineEmits<{
  buttonClick: [event: MouseEvent]
}>();

const handleButtonClick = (event: MouseEvent) => {
  emit('buttonClick', event);
};
</script>

<template>
  <div
    class="VImageWithButton v-image-with-button"
    :class="[alignClass, { 'with-default-distance': withDefaultDistance }]"
  >
    <slot name="image">
      <VImage
        class="v-image-with-button__image"
        :class="imageClass"
        v-bind="imageProps"
      />
    </slot>

    <slot
      v-if="showButton"
      name="button"
    >
      <VButton
        class="v-image-with-button__button"
        :class="buttonClass"
        v-bind="buttonProps"
        @click="handleButtonClick"
      >
        <slot>{{ buttonText || 'Action' }}</slot>

        <VSvgIcon
          v-if="buttonIcon"
          :icon="buttonIcon"
          class="v-text-block__button-icon"
        />
      </VButton>
    </slot>
  </div>
</template>

<style lang="scss">
.v-image-with-button {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  

  @media screen and (width < $desktop) {
    gap: 20px;
  }

  &.is--align-start {
    align-items: flex-start;
    justify-content: flex-start;
  }
  &.is--align-center {
    align-items: center;
    justify-content: center;
  }
  &.is--align-end {
    align-items: flex-end;
    justify-content: flex-end;
  }

  &__image {
    border-radius: 0;
    aspect-ratio: 233/191;
    object-fit: cover;
  }
}
</style>

