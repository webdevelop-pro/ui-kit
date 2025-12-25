<script setup lang="ts">
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import { computed, PropType } from 'vue';

interface IHeaderNavigation {
  title?: string;
  text?: string;
  href?: string;
  background?: string;
  buttonText?: string;
  items?: IHeaderNavigation[];
}

const props = defineProps({
  data: Object as PropType<IHeaderNavigation>,
});

const backgroundImageLocal = computed(() => (props.data?.background ? `url(${props.data?.background})` : undefined));
</script>

<template>
  <div
    class="VHeaderNavigationCardDark v-header-navigation-card-dark"
    :class="{ 'has-list': data?.items && data.items.length }"
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

    <ul
      v-if="data?.items"
      class="v-header-navigation-card-dark__list"
    >
      <li
        v-for="(item, index) in data?.items"
        :key="index"
      >
        <a
          :href="item.href"
          class="v-header-navigation-card-dark__list-link is--small"
        >
          <span class="v-header-navigation-card-dark__list-link-text">{{ item.title }}</span>

          <component
            :is="arrowIcon"
          />
        </a>
      </li>
    </ul>

    <VButton
      v-if="data?.href"
      as="a"
      :href="data?.href"
      size="small"
      :aria-label="data?.title"
    >
      {{ data.buttonText || 'Learn More' }}
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

  &.has-list {
    width: 362px;
  }

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

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  // Ensure list items do not exceed the card width
  &__list > li {
    width: 100%;
    max-width: 100%;
  }

  &__list-link {
    display: flex;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    max-width: 100%;
    width: 100%;
    min-width: 0;
    color: colors.$white;
    text-decoration: none;
    overflow: hidden;
    opacity: 0.9;
    transition: all 0.2s ease-in-out;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }

  &__list-link-text {
    flex: 1 1 auto;
    min-width: 0; // required for flex children to allow shrinking
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
