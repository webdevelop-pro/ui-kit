<script setup lang="ts">
import { BaseButton } from '@/components/BaseButton'
import { BasePagination } from '@/components/BasePagination'
import { BaseSvgIcon } from '@/components/BaseSvgIcon'

</script>

<template>
  <h1>UI Kit</h1>
	<BaseButton>test</BaseButton>
	<BasePagination count="100" offset-from="0" offset-to="10"/>
	<br>
	<BaseSvgIcon class="test" name="vue"/>
</template>

<style lang="sass" scoped>

</style>
