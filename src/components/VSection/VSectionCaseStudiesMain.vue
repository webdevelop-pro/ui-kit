<script lang="ts">
import { useData } from 'vitepress';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import CaseStudiesNavigation from 'UiKit/components/VSection/VSectionNavigation.vue';
import WhatOurClientsSaySidebar from 'UiKit/components/VWhatOurClientsSay/VWhatOurClientsSaySidebar.vue';
import { testimonials } from 'UiKit/components/VWhatOurClientsSay/utils';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  prev: String,
  next: String,
  topic: String,
  slug: {
    type: String,
    required: true,
  },
  sideTitle: String,
  sideSubtitle: String,
  sideText: String,
});

const { theme, frontmatter } = useData();
const getStarted = theme.navigation.getStarted.data;

const currentPage = computed(() => (
  theme.navigation.root.getPageByURL(frontmatter.value.url)
));

const prevUrl = computed(() => 
  props.prev || currentPage.value?.prev()?.data?.url
);

const nextUrl = computed(() => 
  props.next || currentPage.value?.next()?.data?.url
);
</script>

<template>
  <section class="VSectionCaseStudiesMain case-studies-main">
    <div class="is--container">
      <div class="is--flex-row">
        <div class="case-studies-main__side is--gt-tablet-show is--width-30">
          <div class="is--side-block is--sticky">
            <slot name="sidebar" />
           
            <h3>
              {{ sideTitle }}
            </h3>
            <div
              class=" is--side-block__content"
            >
              <p class="is--color-primary is--h1__title">
                {{ sideSubtitle }}
              </p>
              <p class="is--h6__title">
                {{ sideText }}
              </p>
            </div>
            <VButton
              as="a"
              :href="`${getStarted.url}?topic=${topic}`"
              size="large"
              variant="outlined"
              class="is--margin-top-30"
            >
              Have Questions?
            </VButton>

            <WhatOurClientsSaySidebar
              v-if="testimonials"
              :slider="testimonials"
              class="is--margin-top-50"
            />
          </div>
        </div>
        <div class="case-studies-main__main is--width-70 with-default-distance">
          <slot />

          <CaseStudiesNavigation
            v-if="prevUrl || nextUrl"
            :prev="prevUrl"
            :next="nextUrl"
            class="is--margin-top-60 is--width-100"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.case-studies-main {

  &__main{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;

    p {
      opacity: 0.9;
    }

    a:not(.v-button) {
      text-decoration-style: dashed;
      text-decoration-line: underline;
      cursor: pointer;
      transition: all 0.8s ease;
      color: inherit;
      display: inline;

      &:hover {
          text-decoration-line: none;
          background-size: 100% 100%;
      }
    }

    a.header-anchor {
      text-decoration-line: none;
    }
  }

  &__side{
    @include media-lt(tablet) {
      margin-bottom: 100px;
    }
  }
}
</style>
