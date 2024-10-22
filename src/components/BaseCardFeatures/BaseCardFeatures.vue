<script setup lang="ts">
  interface Props {
		tag?: 'div' | 'a' | 'router-link'
		buttonText?: string
    href?: string
    to?: object
	}
	const props = withDefaults(defineProps<Props>(), {
		tag: 'div',
	})
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    class="BaseCardFeatures base-card-features is--hover-elevate-up is--hover-visible-elevate-up-wrapper"
  >
    <div class="base-card-features__card">
        <slot />

        <BaseButton
          v-if="buttonText"
          icon-placement="right"
          size="small"
          variant="link"
          class="is--hover-visible-elevate-up-component is--no-margin"
        >
          {{ buttonText}}
          <BaseSvgIcon
            name="arrow-right"
          />
        </BaseButton>
    </div>
  </component>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-card-features
  padding: 8px
  border-radius: 2px
  background: $white
  border: 1px solid $primary-light
  transition: all 0.3s ease
  cursor: pointer
  color: inherit
  text-decoration: none
  margin: 0

  &:hover
    box-shadow: $box-shadow-medium
    border-color: transparent
    transition: all 0.3s ease
    
  &__card
    display: flex
    min-height: 190px
    padding: 20px
    width: 100%
    height: 100%
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 8px
    flex: 1 0 0
    align-self: stretch
    border-radius: 2px
    background: $primary-light
</style>
