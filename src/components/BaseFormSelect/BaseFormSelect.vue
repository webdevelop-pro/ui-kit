<script lang="ts" setup>
import { computed, ref, h, useSlots } from 'vue';
import VSelect from 'vue-select';

// IMPORTANT: before using this component you need to install library
// type in the terminal: yarn add vue-select@beta

type ObjectOptionValue = string | number | boolean;
type ObjectOption = Record<string, ObjectOptionValue>

const slots = useSlots();

const props = withDefaults(defineProps<{
	/**
	 * Options for select
	 */
	options: ObjectOption | ObjectOption[] | string[];
	/**
	 * Key for label in an object option when options is array of objects
	 */
	itemLabel?: string;
	/**
	 * Key for value in an object option when options is array of objects
	 */
	itemValue?: string;
	/**
	 * Make select searchable
	 */
	searchable?: boolean;
	/**
	 * Sort options in ASC by label
	 */
	sort?: boolean;
	/**
	 * Exclude options from select. Pass array of values even if options is array of objects
	 */
	excludeOptions?: Array<string|number>;
	/**
	 * Return object instead of value if options is array of objects
	 */
	returnObject?: boolean;
	/**
	 * Swap label and value in options if options is simple object
	 */
	swapLabelAndValue?: boolean;
	/**
	 * size - default is large, can be: large(height: 48px)/medium(height: 40px)
	 */
	size?: 'large' | 'medium';
	isError?: boolean;
	readonly?: boolean,
	disabled?: boolean,
	dropdownAbsolute?: boolean,
}>(), {
	itemLabel: 'label',
	itemValue: 'value',
	size: 'large',
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: ObjectOption|ObjectOptionValue): void
}>();

// element for open icon
const OpenIndicator = {
	render: () => h('span', ''),
};

const isFocused = ref(false);
const selectComponent = ref();

// Normalize options. Changes only if options is object
// Using props.itemLabel and props.itemValue to set label and value for option
const normalizedOptions = computed((): ObjectOption[] | string[] => {
	if (Array.isArray(props.options)) return props.options;
	return Object.entries(props.options).map(([key, value]) => (
		// If key is value and value is label
		props.swapLabelAndValue
			? { [props.itemValue]: String(key), [props.itemLabel]: String(value) }
			: { [props.itemValue]: String(value), [props.itemLabel]: key }
	));
});

// Filter options by excludeOptions
const filteredOptions = computed(() => {
	if (!props.excludeOptions || !normalizedOptions.value.length) return normalizedOptions.value;
	// Filter for if options is array of strings
	if (typeof normalizedOptions.value[0] === 'string') {
		return (normalizedOptions.value as string[]).filter(option => (
			!(props.excludeOptions as string[]).includes(option)
		));
	}
	// Filter for if options is array of objects
	return (normalizedOptions.value as ObjectOption[]).filter(option => (
		!(props.excludeOptions as string[]).includes((option as ObjectOption)[props.itemValue] as string)
	));
});

// Sort option by label if it required by props.sort
const sortedOptions = computed(() => {
	if (!props.sort || !normalizedOptions.value.length) return filteredOptions.value;
	if (typeof filteredOptions.value[0] === 'string') {
		return (filteredOptions.value.slice() as string[]).sort();
	}
	return (filteredOptions.value.slice() as ObjectOption[]).sort((a, b) => (
		String(a[props.itemLabel]).localeCompare(String(b[props.itemLabel]))
	));
});

// transform value for selected option
// By default if option is object return value of option but return object if props.returnObject is true
function getReturnValue(value: string | ObjectOption): string | ObjectOptionValue | ObjectOption {
	if (props.returnObject || typeof value === 'string') return value;
	return (value as ObjectOption)[props.itemValue];
}

// find from options by search string
// ignores types and cases
function findOptionsBySearchString(searchString: string) {
	if (!searchString || !sortedOptions.value.length) return null;
	if (typeof sortedOptions.value[0] === 'string') {
		return (sortedOptions.value as string[])
			.find((item: string) => String(item).toLowerCase() === searchString.toLowerCase());
	}
	return (sortedOptions.value as ObjectOption[])
		// .find(item => String(item[props.itemValue]).toLowerCase() === searchString.toLowerCase()
		// 	|| item[props.itemLabel] === searchString.toLowerCase());
		.find(item => item[props.itemLabel] === searchString.toLowerCase());
}

// On user input search
// Also triggers on browser form autofill
function onSearch(searchString: string) {
	//
	const item = findOptionsBySearchString(searchString);
	if (item) {
		emit('update:modelValue', getReturnValue(item));
		selectComponent.value.onAfterSelect();
	}
}

</script>

