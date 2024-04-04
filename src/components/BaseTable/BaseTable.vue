<script lang="ts" setup="">

withDefaults(defineProps<{
	fixedHeader?: boolean;
	height?: string,
}>(), {
	height: '100%',
});

</script>

<template>
	<div
		class="BaseTable base-table"
		:class="{'is--fixed-header': fixedHeader}"
		:style="{'height': height}"
	>
		<table class="base-table__table">
			<slot />
		</table>
	</div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
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
			+font(500)

	:deep(td),
	:deep(th)
		font-size: $table-th-td-font-size
		line-height: $table-th-td-line-height
		padding: $table-th-td-padding
		+font(400)
		text-align: left

	:deep(tbody)
		border-style: none !important
		tr
			width: 100%
			border-bottom: solid 1px $table-tbody-tr-border-bottom-color
			&:first-child
				border-top: solid 1px $table-tbody-tr-border-bottom-color
			td
				background: $table-tbody-tr-td-background-color
				+mt(.3s)
			&:hover
				td
					background: $table-tbody-td-hover-background-color
					+mt(.3s)
		td
			color: $table-tbody-td-color
</style>
