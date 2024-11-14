<script setup lang="ts">
import { PropType } from 'vue';
import VTag from 'UiKit/components/VTag/VTag.vue';
import { navigateWithQueryParams } from 'UiKit/helpers/general';
import { ICaseStudies } from 'UiKit/types/useCase';


defineProps({
  data: {
    type: Object as PropType<ICaseStudies>,
    required: true,
  },
});

const onTagClick = (tag: string) => {
  navigateWithQueryParams('/resource-center', { tag });
};
</script>

<template>
  <section
    class="VSectionTopCaseStudies case-studies-top"
  >
    <div class="is--container">
      <div class="case-studies-top__container is--top">
        <div class="case-studies-top__main">
          <h1
            v-if="data.title"
          >
            {{ data.title }}
          </h1>
          <div
            v-if="data.subtitle"
            class="is--subheading-1"
          >
            {{ data.subtitle }}
          </div>
          <p
            v-if="data.description"
            class="is--margin-top-40"
            v-html="data.description"
          />
        </div>

        <div class="case-studies-top__side">
          <div
            v-if="data.tags"
            class="is--tags-inline"
          >
            <VTag
              v-for="(tag, i) in data.tags"
              :key="i"
              round
              background="#D9FFEE"
              @click="onTagClick(tag)"
            >
              {{ tag }}
            </VTag>
          </div>
          <div
            v-if="data.expertise"
            class="case-studies-top__info-wrap is--gt-tablet-show is--margin-top-40"
          >
            <div class="is--h6__title">
              Expertise
            </div>
            <p class="is--small">
              {{ data.expertise }}
            </p>
          </div>
          <div
            v-if="data.deliverables"
            class="case-studies-top__info-wrap is--gt-tablet-show"
          >
            <div class="is--h6__title">
              Deliverables
            </div>
            <p class="is--small">
              {{ data.deliverables }}
            </p>
          </div>
          <div
            v-if="data.techStack"
            class="case-studies-top__info-wrap is--gt-tablet-show"
          >
            <div class="is--h6__title">
              Tech Stack
            </div>
            <p
              class="is--small"
              v-html="data.techStack"
            />
          </div>
        </div>
      </div>
      <div class="case-studies-top__container is--lt-tablet-show is--margin-top-60">
        <div class="case-studies-top__side">
          <div
            v-if="data.expertise"
            class="case-studies-top__info-wrap"
          >
            <div class="is--h6__title">
              Expertise
            </div>
            <p class="is--small">
              {{ data.expertise }}
            </p>
          </div>
          <div
            v-if="data.deliverables"
            class="case-studies-top__info-wrap"
          >
            <div class="is--h6__title">
              Deliverables
            </div>
            <p class="is--small">
              {{ data.deliverables }}
            </p>
          </div>
          <div
            v-if="data.techStack"
            class="case-studies-top__info-wrap"
          >
            <div class="is--h6__title">
              Tech Stack
            </div>
            <p
              class="is--small"
              v-html="data.techStack"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.case-studies-top {

  &__container {
    display: flex;
    align-items: flex-start;
    gap: 80px;
    align-self: stretch;
    @include media-lte(tablet) {
      gap: 24px;
      flex-direction: column;
    }
    &.is--top {
      @include media-lte(tablet) {
        flex-direction: column-reverse;
      }
    }
  }

  &__main{
    display: flex;
    width: 73.79%;
    flex-direction: column;
    align-items: flex-start;
    @include media-lte(tablet) {
      width: 100%;
    }
  }

  &__side{
    display: flex;
    width: 30.23%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @include media-lte(tablet) {
      width: 100%;
    }
    @include media-lte(tablet) {
      // padding-top: 16px;
    }
  }

  &__info-wrap {
    & + & {
      margin-top: 20px;
    }
  }
}
</style>
