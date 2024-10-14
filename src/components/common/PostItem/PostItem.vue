<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IMarkdownOptions } from './types';

const props = defineProps({
  data: {
    type: Object as PropType<IMarkdownOptions>,
    required: true,
  },
  defaultRoute: String,
  small: Boolean,
});

const day = computed(() => String(new Date(props.data.publishDate).getDate() + 1).padStart(2, '0'));
const month = computed(() => String(new Date(props.data.publishDate).toLocaleString('en-us', { month: 'short' }).toUpperCase()));
const year = computed(() => String(new Date(props.data.publishDate).getFullYear()));

const componentName = computed(() => {
  if (props.data.url || props.data.route) return 'a';
  if (props.data.slug || props.data.route) return 'router-link';
  return 'div';
});
const route = computed(() => (props.data.route ? props.data.route : props.defaultRoute));

</script>

<template>
  <component
    :is="componentName"
    :href="data.url"
    :to="{ name: route, params: { slug: data.slug } }"
    v-bind="$attrs"
    class="post-item"
    :class="{ 'is--small': small }"
    :aria-label="data.title"
  >
    <div
      class="post-item__publish-date is--small-2"
    >
      {{ day }} {{ month }}, {{ year }}
    </div>
    <div class="post-item__details">
      <div class="post-item__details-title">
        <h3
          class="post-item__name is--h4__title"
        >
          {{ data.title }}
        </h3>
        <div
          v-if="$slots.label"
          class="post-item__details-label"
        >
          <slot name="label" />
        </div>
      </div>
      <p
        class="post-item__excerpt is--body"
        v-html="data.description"
      />
    </div>
    <div
      v-if="$slots.img"
      class="post-item__image is--no-margin"
    >
      <slot name="img" />
    </div>
  </component>
</template>


<style lang="sass" scoped>
@import 'index.sass'
.post-item
  $root: &

  padding: 20px 0
  display: flex
  align-items: center
  justify-content: space-between
  text-decoration: none
  border-top: 1px solid $gray-40
  flex-direction: row
  cursor: pointer
  text-decoration: none !important
  margin: 0
  @media screen and (min-width: 767px)
    &:hover
      background-color: $white

  &.is--small
    flex-direction: column
    flex-wrap: wrap
    align-items: flex-start
    border: none
    justify-content: flex-start

  @media screen and (max-width: 767px)
    flex-direction: column
    flex-wrap: wrap
    align-items: flex-start

  &:not(.is--small):last-child
    border-bottom: 1px solid $gray-40

  .mobile
    opacity: 0.6
    color: $black
    text-align: left
    margin-bottom: 15px
    order: 0
    @media screen and (min-width: 768px)
      display: none

  &__publish-date
    text-align: center
    padding-right: 40px
    display: flex
    flex-direction: column
    flex-shrink: 0
    justify-content: center
    align-items: center
    color: $gray-70

    @media screen and (min-width: 767px)
      #{$root}:not(.is--small) &
        flex-basis: 140px

    #{$root}.is--small &
      margin-bottom: 12px

    @media screen and (max-width: 767px)
      margin-bottom: 12px

  &__details
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    #{$root}.is--small &
      order: 2
    
    @media screen and (max-width: 767px)
      order: 2

    #{$root}__name
      color: $black
      margin-bottom: 8px

  &__details-title
    display: flex
    align-items: center
    justify-content: space-between

  &__details-label
    padding: 6px 8px
    margin-bottom: 15px
    display: flex
    align-items: center
    justify-content: center
    background: $primary
    border-radius: 4px
    font-weight: 400
    font-size: 14px
    line-height: 22px
    text-transform: capitalize
    letter-spacing: 0.3px
    color: $black

  &__image
    margin-left: auto
    margin-right: 20px
    width: 188px
    height: 125px
    flex-shrink: 0
    
    @media screen and (max-width: 767px)
      order: 1
      width: 100%
      margin-bottom: 15px
      height: 122px
      min-width: 100%

    #{$root}.is--small &
      order: 1
      width: 100%
      margin-bottom: 23px
      height: 122px
      min-width: 100%

  &__excerpt
    color: $gray-80
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

</style>

<style lang="sass">
.post-item
  &__image
    img
      object-fit: cover
      width: 100%
      height: 100%
</style>
