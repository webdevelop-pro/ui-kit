<script lang="ts" setup>
import { ref, withDefaults } from 'vue';
import BaseFormCheckbox from '@/components/BaseFormCheckbox';

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

<style lang="sass">
.base-form-checkbox-group
	$root: &
	
	display: flex
	flex-direction: column
	align-items: flex-start
	
	&__item
		margin: 10px 0
</style>
