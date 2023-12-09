<script lang="ts" setup>
import { ref, computed, withDefaults } from 'vue';

type FormRadioOption = {
	value: unknown,
	text: string,
	message?: string,
};

const props = withDefaults(defineProps<{
	modelValue: string | string[] | number[]
	options?: Record<string | number, unknown> | string[] | FormRadioOption[],
	row?: boolean,
	disabled?: boolean,
}>(), {
	options: () => [],
});

defineEmits<{
	(e: 'update:modelValue', value: boolean | string | string[] | number[]): void;
}>();

function isObject(value: unknown): boolean {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sortBy<T extends object>(collection: T[], param: string): T[] {
	collection.sort((a, b) => {
		if (!isObject(a) || !isObject(b)) throw new Error('sortBy expect array of objects as argument');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (a[param] < b[param]) return -1;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (a[param] > b[param]) return 1;
		return 0;
	});
	return collection;
}

const selectedOption = ref(props.modelValue);

function isOptionsObject() {
	return isObject(props.options);
}

const formattedOptions = computed(() => {
	if (isOptionsObject()) {
		// Make array from object
		let normalizedOptions: FormRadioOption[] = Object
			.entries(props.options)
			.map(([text, value]) => ({
				value,
				text: String(text),
			}));
		// Sort options by text if more than 7
		if (normalizedOptions.length > 7) {
			normalizedOptions = sortBy(normalizedOptions, 'text');
		}
		return normalizedOptions;
	}
	return props.options;
});

function getInputValue(option: string | number | FormRadioOption) {
	return isObject(option) ? (option as FormRadioOption).value : option;
}

function getLabelValue(option: string | number | FormRadioOption) {
	return isObject(option) ? (option as FormRadioOption).text : String(option);
}

</script>

<template>
	<div
		class="BaseFormRadio base-form-radio"
		:class="{'is--row': row, 'is--disabled': disabled}"
	>
		<div
			v-for="(option, index) in formattedOptions"
			:key="index"
			class="base-form-radio__item"
		>
			<div class="base-form-radio__item-input">
				<input
					:id="index"
					v-model="selectedOption"
					:value="getInputValue(option)"
					type="radio"
					tabindex="1"
					class="base-form-radio__input"
					v-bind="$attrs"
					@change="$emit('update:modelValue', $event.target.value)"
				>
				<label
					:for="index"
					class="base-form-radio__label"
				>
					{{ getLabelValue(option) }}
				</label>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
@import 'index.sass'
.base-form-radio
	$root: &
	display: flex
	flex-direction: column
	&.is--row
		align-items: center
		flex-direction: row
		#{$root}__item
			margin: 0 30px 0 0
	&.is--disabled
		pointer-events: none
		opacity: 0.3
	&__item-input
		display: flex
		align-items: center
		margin: 10px 0
	&__input
		position: relative
		border-radius: 50%
		width: $radio-input-size
		height: $radio-input-size
		border: $radio-input-border
		margin: 0
		-webkit-appearance: none
		cursor: pointer
		&:checked
			border-color: $radio-input-circle-color
			&:after
				content: ''
				position: absolute
				width: calc(#{$radio-input-size} / 2)
				height: calc(#{$radio-input-size} / 2)
				transform: translate(-50%, -50%) scale(1)
				background-color: $radio-input-circle-color
				border-radius: 50%
				left: 50%
				top: 50%
	
	&__label
		color: $radio-input-label-color
		font-family: $radio-input-label-font-family
		font-weight: $radio-input-label-font-weight
		font-size: $radio-input-label-font-size
		display: inline-block
		position: relative
		margin-left: 8px
		cursor: pointer
</style>
