<script setup lang="ts">
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import WhatOurClientsSaySlider from './VWhatOurClientsSaySlider.vue';
import { WhatOurClientsSayTitle, WhatOurClientsSayText, WhatOurClientsSaySlider as sliderData } from 'UiKit/components/VWhatOurClientsSay/utils';

const rightData = {
  title: WhatOurClientsSayTitle,
  text: WhatOurClientsSayText,
};
</script>

<template>
  <VSectionTwoCol
    class="VWhatOurClientsSay v-what-our-clients-say"
    :right="rightData"
    mobile-reverse
  >
    <template #left="slotProps">
      <WhatOurClientsSaySlider
        :slider="sliderData"
        :class="slotProps.class"
      />
    </template>
  </VSectionTwoCol>
</template>

<style lang="scss">
.v-what-our-clients-say {
  overflow: hidden;
}
</style>
