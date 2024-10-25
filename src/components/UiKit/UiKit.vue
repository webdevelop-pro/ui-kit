<script setup lang="ts">
import { BaseButton } from 'UiKit/components/BaseButton'
import { BasePagination } from 'UiKit/components/BasePagination'
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'
import { BaseBanner } from 'UiKit/components/BaseBanner'
import { BaseAvatar } from 'UiKit/components/BaseAvatar'
BaseAvatar
</script>

<template>
  <h1>UI Kit</h1>
	<BaseButton>test</BaseButton>
	<BasePagination count="100" offset-from="0" offset-to="10"/>
	<br>
	<BaseSvgIcon class="test" name="vue"/>
	<br>
	<BaseBanner store-key="new-banner1" :show="true" type="info">
		<p>akwlkwalkdjalwk awld kjawl dkjlak</p>
	</BaseBanner>
	<BaseAvatar title="John Smith" src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"/>
	<br>
	<BaseAvatar title="John Smith" size="small"/>
	<br>
	<BaseAvatar title="John Smith" size="large" round/>
	<br>
	<BaseAvatar title="John Smith" size="medium"/>
	<br>
	<BaseAvatar title="Smith" size="x-small"/>
</template>

<style lang="sass" scoped>

</style>
