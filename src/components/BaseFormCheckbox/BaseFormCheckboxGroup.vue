<script lang="ts" setup>
import { ref, withDefaults } from 'vue';
import BaseFormCheckbox from 'UiKit/components/BaseFormCheckbox';

const props = withDefaults(defineProps<{
	options: string[],
	modelValue: string[],
}>(), {
	options: () => [],
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string[]): void,
}>();

const value = ref(props.modelValue);

function onUpdate(option: string, checked: boolean) {
	if (checked) {
		value?.value?.push(option);
	} else {
		value?.value?.splice(value.value.indexOf(option), 1);
	}
	emit('update:modelValue', value?.value);
}

</script>

<template>
	<div class="BaseFormCheckboxGroup base-form-checkbox-group">
		<template
			v-for="(option, index) in options"
			:key="index"
		>
			<BaseFormCheckbox
				v-bind="$attrs"
				:model-value="value.includes(option)"
				class="base-form-checkbox-group__item"
				@update:model-value="onUpdate(option, $event)"
			>
				<span> {{ option }}</span>
			</BaseFormCheckbox>
		</template>
	</div>
</template>

<style lang="sass" scoped>
.base-form-checkbox-group
	$root: &
	width: 100%

	--base-form-checkbox-group-item--padding: 15px 12px
	--base-form-checkbox-group-item--background-color: #E9ECEF
	
	display: flex
	flex-direction: column
	align-items: flex-start
	
	&__item
		padding: var(--base-form-checkbox-group-item--padding)
		width: 100%
		cursor: pointer
		transition: all 0.2s ease 
		&:hover
			background: var(--base-form-checkbox-group-item--background-color)
</style>
