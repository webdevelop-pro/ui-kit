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

<style lang="sass" scoped>
@import 'index.sass'
.timelines-content
  width: 100%
  max-width: 740px
  margin: 108px auto 0
  position: relative
  @media screen and (max-width: 767px)
    margin: 80px auto 0

  &__title
    margin-bottom: 20px
    color: $black

.timelines-container
  position: relative
</style>
