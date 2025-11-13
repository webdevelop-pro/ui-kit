<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import { VCard, VCardContent } from 'UiKit/components/Base/VCard';

export interface IVCardFeaturesHover {
  buttonText?: string;
  href?: string;
  to?: [object, string];
}
defineProps<IVCardFeaturesHover>();
</script>

<template>
  <VCard
    :href="href"
    :to="to"
    class="VCardFeatures v-card-features"
  >
    <div class="v-card-features__card">
      <VCardContent class="v-card-features__content">
        <slot />

        <VButton
          v-if="buttonText"
          size="small"
          variant="link"
          class="v-card-features__button"
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
  box-shadow: $box-shadow-medium;

  &__card{
    display: flex;
    padding: 20px;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 2px;
    background: $primary-light;
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
    inset: 0;
  }

  &__content{
    height: 100%;
  }
}
</style>
