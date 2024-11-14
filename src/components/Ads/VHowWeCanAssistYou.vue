<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import { VSvgIcon } from 'UiKit/components/VSvgIcon';
import bg from '/images/assist-bg.png';
import { PropType } from 'vue';
import { howWeCanAssist } from 'UiKit/components/Ads/howWeCanAssist';

interface IHowWeCanAssistYou {
  title: string;
  description: string;
  url: string;
  buttonText: string;
  items: {
    title: string;
    description: string;
    image: string;
    url: string;
  }[];
}

defineProps({
  backgroundImage: String,
  data: {
    type: Object as PropType<IHowWeCanAssistYou>,
    default: howWeCanAssist,
  },
});
</script>

<template>
  <section class="HowWeCanAssistYou how-we-can-assist-you">
    <div class="is--container">
      <div class="how-we-can-assist-you__wrapper">
        <div class="how-we-can-assist-you__left">
          <h2 v-if="data?.title ">
            {{ data?.title }}
          </h2>
          <p v-if="data?.description">
            {{ data?.description }}
          </p>
          <VButton
            v-if="data?.url && data?.buttonText"
            tag="a"
            :href="data?.url"
            icon-placement="right"
            size="large"
          >
            {{ data.buttonText }}
            <VSvgIcon
              name="arrow-right"
            />
          </VButton>
        </div>

        <div
          v-if="data?.items"
          class="how-we-can-assist-you__right is--two-col-grid"
        >
          <div
            v-for="item in data?.items"
            :key="item.title"
            class="how-we-can-assist-you__item"
          >
            <img
              v-if="item.image"
              loading="lazy"
              :src="item.image"
              :alt="item.title"
            >
            <h4 v-if="item.title">
              {{ item.title }}
            </h4>
            <p v-if="item.description">
              {{ item.description }}
            </p>
            <a
              v-if="item.url"
              :href="item.url"
              :aria-label="item.title"
            >
              Learn More
              <span class="is--link-text-hidden">
                {{ item.title }}
              </span>
            </a>
          </div>

          <div
            class="how-we-can-assist-you__background"
          >
            <img
              :src="backgroundImage || bg"
              loading="lazy"
              alt="How we can assist bg image of code"
              class="how-we-can-assist-you__background-image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">

.how-we-can-assist-you {
  &__wrapper {
    overflow: hidden;
    border-radius: 2px;
    border: 1px solid $gray-20;
    background: $gray-10;
    padding: 40px;
    display: flex;
    gap: 40px;
    @include media-lte(desktop) {
      flex-direction: column;
    }
  }

  &__left {
    width: 100%;
    max-width: 409px;
    margin-right: 48px;
    padding: 48px 0;
    @include media-lte(desktop) {
      margin-right: 0;
      max-width: 100%;
      margin-bottom: 20px;
      padding: 0;
    }

    p {
      margin-top: 8px;

      // @extend .is--subheading-2;
      @include font(350);

      font-size: 20px;
      line-height: 30px;
      font-style: normal;
    }

    .v-button {
      margin-top: 40px;
    }

    @include media-lte(tablet) {
      .v-button {
        margin-top: 24px;
      }
      p {
        margin-top: 4px;
      }
    }
  }

  &__item {
    h1, h2, h3, h4, h5, h6 {
      margin-top: 12px;
    }

    a {
      display: block;
      margin-top: 16px;

      // @extend .is--link-1;
      @include font(800);

      font-size: 16px;
      line-height: 26px;
      text-decoration: underline;
      transition: 0.3s all  ease-in-out;
      color: $primary;
      cursor: pointer;
      &:hover {
        text-decoration: none;
      }
    }
  }

  img {
    margin-top: 0;
  }

  &__right {
    position: relative;
    gap: 40px;
    margin-top: 0;
    padding-bottom: 0;
    @include media-lte(desktop) {
      padding-bottom: 120px;
    }
    @include media-lte(tablet) {
      padding-bottom: 0;
    }
  }

  &__background {
    margin-top: 20px;
    width: 100%;
    padding: 1.597px;
    border-radius: 3.194px;
    box-shadow: $box-shadow-large;
    background-color: $white;
    min-height: 150px;
    @include media-gte(tablet) {
      position: absolute;
      padding: 5.479px;
      border-radius: 10.958px;
      margin-top: 0;
      top: calc(100% - 85px);
      height: 100%;
      min-height: 319px;
    }
  }

  &__background-image {
    width: 100%;
    height: 100%;
    border-radius: 2.332px;
    border: 0.603px solid $gray-20;
    object-fit: contain;
    background-color: $white;
    @include media-gte(tablet) {
      border-radius: 10.958px;
    }
  }
}
</style>
