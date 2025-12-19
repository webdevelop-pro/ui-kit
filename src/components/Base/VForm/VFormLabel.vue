<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  hasAsterisk: Boolean,
  disabled: Boolean,
});

// We manipulate only the rendered text node inside the label so that
// the last word and the required asterisk are always kept together
// (they will wrap to the next line as a pair, never separately).
const contentEl = ref<HTMLElement | null>(null);

onMounted(() => {
  // If label is not required or ref is missing – do nothing.
  if (!props.hasAsterisk || !contentEl.value) return;

  const el = contentEl.value;
  if (!el) return;

  // Take only plain text content from the slot.
  const text = el.textContent?.trim() || '';
  if (!text) return;

  // Find the last space to split "before" and "last word".
  const lastSpaceIndex = text.lastIndexOf(' ');

  const before = lastSpaceIndex === -1 ? '' : text.slice(0, lastSpaceIndex);
  const lastWord = lastSpaceIndex === -1 ? text : text.slice(lastSpaceIndex + 1);

  // Clear original content and rebuild: text before + span for last word.
  el.textContent = '';

  if (before) {
    el.appendChild(document.createTextNode(before + ' '));
  }

  const lastWordSpan = document.createElement('span');
  lastWordSpan.className = 'v-form-label__last-word';
  lastWordSpan.textContent = lastWord;

  el.appendChild(lastWordSpan);
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label
    v-bind="$attrs"
    class="VFormlabel v-form-label"
    :class="{ 'is--disabled': disabled }"
  >
    <span
      ref="contentEl"
      class="v-form-label__content"
    >
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-form-label{
  color: colors.$gray-80;
  font-family: Avenir;
  font-weight: 400;
  font-size: 16px;
  display: inline-block;
  position: relative;

  &__content {
    display: inline;
    white-space: normal;
  }

  &__last-word {
    white-space: nowrap;

    &::after {
      content: ' *';
      color: colors.$red;
    }
  }

  &.is--disabled {
    color: colors.$gray-80;
    opacity: 0.3;
  }
}
</style>