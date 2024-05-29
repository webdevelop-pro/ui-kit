<script lang="ts" setup>
import { withDefaults, ref } from 'vue';

const focused = ref(false);

function onFocus() {
	focused.value = true;
}

function onBlur() {
	focused.value = false;
}

withDefaults(defineProps<{
	modelValue: string | number;
	isError?: boolean;
}>(), {
	modelValue: '',
});

defineEmits<{
	(e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
	<div
		class="BaseFormTextarea base-form-textarea"
		:class="{'is--error': isError, 'is--focused': focused}"
	>
    <textarea
	    :value="modelValue"
	    tabindex="1"
	    class="base-form-textarea__textarea"
	    v-bind="$attrs"
	    @change="$emit('update:modelValue', $event.target.value)"
	    @focus="onFocus"
	    @blur="onBlur"
		@input="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </textarea>
	</div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-form-textarea
	color: $textarea-color
	caret-color: $textarea-caret-color
	background-color: $textarea-background-color
	font-size: $textarea-font-size
	line-height: $textarea-line-height
	font-weight: $textarea-font-weight
	font-family: $textarea-font-family
	margin: 0
	-webkit-appearance: none
	display: flex
	align-items: center
	width: 100%
	position: relative
	border: $textarea-border
	border-radius: $textarea-border-radius
	height: $textarea-height
	&.is--focused
		border-color: $textarea-border-focus-color
	&.is--error
		border-color: $textarea-border-error-color
	&__textarea
		padding: 0
		border: none
		color: inherit
		font-size: inherit
		font-weight: inherit
		font-family: inherit
		line-height: inherit
		background-color: transparent
		width: 100% !important
		position: relative
		z-index: 2
		padding: $textarea-padding
		&:focus
			outline: none
		&::placeholder
			opacity: 1
			color: $textarea-placeholder-color
</style>
