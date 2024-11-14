<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { IFrontmatter } from 'UiKit/types/types';

const { isTablet } = useBreakpoints();

const props = defineProps({
  data: {
    type: Object as PropType<IFrontmatter>,
    required: true,
  },
  secondary: Boolean,
});

const backgroundImage = computed(() => (
  `url(${props.data?.cover?.image}) lightgray 50% / cover no-repeat`
));
const day = computed(() => String(new Date(props.data.publishDate).getDate() + 1).padStart(2, '0'));
const month = computed(() => String(new Date(props.data.publishDate).toLocaleString('en-us', { month: 'short' }).toUpperCase()));
const year = computed(() => String(new Date(props.data.publishDate).getFullYear()));

const h1Class = computed(() => (isTablet.value ? 'is--h4__title' : 'is--h1__title'));

</script>

<template>
  <article
    class="VCardArticleMain v-card-article-main"
    :class="{ 'is--secondary': secondary }"
    :style="{ background: backgroundImage }"
  >
    <div class="v-card-article-main__publish-date is--small-2">
      {{ month }} {{ day }}, {{ year }}
    </div>
    <div class="v-card-article-main__details">
      <div
        class="v-card-article-main__title "
        :class="secondary ? 'is--h4__title' : h1Class"
      >
        {{ data.title }}
      </div>
      <p
        class="v-card-article-main__description"
      >
        {{ data.description }}
      </p>
    </div>
    <a
      :href="data.url"
      :aria-label="data.title"
      v-bind="$attrs"
      class="v-card-article-main__link"
    />
  </article>
</template>


<style lang="scss">
.v-card-article-main {
  $root: &;

  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  height: 449px;
  position: relative;
  align-items: flex-end;
  gap: 8px;
  padding: 40px;
  color: $white !important;
  align-self: stretch;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none !important;
  margin: 0;

  @include media-lte(tablet) {
    height: 300px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
  }

  &.is--secondary {
    height: 300px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: linear-gradient(-180deg,rgba(97,97,97,0) 5%,rgba(15,15,15,.62) 60%,rgba(0,0,0,.73) 100%);
    opacity: .65;
  }

  &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background: 0 0;
      transition: background .5s ease;
    }

    &:hover::after {
        background: rgba(0,79,255,.7);
      }

  &__publish-date {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: relative;

    @include media-lte(tablet) {
      margin-bottom: 12px;
    }
  }

  &__details {
    width: 100%;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    position: relative;

    @include media-lte(tablet) {
      padding-right: 0;
    }
  }

  &__description {
    opacity: 0.9;
    color: inherit;

    @include media-lte(tablet) {
      display: none;
    }

    #{$root}.is--secondary & {
      display: none;
    }
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    @include media-lte(tablet) {
      max-height: 170px;
    }
  }

  &__link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    margin: 0;
  }
}
</style>
