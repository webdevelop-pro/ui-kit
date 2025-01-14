<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VInfoShort from 'UiKit/components/VInfo/VInfoShort.vue';
import { computed, useSlots, Comment } from 'vue';

const props = defineProps({
  title: String,
  subTitle: String,
  noData: Boolean,
  noContainer: Boolean,
  buttonHref: String,
  buttonText: String,
  linkHref: String,
  linkText: String,
});

const slots = useSlots();
// Check if the `infoShort` slot contains meaningful content
const hasSlotContent = computed(() => {
  const slotContent = slots.infoShort?.();
  if (!slotContent || slotContent.length === 0) return false;

  // Check if any VNode has non-empty, visible children
  return slotContent.some((node) => {
    if (node.type === Comment) return false; // Exclude comments
    if (typeof node.children === 'string') return node.children.trim().length > 0; // Non-empty text
    if (Array.isArray(node.children)) return node.children.length > 0; // Array of children nodes
    return true; // Any other node type with content
  });
});
const showInfoShort = computed(() => (
  props.title || props.subTitle || (props.linkText && props.linkHref) || hasSlotContent.value));
</script>

<template>
  <section class="VSection v-section">
    <div :class="{ 'is--container': !noContainer }">
      <VInfoShort
        v-if="showInfoShort"
        :title="title"
        :subtitle="subTitle"
        :link-href="linkHref"
        :link-text="linkText"
      >
        <slot name="infoShort" />
      </VInfoShort>

      <div
        v-if="!noData"
        class="v-section__content"
        :class="{ 'is--margin-top-40': showInfoShort }"
      >
        <slot />
      </div>

      <VButton
        v-if="buttonText && buttonHref && !noData"
        as="a"
        :href="encodeURI(buttonHref)"
        size="large"
        variant="link"
        class="v-section__button "
      >
        {{ buttonText }}
      </VButton>

      <p
        v-if="noData"
        class="is--no-data"
      >
        <slot name="noData">
          Sorry, there is no data yet
        </slot>
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.v-section {
  width: 100%;

  .is--container {
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 25px;
    align-self: center;
  }

  &__content {
    width: 100%;
  }
}
</style>
