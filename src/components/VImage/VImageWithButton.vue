<script lang="ts" setup>
import { computed } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

const props = withDefaults(defineProps<{
  align?: 'start' | 'center' | 'end';
  imageClass?: string;
  withDefaultDistance?: boolean;
  imageProps?: Record<string, unknown>;
  buttons?: unknown[];
}>(), {
  align: 'center',
  withDefaultDistance: false,
  imageProps: () => ({}),
  buttons: () => [],
});

const keysToRemove = ['cover', 'head', 'url', 'slug', 'summary', 'draft', 'text', 'icon'];

const filteredButtons = computed(() => (
  props.buttons?.map((btn) => 
    Object.fromEntries(
      Object.entries(btn).filter(([key]) => !keysToRemove.includes(key))
    )
  ) ?? []
));

const alignClass = computed(() => {
  if (props.align === 'start') return 'is--align-start';
  if (props.align === 'end') return 'is--align-end';
  return 'is--align-center';
});

const emit = defineEmits<{
  buttonClick: [event: MouseEvent]
}>();

const handleButtonClick = (index: number, button: unknown) => {
  emit('buttonClick', index, button);
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
    <slot name="buttons">
      <template
        v-for="(btn, idx) in filteredButtons"
        :key="idx"
      >
        <VButton
          class="v-text-block__button is--margin-top-0"
          v-bind="btn"
          @click="handleButtonClick(idx, btn)"
        >
          {{ buttons[idx].text }}
          <VSvgIcon
            :icon=" buttons[idx].icon"
            icon-size="20px"
            class="v-text-block__button-icon"
          />
        </VButton>
      </template>
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

