<script setup lang="ts">
import CheckIcon from 'UiKit/assets/images/check.svg';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

defineProps({
  items: Array as () => string[],
});
</script>

<template>
  <ul class="VListCheckmarks v-list-checkmarks">
    <li
      v-for="(text, index) in items"
      :key="index"
      class="v-list-checkmarks__item"
    >
      <span class="v-list-checkmarks__icon-wrap">
        <VSvgIcon
          :icon="CheckIcon"
          class="v-list-checkmarks__icon"
        />
      </span>
      <span
        class="is--color-gray-80"
      >
        {{ text }}
      </span>
    </li>
  </ul>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-list-checkmarks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  list-style: none;
  margin: 0;

  li {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin: 0;
  }

  &__icon-wrap {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 50px;
    box-shadow: variables.$box-shadow-small;
    background-color: colors.$secondary-light;
  }

  &__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: colors.$secondary-dark;
  }

  &__item {
    opacity: 0.9;
    margin: 0 !important;
  }
}
</style>
