<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { PropType } from 'vue';
import { howWeCanAssist } from 'UiKit/components/VAds/howWeCanAssist';
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import VHighlightBase from './VHighlightBase.vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

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
const emit = defineEmits(['click']);
</script>

<template>
  <VHighlightBase
    class="HowWeCanAssistYou how-we-can-assist-you"
    full-width
  >
    <div class="how-we-can-assist-you__wrapper is--gap-80">
      <div class="how-we-can-assist-you__left">
        <h2 v-if="data?.title ">
          {{ data?.title }}
        </h2>
        <p
          v-if="data?.description"
          class="is--subheading-2"
        >
          {{ data?.description }}
        </p>
        <VButton
          v-if="data?.url && data?.buttonText"
          as="a"
          :href="encodeURI(data?.url)"
          size="large"
          variant="tetriary"
          @click="emit('click')"
        >
          {{ data.buttonText }}
          <component
            :is="ArrowRight"
          />
        </VButton>
      </div>

      <div
        v-if="data?.items"
        class="how-we-can-assist-you__right"
      >
        <div
          v-for="item in data?.items"
          :key="item.title"
          class="how-we-can-assist-you__item"
        >
          <VSvgIcon
            :icon="item.image"
            icon-size="24px"
            :alt="item.title"
            class="how-we-can-assist-you__icon"
          />
          <h3
            v-if="item.title"
            class="is--h4__title is--margin-top-12"
          >
            {{ item.title }}
          </h3>
          <p v-if="item.description">
            {{ item.description }}
          </p>
          <a
            v-if="item.url"
            :href="encodeURI(item.url)"
            :aria-label="item.title"
            class="is--link-1 is--color-primary"
            @click="emit('click')"
          >
            Learn More
            <span class="is--link-text-hidden">
              {{ item.title }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </VHighlightBase>
</template>

<style lang="scss">

.how-we-can-assist-you {
  &__wrapper {
    // overflow: hidden;
    // border-radius: 2px;
    // border: 1px solid $gray-20;
    // background: $gray-10;
    // padding: 40px;
    display: flex;
    align-self: center;
    // gap: 40px;

    @include media-lte(desktop) {
      flex-direction: column;
    }
  }

  &__left {
    width: 100%;
    max-width: 457px;

    p {
      max-width: 409px;

      @include media-lte(desktop) {
        max-width: 100%;
      }
    }

    @include media-lte(desktop) {
      max-width: 100%;
    }
  }

  &__item {
    h1, h2, h3, h4, h5, h6 {
      margin-top: 12px;
    }

    a.is--link-1 {
      display: block;
      margin-top: 20px;
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
    margin-top: 0 !important;
  }

  &__right {
    position: relative;
    margin-top: 0;
    padding-bottom: 0;
    padding-right: 30px;
    display: flex;
    align-items: center;
    gap: 60px;
    flex: 1 0 0;
    align-self: stretch;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
  }
}
</style>
