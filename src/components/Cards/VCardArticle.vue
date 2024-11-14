<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IFrontmatter } from 'UiKit/types/types';
import { capitalizeFirstLetter } from 'UiKit/helpers/text';
import VImage from 'UiKit/components/VImage/VImage.vue';

const props = defineProps({
  data: {
    type: Object as PropType<IFrontmatter>,
    required: true,
  },
  small: Boolean,
});

const day = computed(() => String(new Date(props.data.publishDate).getDate() + 1).padStart(2, '0'));
const month = computed(() => String(new Date(props.data.publishDate).toLocaleString('en-us', { month: 'short' }).toUpperCase()));
const year = computed(() => String(new Date(props.data.publishDate).getFullYear()));

</script>

<template>
  <article
    v-bind="$attrs"
    class="VCardArticle v-card-article"
    :class="{ 'is--small': small }"
    :aria-label="data.title"
  >
    <div
      v-if="day || month || year"
      class="v-card-article__publish-date is--small-2"
    >
      {{ day }} {{ month }}, {{ year }}
    </div>
    <div class="v-card-article__details">
      <h3
        v-if="data.title"
        class="v-card-article__name is--h4__title"
      >
        {{ capitalizeFirstLetter(data.title) }}
      </h3>
      <p
        v-if="data.description"
        class="v-card-article__excerpt is--body"
        v-html="data.description"
      />
    </div>
    <div
      v-if="data.cover?.image"
      class="v-card-article__image is--no-margin"
    >
      <VImage
        loading="lazy"
        :src="data.cover?.image"
        :alt="`article ${data.title} image`"
      />
    </div>
    <a
      :href="data.url"
      :aria-label="data.title"
      v-bind="$attrs"
      class="v-card-article__link"
    />
  </article>
</template>


<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors

.v-card-article
  $root: &

  padding: 20px 0
  display: flex
  align-items: center
  justify-content: space-between
  text-decoration: none
  border-top: 1px solid colors.$gray-40
  flex-direction: row
  cursor: pointer
  text-decoration: none !important
  margin: 0
  position: relative
  transition: all 0.2s ease
  @media screen and (min-width: 767px)
    &:hover
      background-color: colors.$white

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
    border-bottom: 1px solid colors.$gray-40

  &__publish-date
    text-align: center
    padding-right: 40px
    display: flex
    flex-direction: column
    flex-shrink: 0
    justify-content: center
    align-items: center
    color: colors.$gray-70

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
    padding-right: 40px
    #{$root}.is--small &
      order: 2

    @media screen and (max-width: 767px)
      order: 2
      padding-right: 0

    #{$root}__name
      color: colors.$black
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
    background: colors.$primary
    border-radius: 4px
    font-weight: 400
    font-size: 14px
    line-height: 22px
    text-transform: capitalize
    letter-spacing: 0.3px
    color: colors.$black

  &__image
    margin-left: auto
    margin-right: 20px
    width: 168px
    height: 125px
    flex-shrink: 0

    @media screen and (max-width: 767px)
      order: 1
      width: 100%
      margin-bottom: 20px
      height: 122px
      min-width: 100%

    #{$root}.is--small &
      order: 1
      width: 100%
      margin-bottom: 23px
      height: 122px
      min-width: 100%

  &__excerpt
    color: colors.$gray-80
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

  &__link
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 2
    margin: 0

</style>
