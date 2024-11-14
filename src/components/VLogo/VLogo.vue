<script setup lang="ts">
import { computed } from 'vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

const props = defineProps({
  disabled: Boolean,
  link: String,
  routeName: String,
});

const componentName = computed(() => {
  if (props.link) return 'a';
  if (props.routeName) return 'router-link';
  return 'span';
});
</script>

<template>
  <component
    :is="componentName"
    class="VLogo the-logo"
    :href="link"
    :to="{ name: routeName }"
    aria-label="Site logo"
    :class="{ 'is--link': link || routeName }"
  >
    <VSvgIcon
      class="the-logo__desktop"
      name="logo"
    />
    <VSvgIcon
      class="the-logo__mobile"
      name="logo-mob"
    />
  </component>
</template>

<style lang="sass">
.the-logo
  display: flex
  align-items: center
  padding-bottom: 0
  &.is--link
    cursor: pointer

  &__desktop
    width: 111px
    max-width: 111px
    height: 37px
    @media screen and (max-width: 1024px)
      display: none


  &__mobile
    width: 47px
    height: auto
    @media screen and (min-width: 1024px)
      display: none
</style>
