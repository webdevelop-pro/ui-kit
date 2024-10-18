<script setup lang="ts">
import BaseCarousel from 'UiKit/components/BaseCarousel/BaseCarousel.vue';

defineProps({
    name: String,
})

const emit = defineEmits(['click']);

const carouselFiles = [{},{},{},{},{},{},{},{}];

const onClick = () => {
  emit('click');
}
</script>

<template>
    <div class="CarouselUnauthorized carousel-unauthorized">
        <BaseCarousel
            v-if="carouselFiles.length && carouselFiles.length > 1"
            :name="name"
            :files="carouselFiles"
            active-item-by-url
            @click="onClick"
          />
    </div>
</template>


<style lang="sass">
@import 'UiKit/styles/_colors.sass'
.carousel-unauthorized
    width: 100%
    height: 100%
</style>