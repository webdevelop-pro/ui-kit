<script lang="ts" setup="">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	fixedHeader?: boolean;
	height?: string,
	size?: 'large' | 'small'
}>(), {
	height: '100%',
	size: 'large',
});

const btnClasses = computed(() => {
	let classes = `is--size-${props.size} `;
	return classes;
});

</script>

<template>
	<div
		class="BaseTable base-table"
		:class="[btnClasses, { 'is--fixed-header': fixedHeader }]"
		:style="{'height': height}"
	>
		<table class="base-table__table">
			<slot />
		</table>
	</div>
</template>

<style lang="sass" scoped>
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
.base-table
	width: 100%
.base-table
	&.is--fixed-header
		overflow-x: auto
		:deep(thead)
			tr > th
				position: sticky
				top: 0
				z-index: 2

	&__table
		border-collapse: collapse
		border-spacing: 0
		width: 100%
		border: 0
		border-color: transparent !important

	:deep(thead)
		th
			background: $table-thead-background-color
			color: $table-tbody-th-color

	:deep(th)
		font-size: $table-th-font-size
		line-height: $table-th-line-height
		padding: $table-th-padding
		@include font(800)
		text-align: left
		@media screen and (max-width: 768)
			padding: $table-th-padding-mobile

	:deep(tbody)
		border-style: none !important
		tr
			width: 100%
			border-bottom: solid 1px $table-tbody-tr-border-bottom-color
			&:first-child
				border-top: solid 1px $table-tbody-tr-border-bottom-color
			td
				background: $table-tbody-tr-td-background-color
				@include mt(.3s)
				font-size: $table-td-font-size
				line-height: $table-td-line-height
				padding: $table-td-padding
				@include font(400)
				text-align: left
				@media screen and (max-width: 768)
					padding: $table-td-padding-mobile
			&:hover
				td
					background: $table-tbody-td-hover-background-color
					@include mt(.3s)
		td
			color: $table-tbody-td-color
	
	&.is--size-small
		:deep(tbody)
			td
				padding: $table-td-padding-small
		:deep(th)
			padding: $table-th-padding-small
</style>
