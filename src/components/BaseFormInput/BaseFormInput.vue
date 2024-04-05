<script lang="ts" setup>
import { computed, ref, watch, withDefaults, ObjectDirective } from 'vue';
import { MaskTokens } from 'maska/dist/types/tokens';
import { Mask, vMaska } from 'maska';

// IMPORTANT: before using this component you need to install maska
// type in the terminal yarn add maska

interface Props {
	placeholder?: string
	modelValue?: string
	type?: string
	isError?: boolean
	mask?: string
	maskTokens?: MaskTokens
	moneyFormat?: boolean
	disallowSpecialChars?: boolean
	disallowNumbers?: boolean
	allowIntegerOnly?: boolean
	allowChars?: string[]
	disallowChars?: string[]
	append?: boolean
	prepend?: boolean
	readonly?: boolean
	disabled?: boolean
	autoFocused?: boolean
    dataTestid?: string
	size?: 'large' | 'medium' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	type: 'text',
	size: 'medium'
})

const moneyFormatOptions = {
      maska: '0',
      reversed: true,
      tokens: '0:d:multiple|9:d:optional',
      preProcess: (val: string) => val.replace(/[$,]/g, ''),
      postProcess: (val: string) => {
        if (!val) return '';

        const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0);

        return Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(+val)
          .slice(0, sub ? -sub : undefined);
      },
    }

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const localValue = ref('');
const focused = ref(false);

const mask = new Mask({
	mask: props.mask,
	tokens: props.maskTokens,
})
const unmaskedLocalValue = computed(() => mask.unmasked(localValue.value));
const returnValue = computed(() => (
	(!props.mask || props.maskTokens) ? localValue.value : unmaskedLocalValue.value
))
const maskOptions = computed(() => (props.moneyFormat ? moneyFormatOptions : null));

