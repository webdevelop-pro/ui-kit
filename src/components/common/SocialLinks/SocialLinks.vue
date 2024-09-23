<script setup lang="ts">
import { PropType } from 'vue'
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'

interface ISocial {
  icon: string
  href: string
  name: string
  iconName: string
}

defineProps({
  socialList: {
    type: Array as PropType<ISocial[]>,
    required: true,
  },
})
</script>

<template>
  <div class="SocialLinks social-links">
    <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
    <a
      v-for="item in socialList"
      :key="item.icon"
      :href="item.href"
      target="_blank"
      class="social-links__item"
      rel="noopener noreferrer"
      :aria-label="item.name"
    >
      <BaseSvgIcon
        :name="item.iconName"
        class="social-links__icon"
      />
    </a>
  </div>
</template>

<style lang="sass">
@import 'index.sass'
.social-links
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
  color: $white

  @media screen and (max-width: 768px)
    flex-wrap: wrap
    justify-content: center

  @media screen and (max-width: 575px)
    justify-content: flex-start

  &__icon
    height: 24px
    width: 24px

  &__item
    display: flex
    align-items: center
    padding-bottom: 0
    margin-right: 0
    margin-bottom: 0
    color: inherit
    opacity: 1

    &:last-child
      margin-right: 0

    @media screen and (max-width: 768px)
      margin-right: 28px
      margin-bottom: 10px

    &:hover
      color: $primary

    @media screen and (min-width: 768px)
      margin-right: 40px
</style>
