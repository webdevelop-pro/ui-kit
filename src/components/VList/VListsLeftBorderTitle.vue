<script setup lang="ts">
import { PropType } from 'vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

interface IListsLeftBorderTitle {
  text: string;
  title: string;
  icon: string;
}

defineProps({
  items: {
    type: Object as PropType<IListsLeftBorderTitle[]>,
    required: true,
  },
});
</script>

<template>
  <div class="VListsLeftBorderTitle v-list-left-border-title">
    <ul>
      <li
        v-for="(caption, index) in items"
        :key="index"
      >
        <VSvgIcon
          :icon="caption.icon"
          icon-size="35px"
          class="v-list-left-border-title__icon"
        />
        <div class="v-list-left-border-title__content">
          <h3 class="is--color-primary v-list-left-border-title__title">
            {{ caption.title }}
          </h3>
          <p class="is--color-gray-80">
            {{ caption.text }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-left-border-title {
  width: 100%;

  &__icon {
    color: $primary;
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: 0.9;
  }

  &__title {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left:-20px;
      height: 35px;
      width: 2px;
      background-color: $primary;
    }
  }

  ul {
    width: 100%;
    padding-left: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 40px;
    list-style: none;
    margin: 0;
    max-width: auto;
  }

  li {
    flex: 1 1 345px;
    // max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin: 0 !important;
    padding: 20px;
    // border-left: 2px solid $primary;
  }

  span {
    margin: 0 !important;
  }
}
</style>