function getEscapedRegExp(str: string) {
	// If you need to use any of the special characters literally (actually searching for a "*", for instance),
	// you must escape it by putting a backslash in front of it.
	// eslint-disable-next-line no-useless-escape
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

const specialCharacters = computed(() => {
	// depending on props we are adding or removing characters
	let charsString = '';
	if (props.disallowSpecialChars) charsString += '@&#+$~%^:*?<>{}[]!)(_/\\|=`;"';
	if (props.disallowNumbers) charsString += '0123456789';
	if (props.disallowChars) charsString += props.disallowChars;
	if (props.allowChars) {
		[...charsString].forEach((char) => {
			charsString = charsString.replace(char, '');
		});
	}
	return getEscapedRegExp(charsString);
});
// create regex from characters what to exclude
const disallowCharsRegex = computed(() => new RegExp(`[${specialCharacters.value}]`, 'g'));

function onFilterSpecialCharsKeyDown(event: KeyboardEvent) {
	// function to exclude characters on typing
	if (specialCharacters.value.includes(event.key)) {
		event.preventDefault();
	}
}

function onFilterSpecialCharsBeforeInput(event: InputEvent) {
	if (disallowCharsRegex.value.test(event.data || '')) {
		event.preventDefault();
	}
}

function onIntegerKeyDown(event: KeyboardEvent) {
	if (['.', ',', '+', '-', 'e', 'E'].includes(event.key)) {
		event.preventDefault();
	}
}

function onIntegerBeforeInput(event: InputEvent) {
	if (event.data === '.') event.preventDefault();
}

function onBeforeInput(event: InputEvent) {
	if (props.allowIntegerOnly) onIntegerBeforeInput(event);
	onFilterSpecialCharsBeforeInput(event);
}

function onKeyDown(event: KeyboardEvent) {
	if (props.allowIntegerOnly) onIntegerKeyDown(event);
	onFilterSpecialCharsKeyDown(event);
}

function onInput(value: string) {
	// characters to check to replace
	// const charsToCheck = props.allowIntegerOnly ? /^0+|\D+/g : disallowCharsRegex.value;
	const charsToCheck = props.allowIntegerOnly ? /[^\d]/g : disallowCharsRegex.value;

	// set filtered value
	localValue.value = String(value).replace(charsToCheck, '');
	if (props.mask) localValue.value = mask.masked(localValue.value);
	emit('update:modelValue', returnValue.value);
}

function onInputEvent() {
	onInput(localValue.value);
}

// On user paste from buffer
function onPaste(event: ClipboardEvent) {
	const clipboardData = event?.clipboardData?.getData('text/plain');
	const clipboardDataTrimmed = String(clipboardData)
		.replace(/\t/g, ' ')
		.replace(/ {2,}/g, ' ')
		.trim();
	// wait until variable changed
	setTimeout(() => onInput(clipboardDataTrimmed));
}

function onFocus() {
	focused.value = true;
}

function onBlur() {
	focused.value = false;
}

// TODO: this has to be worked on as it gives bug in chrome on click
// const vFocus = (el: HTMLElement, value: boolean | undefined) => value && el.focus();

// check modelValue data
if (props.modelValue !== '') onInput(props.modelValue);
watch(() => props.modelValue, () => onInput(props.modelValue));
</script>

<template>
	<div
		class="BaseFormInput base-form-input"
		:class="[`is--size-${size}`, {'is--error': isError, 'is--focused': focused, 'is--readonly': readonly, 'is--disabled': disabled}]"
	>
		<span
			v-if="append"
			class="base-form-input__append"
		>
			<slot name="append" />
		</span>
		<input
			v-model="localValue"
			v-maska:[maskOptions]
			class="base-form-input__input"
			:placeholder="placeholder"
			:type="type"
			:title="localValue"
			tabindex="0"
			v-bind="$attrs"
      		:data-testid="dataTestid"
			@input="onInputEvent"
			@paste="onPaste"
			@keydown="onKeyDown"
			@beforeinput="onBeforeInput"
			@focus="onFocus"
			@blur="onBlur"
		>
		<span
			v-if="prepend"
			class="base-form-input__prepend"
		>
			<slot name="prepend" />
		</span>
	</div>
</template>

<style lang="sass">
@import 'index.sass'
.base-form-input
	color: $input-color
	caret-color: $input-caret-color
	background-color: $input-background-color
	font-size: $input-font-size
	line-height: $input-line-height
	font-weight: $input-font-weight
	font-family: $input-font-family
	padding: $input-padding
	margin: 0
	-webkit-appearance: none
	display: flex
	align-items: center
	width: 100%
	position: relative
	border: $input-border
	border-radius: $input-border-radius
	height: $input-height
	&.is--focused
		border-color: $input-border-focus-color
	&.is--error
		border-color: $input-border-error-color
	&.is--size-large
		height: $input-large-size-height
		font-size: $input-large-size-font-size
		line-height: $input-large-size-line-height
	&.is--size-small
		height: $input-small-size-height
		font-size: $input-small-size-font-size
		line-height: $input-small-size-line-height
	&.is--readonly
		border-radius: 0
		border: none
		pointer-events: none
	&.is--disabled
		opacity: 0.3
		pointer-events: none
	&__input
		padding: 0
		border: none
		color: inherit
		font-size: inherit
		font-weight: inherit
		font-family: inherit
		line-height: inherit
		background-color: transparent
		width: 100%
		position: relative
		z-index: 2

		&:focus
			outline: none

		&::placeholder
			opacity: 1
			color: $input-placeholder-color
			font-size: inherit
			font-weight: inherit
			font-family: inherit
			line-height: inherit

	&__append,
	&__prepend
		color: inherit
		font-size: inherit
		font-weight: inherit
		font-family: inherit
		line-height: inherit
		width: 20px
		height: 100%
		display: flex
		align-items: center
		margin-right: 8px
		position: relative
		z-index: 2
		> div
			width: 20px
			height: 20px
		svg
			width: 20px
			height: 20px
			fill: inherit
	&__prepend
		margin-right: 0
		margin-left: 8px
</style>
