<script setup lang="ts">
import { PropType } from 'vue';
import { ICommunication } from '../utils';
import { storeToRefs } from 'pinia';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';

const { isTablet } = storeToRefs(useBreakpoints());

defineProps({
  data: {
    type: Object as PropType<ICommunication>,
    required: true,
  },
});

</script>

<template>
  <section class="VSectionDevelopmentStrengthenCommunication development-strengthen-communication">
    <div class="is--container">
      <h2
        class="development-strengthen-communication__title"
        :class="{ 'is--h2__mobile': isTablet } "
      >
        {{ data.title }}
      </h2>
      <p class="development-strengthen-communication__subtitle is--subheading-1">
        {{ data.subtitle }}
      </p>
      <div class="development-strengthen-communication__container">
        <div
          v-for="(item, i) in data.items"
          :key="i"
          class="development-strengthen-communication__item"
        >
          <p class="development-strengthen-communication__text">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-strengthen-communication {
  width: 100%;
  color: $white;

  &__title {
    max-width: 799px;
  }

  &__subtitle {
    max-width: 799px;
    margin-bottom: 40px;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__item {
    padding-left: 20px;
    border-left: 2px solid $secondary;
  }

  p {
    color: inherit;
  }
}
</style>
