<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';

defineProps({
  title: String,
  subTitle: String,
  noData: Boolean,
  noContainer: Boolean,
  buttonHref: String,
  buttonText: String,
});
</script>

<template>
  <section class="VSection v-section">
    <div :class="{ 'is--container': !noContainer }">
      <h2 v-if="title">
        {{ title }}
      </h2>
      <div
        v-if="subTitle"
        class="is--subheading-1"
      >
        {{ subTitle }}
      </div>
      <div
        v-if="!noData"
        class="v-section__content is--margin-top-40 is--no-margin"
      >
        <slot />
      </div>

      <VButton
        v-if="buttonText && buttonHref && !noData"
        tag="a"
        :href="buttonHref"
        size="large"
        variant="link"
        class="v-section__button is--no-margin"
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
