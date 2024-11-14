<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

export interface IVCardFeatures {
  buttonText?: string;
  href?: string;
  to?: [object, string];
}
defineProps<IVCardFeatures>();
</script>

<template>
  <article class="VCardFeatures v-card-features is--hover-elevate-up is--hover-visible-elevate-up-wrapper">
    <div class="v-card-features__card">
      <div class="v-card-features__content is--hover-visible-elevate-up-content">
        <slot />

        <VButton
          v-if="buttonText"
          icon-placement="right"
          size="small"
          variant="link"
          class="v-card-features__button is--hover-visible-elevate-up-component is--no-margin"
        >
          {{ buttonText }}
          <VSvgIcon
            name="arrow-right"
          />
        </VButton>
      </div>
    </div>
    <a
      v-if="href"
      :href="href"
      class="v-card-features__link"
      :aria-label="`card ${buttonText} link`"
    />
    <router-link
      v-if="to"
      :to="to"
      class="v-card-features__link"
      :aria-label="`card ${buttonText} link`"
    />
  </article>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as *
@use 'UiKit/styles/_variables.sass' as *
.v-card-features
  $root: &

  padding: 8px
  border-radius: 2px
  background: $white
  border: 1px solid $primary-light
  transition: all 0.3s ease
  cursor: pointer
  color: inherit
  text-decoration: none
  margin: 0
  position: relative

  &:hover
    box-shadow: $box-shadow-medium
    border-color: transparent
    transition: all 0.3s ease

  &__card
    display: flex
    min-height: 190px
    padding: 20px
    width: 100%
    height: 100%
    flex-direction: column
    justify-content: center
    align-items: center
    flex: 1 0 0
    align-self: stretch
    border-radius: 2px
    background: $primary-light
    #{$root}:hover &
      padding-bottom: 36px

  &__content
    text-align: center

  &__button
    position: absolute
    bottom: -40px
    left: 0
    right: 0
    display: block
    margin: 0 auto

  &__link
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
</style>
