<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { computed} from 'vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';
import { VTextBlockConfig, VTextButtonConfig } from './types';

const props = withDefaults(defineProps<VTextBlockConfig>(), {
  titleTag: 'h2',
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

const emit = defineEmits<{
  buttonClick: [buttonIndex: number, button: VTextButtonConfig]
}>();

const handleButtonClick = (index: number, button: VTextButtonConfig) => {
  emit('buttonClick', index, button);
};
</script>

<template>
  <div class="VTextBlock v-text-block with-default-distance">
    <slot>
      <slot name="title">
        <component
          :is="titleTag"
          v-if="title"
        >
          {{ title }}
        </component>
      </slot>
      <slot name="subtitle">
        <div
          v-if="subtitle"
          class="is--subheading-1"
        >
          {{ subtitle }}
        </div>
      </slot>
      <slot name="subtitle2">
        <div
          v-if="subtitle2"
          class="is--subheading-2"
        >
          {{ subtitle2 }}
        </div>
      </slot>
      <slot name="text">
        <p
          v-if="text"
          v-dompurify-html="text"
        />
      </slot>
      <div
        v-if="buttons && buttons.length"
        class="v-text-block__button-wrap is--margin-top-40"
      >
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
    </slot>
  </div>
</template>

<style lang="scss">
.v-text-block {
  position: relative;

  &__button-wrap {
    gap: 12px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;

    @media screen and (width < $desktop) {
      flex-wrap: wrap;
    }
  }

  a:not([class]) {
    margin-top: 0 !important;
  }
}
</style>
