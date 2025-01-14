<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  href: String,
  to: [Object, String],
  linkIs: {
    type: String,
    default: 'a',
  },
});

const classLocal = computed(() => (props.variant ? `is--variant-${props.variant}` : null));
</script>

<template>
  <article
    class="VCard v-card"
    :class="[classLocal, { 'is--link': href || to }]"
  >
    <slot />
    <component
      :is="linkIs"
      v-if="href || to"
      :href="encodeURI(href)"
      :to="to"
      class="v-card__link"
      :aria-label="`card link`"
    />
  </article>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as variables;
.v-card {
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;

  &.is--link {
    cursor: pointer;
  }

  &__link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  &.is--variant-primary,
  &.is--variant-secondary {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: variables.$box-shadow-medium;
    background-color: white;
    &:hover {
      box-shadow: variables.$box-shadow-large;
    }
  }

  &.is--variant-primary {

  }

  &.is--variant-secondary {
    border-radius: 2px;
    gap: 10px;
    flex-shrink: 0;
  }

  &.is--variant-ghost {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    &:hover {
      background-color: white;
    }
  }
}
</style>
