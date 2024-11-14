<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import { PropType } from 'vue';

const emit = defineEmits(['choice']);

defineProps({
  choices: Array as PropType<string[]>,
});

const onChoiceClick = (message: string) => {
  emit('choice', message);
};
</script>

<template>
  <div class="ChatChoices chat-choices">
    <VButton
      v-for="(text, index) in choices"
      :key="index"
      size="small"
      variant="outlined"
      class="chat-choices__button is--no-margin"
      @click="onChoiceClick(text)"
    >
      {{ text }}
    </VButton>
  </div>
</template>

<style lang="scss">
.chat-choices {
  $root: &;

  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;

  @include media-lte(tablet) {
    flex-direction: column;
  }

  &__button {
    flex-shrink: 0;
  }
}
</style>
