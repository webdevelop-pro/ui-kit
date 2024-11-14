<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import { stripHtml } from 'UiKit/helpers/general';

defineProps({
  subtitle: String,
  title: String,
  text: String,
  url: String,
  slug: String,
  link: String,
  ellipsis: Boolean,
  descriptionWithHtml: Boolean,
});
</script>

<template>
  <div
    class="VCardLikeTile card-like-tile is--card"
    :class="{ 'is--hoverable': url || link }"
  >
    <a
      v-if="url || link"
      :href="url || link"
      class="card-like-tile__cover-link"
    >
      {{ title }}
    </a>
    <div class="card-like-tile__wrap">
      <div
        v-if="subtitle"
        class="card-like-tile__subtitle is--h5__title"
      >
        {{ subtitle }}
      </div>
      <div
        class="card-like-tile__title is--h3__title"
      >
        {{ title }}
      </div>
      <div
        class="card-like-tile__text"
        :class="{ 'is--ellipsis': ellipsis }"
        v-html="descriptionWithHtml ? text : stripHtml(text)"
      />
    </div>
    <VButton
      v-if="url"
      tag="a"
      :href="url"
      color="secondary"
      icon-placement="right"
      class="card-like-tile__button"
    >
      <slot />
    </VButton>
    <VButton
      v-if="link"
      tag="a"
      :href="link"
      block
      class="card-like-tile__button"
    >
      <slot />
    </VButton>
  </div>
</template>

<style lang="scss">
.card-like-tile {
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
  gap: 0;
  position: relative;

  &.is--hoverable:hover {
    box-shadow: $box-shadow-large;
  }

  &__content {
    display: block;
  }

  &__subtitle + &__title {
    margin-top: 28px !important;
  }

  &__subtitle {
    color: $primary;
    text-transform: uppercase;
  }

  &__wrap {
    margin: 0 !important;
  }

  &__text {
    margin-top: 20px;
    &.is--ellipsis {
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__button {
    margin-top: 28px !important;
  }

  &__cover-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }
}
</style>
