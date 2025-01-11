<script setup lang="ts">
import VTooltip from 'UiKit/components/VTooltip.vue';
import { PropType } from 'vue';
import CheckIcon from 'UiKit/assets/images/check.svg';
import { VCard } from 'UiKit/components/Base/VCard';


export interface ICheckmarkedItem {
  title: string;
  description: string;
}

defineProps({
  title: String,
  description: String,
  darkMode: Boolean,
  icon: String as PropType<'hollow' | 'darkbg'>,
  card: Boolean,
  tooltip: String,
});
</script>

<template>
  <VCard
    class="VCardCheckmarked v-card-checkmarked "
    :class="{ 'is--card': card, 'is--dark-mode': darkMode }"
  >
    <VTooltip
      :disabled="!tooltip"
    >
      <div class="v-card-checkmarked__top">
        <div
          class="v-card-checkmarked__icon-wrap"
          :class="{ 'is--icon-hollow': icon === 'hollow', 'is--icon-dark-bg': icon === 'darkbg' }"
        >
          <component
            :is="CheckIcon"
            class="v-card-checkmarked__icon"
          />
        </div>
        <span class="is--h4__title">
          {{ title }}
        </span>
      </div>
      <template #content>
        <div v-html="tooltip" />
      </template>
    </VTooltip>
    <div
      v-if="description"
      class="v-card-checkmarked__bottom"
    >
      {{ description }}
    </div>
  </VCard>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-card-checkmarked {
  $root: &;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  box-shadow: none;
  &.is--card{
    border-radius: 2px;
    border: 1px solid colors.$gray-20;
    background: colors.$gray-10;
    padding: 20px;
  }

  &:not(.is--card) + &:not(.is--card){
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid colors.$gray-40;
    &.is--dark-mode{
      border-top: 1px solid colors.$gray-60;
    }
  }

  &__top{
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    text-align: initial;

    @media screen and (max-width: 767px){
      align-items: flex-start;
    }
  }

  &__icon{
    width: 16px;
    height: auto;
    color: colors.$secondary-dark;
  }


  &__icon-wrap{
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 50px;
    box-shadow: variables.$box-shadow-small;
    background-color: colors.$secondary-light;


    @media screen and (max-width: 767px){
      margin-top: 3px;
    }

    &.is--icon-hollow{
      background-color: transparent;
      border: 1px solid colors.$secondary;
      padding: 3px;
    }
    &.is--icon-dark-bg{
      background-color: colors.$secondary-dark;
      #{$root}__icon{
        color: colors.$black;
      }
    }
  }

  &__bottom{
    opacity: 0.9;
    color: colors.$gray-80;
    #{$root}.is--dark-mode &{
      color: colors.$gray-10;
    }
  }
}
</style>