<template>
	<v-select
		ref="selectComponent"
		class="BaseFormSelect base-select"
		:class="[`is--select-${size}`, {
			'is--error': isError,
			'is--disabled': disabled,
			'is--readonly': readonly,
			'is--append': slots.append,
			'is--focused': isFocused,
			'is--dropdown-absolute': dropdownAbsolute,
		}]"
		:options="sortedOptions"
		:searchable="searchable"
		:clearable="false"
		:reduce="getReturnValue"
		:label="itemLabel"
		:autocomplete="isFocused ? 'new-password' : 'on'"
		:components="{ OpenIndicator }"
		v-bind="$attrs"
		@search:focus="isFocused = true"
		@search:blur="isFocused = false"
		@search="onSearch"
		@update:model-value="emit('update:modelValue', $event)"
	>
		<template
			v-if="slots.append"
			#header
		>
			<div class="base-select__append">
				<slot name="append" />
			</div>
		</template>
		<template #no-options>
			<div class="base-select__no-options">
				No data available
			</div>
		</template>
	</v-select>
</template>

<style lang="sass" scoped>
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
.base-select
	width: 100%
	position: relative
	font-size: $select-font-size
	font-family: $select-font-family
	font-weight: $select-font-weight
	background: $select-background-color
	&.is--select-large
		:deep(.vs__dropdown-toggle)
			height: $select-large-height
	&.is--select-medium
		:deep(.vs__dropdown-toggle)
			height: $select-height
		.base-select__append
			height: $select-height
	&.is--focused
		:deep(.vs__dropdown-toggle)
			border-color: $select-border-focus-color
	&.is--error
		:deep(.vs__dropdown-toggle)
			border-color: $select-border-error-color
			&:before
				display: none
	&.is--disabled
		opacity: 0.3
		pointer-events: none
	&.is--readonly
		pointer-events: none
		:deep(.vs__dropdown-toggle)
			background-color: transparent
			padding-left: 0
			padding-right: 0
			.vs__actions
				display: none
	&.is--append
		:deep(.vs__dropdown-toggle)
			padding-left: 43px
	&.is--dropdown-absolute
		position: relative
		:deep(.vs__dropdown-menu)
			position: absolute
			top: 100%
			width: 100%
			z-index: 10
	&.vs--unsearchable
		:deep(.vs__dropdown-toggle),
		:deep(.vs__search)
			cursor: pointer !important
	&__append
		position: absolute
		left: 15px
		top: 0
		z-index: 2
		width: 20px
		height: 48px
		display: flex
		align-items: center
	:deep(.vs__dropdown-toggle)
		border: $select-border
		border-radius: $select-border-radius
		position: relative
		display: flex
		align-items: center
		justify-content: space-between
		padding: 12.5px 12px
		height: $select-height
		.vs__selected-options
			display: flex
			flex-basis: 100%
			flex-grow: 1
			flex-wrap: wrap
			position: relative
			align-items: center
		.vs__actions
			display: flex
			margin-left: 8px
		.vs__search
			border: solid 1px transparent
			outline: none
			background: none
			box-shadow: none
			color: inherit
			font-size: inherit
			font-weight: inherit
			font-family: inherit
			line-height: inherit
			width: 0
			max-width: 100%
			flex-grow: 1
			z-index: 1
			appearance: none
			padding: 0
			&::placeholder
				color: $select-placeholder-color
				font-size: inherit
				font-weight: inherit
				font-family: inherit
				line-height: inherit
				opacity: 1
		.vs__open-indicator
			background-image: url(./arrow.svg)
			width: 16px
			height: 16px
			transform: rotate(90deg)
			@include mt(.3s)
			background-size: contain
			background-repeat: no-repeat
	:deep(.vs__dropdown-menu)
		padding-left: 0
		list-style-type: none
		background-color: $select-menu-background
		border: $select-menu-border
		box-shadow: $select-menu-box-shadow
		border-radius: $select-menu-border-radius
		max-height: $select-menu-max-height
		overflow: scroll
	:deep(.vs__dropdown-option)
		font-family: $select-menu-option-font-family
		color: $select-menu-option-color
		padding: 12px
		cursor: pointer
		font-size: $select-menu-option-font-size
		line-height: $select-menu-option-line-height
		&.vs__dropdown-option--highlight
			background-color: $select-menu-option-highlight-color
		&.vs__dropdown-option--selected
			color: $select-menu-option-selected-color
			font-size: $select-menu-option-selected-font-size
			font-weight: $select-menu-option-selected-font-weight
	&.vs--open
		&.is--error
			:deep(.vs__dropdown-toggle)
				border-color: $select-border-error-color
		:deep(.vs__dropdown-toggle)
			&:before
				display: none
		:deep(.vs__open-indicator)
			transform: rotate(270deg)
		&.vs--searchable
			:deep(.vs__selected)
				position: absolute
				opacity: 0
			:deep(.vs__search)
				width: 100%
			
	&__no-options
		padding: 15px
</style>
