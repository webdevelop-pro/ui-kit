<script setup lang="ts">
import { IFrontmatter } from 'UiKit/types/types';
import { computed, PropType } from 'vue';

interface IHeaderNavigation {
  href?: string;
  frontmatter?: IFrontmatter;
  text?: string;
  menuIcon?: string;
}

const props = defineProps({
  data: Object as PropType<IHeaderNavigation>,
  path: String,
});

const emit = defineEmits(['click']);

const isActive = computed(() => props.path?.includes(props.data.href));

const iconMap = import.meta.glob('@/assets/images/menu/**/*.svg', { eager: true, import: 'default' });

const getSvgComponent = (data) => {
  const iconPath = data?.frontmatter?.menuIcon;
  if (iconPath && iconMap[`../src/assets${iconPath}`]) {
    return iconMap[`../src/assets${iconPath}`];
  }
  return null;
};
</script>

<template>
  <li class="VHeaderNavigationListItem v-header-navigation-list-item">
    <a
      v-if="data?.href && data.text"
      :href="data.href"
      class="v-header-navigation-list-item__item is--h6__title is--link"
      :class="{ 'is--active': isActive }"
      @click="emit('click')"
    >
      <div
        v-if="data?.frontmatter?.menuIcon"
        class="v-header-navigation-list-item__icon-wrap"
      >
        <component
          :is="getSvgComponent(data)"
          v-if="getSvgComponent(data)"
          class="v-header-navigation-list-item__icon"
        />
      </div>
      {{ data.text }}
    </a>
    <span
      v-else-if="data?.text"
      class="v-header-navigation-list-item__item is--small-2 is--color-gray-60 is--uppercase"
    >
      {{ data?.text }}
    </span>
  </li>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_colors.scss' as colors;
.v-header-navigation-list-item {
  margin-top: 0;

  &__item {
    white-space: nowrap;
    text-decoration: none;
    height: 100%;
    display: flex;
    padding: 8px 12px;
    align-items: center;
    gap: 8px;

    @media screen and (max-width: variables.$desktop-md) {
      padding: 7px 12px;
    }

    &.is--link {
      cursor: pointer;
    }

    &.is--link:hover {
      color: colors.$primary;
    }

    &.is--active {
      color: colors.$primary;
    }
  }

  &__icon-wrap {
    color: inherit;
    display: flex;
    flex-shrink: 0;
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 2px;
    border: 1px solid colors.$gray-20;
  }

  &__icon {
    color: inherit;
    width: 16px;
    height: auto;
    flex-shrink: 0;
  }
}
</style>
