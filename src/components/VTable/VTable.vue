<script lang="ts" setup="">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  fixedHeader?: boolean;
  height?: string;
  size?: 'large' | 'small';
}>(), {
  height: '100%',
  size: 'large',
});

const btnClasses = computed(() => {
  const classes = `is--size-${props.size} `;
  return classes;
});

</script>

<template>
  <div
    class="VTable v-table"
    :class="[btnClasses, { 'is--fixed-header': fixedHeader }]"
    :style="{ height: height }"
  >
    <table class="v-table__table">
      <slot />
    </table>
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
.v-table
  width: 100%
.v-table
  &.is--fixed-header
    overflow-x: auto
    thead
      tr > th
        position: sticky
        top: 0
        z-index: 2

  &__table
    border-collapse: collapse
    border-spacing: 0
    width: 100%
    border: 0
    border-color: transparent !important

  thead
    th
      background: $table-thead-background-color
      color: $table-tbody-th-color

  th
    font-size: $table-th-font-size
    line-height: $table-th-line-height
    padding: $table-th-padding
    @include font(800)
    text-align: left
    @media screen and (max-width: 768)
      padding: $table-th-padding-mobile

  tbody
    border-style: none !important
    tr
      width: 100%
      border-bottom: solid 1px $table-tbody-tr-border-bottom-color
      &:first-child
        border-top: solid 1px $table-tbody-tr-border-bottom-color
      td
        background: $table-tbody-tr-td-background-color
        @include mt(.3s)
        font-size: $table-td-font-size
        line-height: $table-td-line-height
        padding: $table-td-padding
        @include font(400)
        text-align: left
        @media screen and (max-width: 768)
          padding: $table-td-padding-mobile
      &:hover
        td
          background: $table-tbody-td-hover-background-color
          @include mt(.3s)
    td
      color: $table-tbody-td-color

  &.is--size-small
    tbody
      td
        padding: $table-td-padding-small
    th
      padding: $table-th-padding-small
</style>
