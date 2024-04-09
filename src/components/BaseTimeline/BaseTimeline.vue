<template>
  <div class="BaseTimeline timelines-container timelines">
    <div class="timelines-content">
      <h3
        v-if="title"
        class="timelines-content__title"
      >
        {{ title }}
      </h3>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';


export default defineComponent({
  name: 'WdTimeline',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.timelines-content {
  width: 100%;
  max-width: 740px;
  margin: 108px auto 0;
  position: relative;
  @include media-lte(tablet) {
    margin: 80px auto 0;
  }

  &__title {
    margin-bottom: 20px;
    color: $black;
  }
}

.timelines-container {
  position: relative;
}

</style>
