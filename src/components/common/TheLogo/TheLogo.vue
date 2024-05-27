<script setup lang="ts">
import { computed } from 'vue'
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'

const props = defineProps({
  disabled: Boolean,
  routeName: String,
});

const componentName = computed(() => (props.disabled ? 'span' : 'router-link'));
</script>

<template>
  <component
    :is="componentName"
    class="TheLogo the-logo"
    :to="{ name: routeName }"
    exact
    aria-label="Site logo"
  >
    <BaseSvgIcon
      class="the-logo__desktop"
      name="logo"
      alt="logo"
    />
    <BaseSvgIcon
      class="the-logo__mobile"
      name="logo-mob"
      alt="mobile logo"
    />
  </component>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.the-logo
  display: flex
  align-items: center
  padding-bottom: 0

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
