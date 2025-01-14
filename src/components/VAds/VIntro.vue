<script setup lang="ts">
import { computed, PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';


interface IDigitalIntro {
  title: string;
  text: string;
  list: string[];
}

const props = defineProps({
  data: {
    type: Array as PropType<IDigitalIntro[]>,
    required: true,
  },
  short: Boolean,
  twoCol: Boolean,
  title: String,
  subTitle: String,
  color: {
    type: String as PropType<'dark' | 'primary'>,
    default: 'primary',
  },
});

const isDark = computed(() => props.color === 'dark');
const isPrimary = computed(() => props.color === 'primary');
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    class="VIntro v-intro is--paddings with-default-distance"
    :class="{ 'is--highlight-black': isDark, 'is--highlight-primary-light': isPrimary }"
  >
    <div
      :class="{ 'is--short': short, 'is--two-col-grid is--gap-80': twoCol, 'v-intro__container': !twoCol }"
    >
      <div
        v-for="(item, i) in data"
        :key="i"
        class="is--border-left"
      >
        <slot>
          <h2
            v-if="item.title"
            class="is--h2__title"
          >
            {{ item.title }}
          </h2>
          <p
            v-if="item.text"
            v-html="item.text"
          />
          <ol
            v-if="item.list"
          >
            <li
              v-for="(listItem, lii) in item.list"
              :key="lii"
            >
              {{ listItem }}
            </li>
          </ol>
        </slot>
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
.v-intro {
  position: relative;
  z-index: 0;
  width: 100%;
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 80px;
    @include media-lte(desktop-lg) {
      gap: 60px;
    }

    &.is--short{
      @include media-gt(desktop-lg) {
        max-width: 753px;
      }
    }
  }

  li + li {
    margin-top: 26px !important;
  }

  .is--border-left {
    padding-left: 20px;
    border-left: 2px solid $secondary;
  }


  &.is--highlight-black {
    background: $black;
    color: $white;

    .is--border-left {
      border-color: $secondary;
    }
    p {
      color: $gray-10;
    }
    li{
      color: $gray-10;
    }
  }

  &.is--highlight-primary-light {
    background: $primary-light;
    .is--border-left {
      border-color: $primary;
    }
  }
}
</style>
