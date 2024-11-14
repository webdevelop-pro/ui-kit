<script setup lang="ts">
defineProps({
  title: String,
  text: String,
});

</script>

<template>
  <section class="VTwoColBlock v-two-col-block">
    <div class="is--container is--two-col-grid is--gap-80 v-two-col-block__container">
      <div class="v-two-col-block__left">
        <slot name="left" />
      </div>
      <div class="v-two-col-block__right">
        <h2 v-if="title">
          {{ title }}
        </h2>
        <p
          v-if="text"
          class="is--subheading-2"
          v-html="text"
        />
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.v-two-col-block {
    &__container {
        align-items: center;
    }

    @media screen and (max-width: 767px) {
      &__left {
        order: 2;
      }
      &__right {
        order: 1;
      }
    }
}
</style>
