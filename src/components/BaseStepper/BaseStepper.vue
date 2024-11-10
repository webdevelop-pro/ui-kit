<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'

export interface Step {
	title: string;
	value: string;
}

const props = defineProps({
	steps: Array as PropType<Step[]>,
  	modelValue: {
		type: Number,
		required: true,
	}
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'itemClick', value: string): void;
}>();

function onItemClick(step: Step, index: number) {
  if (props.modelValue <= index) return;
  emit('update:modelValue', index);
  emit('itemClick', step.value);
}
</script>

<template>
	<div class="BaseStepper base-stepper">
        <div
			v-for="(step, index) in props.steps"
			:key="step.value"
			class="base-stepper__step"
			:class="[{
				'is--active': modelValue === index,
				'is--completed': props.modelValue > index,
				'is--last': (index + 1) === props.steps?.length,
			}]"
			@click="onItemClick(step, index)"
		>
		<slot
			name="step"
			:step="step"
		>
			<div class="base-stepper__step-point">
				<div class="base-stepper__circle">
					<BaseSvgIcon
						v-if="modelValue > index"
						name="check"
						class="base-stepper__check-icon"
					/>
				</div>
			</div>
			<div class="base-stepper__label">
				<span class="base-stepper__label-step is--small">
					Step {{ index + 1 }}
				</span>
				<span class="base-stepper__label-title is--h5__title">
					{{ step.title }}
				</span>
			</div>
		</slot>
		</div>
	</div>
</template>

<style lang="sass" scoped>
@use 'UiKit/styles/_colors.sass' as colors

.base-stepper
	$root: &

	display: flex
	flex-direction: column
	justify-content: center
	align-items: flex-start
	border-radius: 2px

	&__step
		display: flex
		height: 90px
		align-items: flex-start
		gap: 8px

	&__step-point
		display: flex
		width: 24px
		flex-direction: column
		align-items: flex-start
		gap: 8px
		align-self: stretch
		flex: 1 0 0
		position: relative

		&::after
			content: ''
			position: absolute
			bottom: 0
			height: calc(100% - 24px)
			right: 50%
			transform: translateX(-50%)
			width: 1px
			background: colors.$gray-30

	&__label
		display: flex
		flex-direction: column
		align-items: flex-start

	&__circle
		display: flex
		width: 24px
		height: 24px
		align-items: flex-start
		gap: 10px
		border-radius: 100%
		border: 5px solid colors.$gray-30

	&__label-step
		color: colors.$gray-60

	&__label-title 
		color: colors.$gray-80

	&__check-icon
		display: none
		width: 16px
		height: 16px

	.is--last
		#{$root}__step
			height: auto

		#{$root}__step-point
			&::after
				display: none

	.is--active
		#{$root}__circle
			border-color: colors.$primary
		#{$root}__label-step
			color: colors.$primary

	.is--completed
		cursor: pointer

		&:hover
			#{$root}__label-step
				color: colors.$primary

		#{$root}__circle
			border-color: colors.$primary
			background: colors.$primary
			color: colors.$white

		#{$root}__check-icon
			display: block
</style>
