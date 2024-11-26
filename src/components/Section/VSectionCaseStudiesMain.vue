<script setup lang="ts">

import VButton from 'UiKit/components/VButton/VButton.vue';
import CaseStudiesNavigation from 'UiKit/components/Section/VSectionNavigation.vue';
import WhatOurClientsSaySidebar from 'UiKit/components/VWhatOurClientsSay/VWhatOurClientsSaySidebar.vue';
import { testimonials } from 'UiKit/components/VWhatOurClientsSay/utils';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';

defineProps({
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

const getStarted = filterPages(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <section class="VSectionCaseStudiesMain case-studies-main">
    <div class="is--container">
      <div class="is--flex-row">
        <div class="case-studies-main__side is--gt-tablet-show">
          <div class="is--side-block is--sticky">
            <div v-if="slug === 'secondary-market-for-alternative-assets'">
              <h3 class="case-studies-main__side-title">
                Table of contents
              </h3>
              <ol class="is--margin-top-30">
                <li><a href="#smooth-transaction-settlement-and-clearing">Smooth Transaction Settlement</a></li>
                <li><a href="#user-experience-and-accessibility">User Experience and Accessibility</a></li>
                <li><a href="#cybersecurity-requirements">Cybersecurity Requirements</a></li>
                <li><a href="#real-time-monitoring-and-reporting">Real-Time Monitoring and Reporting</a></li>
                <li><a href="#data-protection-requirements">Data Protection Requirements</a></li>
                <li><a href="#valuation-and-price-discovery">Valuation and Price Discovery</a></li>
                <li><a href="#liquidity-and-market-efficiency">Liquidity and Market Efficiency</a></li>
                <li><a href="#platform-scalability-and-performance">Platform Scalability and Performance</a></li>
                <li><a href="#regulatory-compliance">Regulatory Compliance</a></li>
                <li><h5><a href="#how-we-can-help">How we can help</a></h5></li>
              </ol>
            </div>
            <h3>
              {{ sideTitle }}
            </h3>
            <div
              class="is--no-margin is--side-block__content"
            >
              <p class="case-studies-main__side-subtitle is--h1__title">
                {{ sideSubtitle }}
              </p>
              <p class="is--h6__title">
                {{ sideText }}
              </p>
            </div>
            <VButton
              tag="a"
              :href="`${getStarted[0].url}?topic=${slug}`"
              size="large"
              variant="outlined"
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
        <div class="case-studies-main__main is--markdown">
          <slot />

          <CaseStudiesNavigation
            v-if="prev || next"
            :prev="prev"
            :next="next"
            class="case-studies-main__navigation"
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
    width: 70.79%;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    @include media-lte(tablet) {
      width: 100%;
    }

    p {
      opacity: 0.9;
    }
    a {
      text-decoration-style: dashed;
      text-decoration-line: underline;
      cursor: pointer;
      transition: all 0.8s ease;
      color: inherit;

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
    width: 29.23%;
    @include media-lt(tablet) {
      width: 100%;
      margin-bottom: 100px;
    }
  }

  &__side-subtitle {
    color: $primary !important;
  }

  &__navigation {
    margin-top: 60px;
    width: 100%;
  }
}
</style>
