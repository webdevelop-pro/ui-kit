<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import { VCard, VCardContent } from 'UiKit/components/Base/VCard';

export interface IVCardFeatures {
  buttonText?: string;
  href?: string;
  to?: [object, string];
}
defineProps<IVCardFeatures>();
</script>

<template>
  <VCard
    :href="href"
    :to="to"
    class="VCardFeatures v-card-features is--hover-elevate-up is--hover-visible-elevate-up-wrapper"
  >
    <div class="v-card-features__card">
      <VCardContent class="v-card-features__content is--hover-visible-elevate-up-content">
        <slot />

        <VButton
          v-if="buttonText"
          size="small"
          variant="link"
          class="v-card-features__button is--hover-visible-elevate-up-component "
        >
          {{ buttonText }}
          <component
            :is="ArrowRight"
          />
        </VButton>
      </VCardContent>
    </div>
  </VCard>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_hover.scss' as *;
.v-card-features {
  $root: &;

  padding: 8px;
  border-radius: 2px;
  background: $white;
  border: 1px solid $primary-light;
  transition: all 0.3s ease;
  color: inherit;
  margin: 0;

  &:hover {
    box-shadow: $box-shadow-medium;
    border-color: transparent;
    transition: all 0.3s ease;
  }

  &__card{
    display: flex;
    min-height: 190px;
    padding: 20px;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 2px;
    background: $primary-light;
    #{$root}:hover & {
      padding-bottom: 36px;
    }
  }

  &__content{
    text-align: center;
  }

  &__button{
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    display: block;
    margin: 0 auto;
  }

  &__link{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
