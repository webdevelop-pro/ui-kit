<script setup lang="ts">
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  tagText: String,
  getInTouchUrl: String,
  useCaseUrl: String,
});
</script>

<template>
  <div class="VInfoTop v-info-top with-default-distance">
    <slot>
      <VBadge
        v-if="tagText"
        color="secondary-light"
      >
        {{ tagText }}
      </VBadge>
      <h1
        v-if="title"
      >
        {{ title }}
      </h1>
      <div
        v-if="subtitle"
        class="is--subheading-1"
      >
        {{ subtitle }}
      </div>
      <p
        v-if="text"
        v-html="text"
      />
      <div class="v-info-top__button-wrap">
        <slot name="buttons">
          <VButton
            v-if="getInTouchUrl"
            as="a"
            :href="encodeURI(getInTouchUrl)"
            size="large"
          >
            Get In Touch
          </VButton>
          <VButton
            v-if="useCaseUrl"
            as="a"
            :href="encodeURI(useCaseUrl)"
            size="large"
            variant="link"
            class="is--margin-top-0"
          >
            Learn More in Use Cases
            <component :is="arrowIcon" />
          </VButton>
        </slot>
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.v-info-top {
  &__button-wrap {
    margin-top: 0 !important;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include media-gte(tablet) {
      gap: 12px;
      align-items: end;
      flex-direction: row;
    }
  }

  a:not([class]) {
    margin-top: 0 !important;
  }
}
</style>
