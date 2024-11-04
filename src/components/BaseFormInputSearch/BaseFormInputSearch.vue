<script lang="ts" setup>
import BaseFormInput from 'UiKit/components/BaseFormInput';
import { computed, ref, watch } from 'vue';
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'

const props = defineProps({
	modelValue: String,
})
const emit = defineEmits(['@update:modelValue']);

const model = ref(props.modelValue);

const showClearButton = computed(() => Boolean(model.value));

const onClearClick = () => {
  model.value = '';
}
watch(() => model.value, () => {
    emit('@update:modelValue', model.value);
});
watch(() => props.modelValue, () => {
    model.value = props.modelValue;
});
</script>

<template>
	<div
		class="BaseFormInputSearch base-form-input-search"
	>
        <BaseFormInput
			:model-value="model"
          	name="search"
          	append
          	prepend
			v-bind="$attrs"
          	placeholder="Search"
			class="base-form-input-search__search-input"
			@update:model-value="model = $event"
        >
          <template #append>
            <BaseSvgIcon
              name="search"
			  class="base-form-input-search__search-icon"
            />
          </template>
          <template #prepend>
			<div v-if="showClearButton" @click="onClearClick">
				<BaseSvgIcon
					name="close"
					class="base-form-input-search__close-icon"
				/>
			</div>
          </template>
        </BaseFormInput>
	</div>
</template>

<style lang="sass" scoped>
@use 'index.sass' as *
.base-form-input-search
	&__search-icon
		width: 20px
		color: $base-form-input-search-search-icon-color
	&__close-icon
		width: 10px !important
		color: $base-form-input-search-close-icon-color
		cursor: pointer
		display: block
</style>
