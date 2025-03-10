<script setup lang="ts">
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import { computed, PropType } from 'vue';

interface IHeaderNavigation {
  title?: string;
  text?: string;
  href?: string;
  background?: string;
}

const props = defineProps({
  data: Object as PropType<IHeaderNavigation>,
});

const backgroundImageLocal = computed(() => (props.data?.background ? `url(${props.data?.background})` : undefined));
</script>

<template>
  <div
    class="VHeaderNavigationCardDark v-header-navigation-card-dark"
    :style="{ 'background-image': backgroundImageLocal }"
  >
    <span
      v-if="data?.title"
      class="v-header-navigation-card-dark__subtitle is--small-2"
    >
      {{ data?.title }}
    </span>
    <p
      v-if="data?.text"
      class="v-header-navigation-card-dark__text is--small"
    >
      {{ data?.text }}
    </p>

    <VButton
      v-if="data?.href"
      as="a"
      :href="data?.href"
      size="small"
      :aria-label="data?.title"
    >
      Learn More
      <component
        :is="arrowIcon"
      />
      <span class="is--link-text-hidden">
        {{ data?.title }}
      </span>
    </VButton>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_colors.scss' as colors;
.v-header-navigation-card-dark {
  display: flex;
  width: 210px;
  padding: 28px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  align-self: stretch;
  background-color: colors.$black;
  background-size: auto 75%;
  background-position: bottom 9px right 0;
  background-repeat: no-repeat;
  @media screen and (max-width: variables.$desktop-md) {
    display: none;
  }

  &__subtitle {
    color: colors.$primary;
    text-transform: uppercase;
  }

  &__text {
    flex: 1 0 0;
    align-self: stretch;
    color: colors.$white;
    opacity: 0.9;
  }
}
</style>
