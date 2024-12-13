<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean|string|number;
  options?: Array<boolean|string|number>;
  hasAsterisk?: boolean;
  id?: string;
  isError?: boolean;
  name?: string;
  labelBold?: boolean;
  labelCenter?: boolean;
  readonly?: boolean;
  disabled?: boolean;
    dataTestid?: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean|string|number): void;
  (e: 'change', value: boolean|string|number): void;
}>();

function generateIdShort(): string {
  return Math.random().toString(36).slice(2);
}

const inputId = computed(() => (
  props.id || props.name || generateIdShort()
));

const normalizedOptions = computed(() => (
  (props.options?.length && props.options?.length >= 2) ? props.options : [false, true]
));

const model = computed({
  get() {
    return props.modelValue === normalizedOptions.value[1];
  },
  set(value) {
    if (props.readonly) return;
    emit('update:modelValue', normalizedOptions.value[Number(value)]);
  },
});

function onChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).checked);
}

</script>

<template>
  <div
    class="VFormCheckbox v-form-checkbox"
    :class="{
      'is--label-bold': labelBold,
      'is--label-center': labelCenter,
      'is--checked': modelValue,
      'is--readonly': readonly,
      'is--disabled': disabled,
      'is--error': isError,
    }"
  >
    <label
      :for="inputId"
      class="v-form-checkbox__label"
    >
      <input
        :id="inputId"
        v-model="model"
        tabindex="0"
        class="v-form-checkbox__input"
        v-bind="$attrs"
        :data-testid="dataTestid"
        type="checkbox"
        @change="onChange"
      >
      <span class="v-form-checkbox__icon-wrap">
        <svg
          class="v-form-checkbox__icon"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="#48535C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="square-check 1"
            clip-path="url(#clip0_381_5240)"
          >
            <path
              id="Vector"
              d="M12 0H0V12H12V0ZM9.02679 4.74107L5.59821 8.16964L5.14286 8.625L4.6875
            8.16964L2.97321 6.45536L2.51786 6L3.42857 5.09196L3.88393 5.54732L5.14286 6.80625L8.11607
            3.83036L8.57143 3.375L9.47946 4.28571L9.02411 4.74107H9.02679Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_381_5240">
              <rect
                width="12"
                height="12"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
      <span
        class="v-form-checkbox__text"
      >
        <slot />
        <span
          v-if="hasAsterisk"
          class="v-form-checkbox__required"
        >
          *
        </span>
      </span>
    </label>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
.v-form-checkbox
  $root: &

  &__label
    display: flex
    // align-items: center

  &__item-input
    display: flex
    align-items: center
    margin: 10px 0

  &__input
    opacity: 0
    position: absolute
    &[disabled]
      opacity: 0

  &__text
    align-items: center
    cursor: pointer
    display: inline-block
    font-family: 'Avenir'
    font-weight: 400
    font-size: 16px
    position: relative
    color: colors.$gray-80

  &__icon-wrap
    border: solid 1px colors.$black
    border-radius: 2px
    flex-shrink: 0
    width: 16px
    height: 16px
    margin-right: 8px
    position: relative
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    top: 5px
    overflow: hidden

  &__icon
    fill: colors.$primary
    width: 16px
    height: 16px
    opacity: 0
    position: absolute
  &.is--checked
    #{$root}__icon
      opacity: 1
    #{$root}__icon-wrap
      border-color: colors.$primary

  &__required
    color: colors.$red

  &.is--readonly
    pointer-events: none
  &.is--disabled
    pointer-events: none
    #{$root}__icon-wrap
      opacity: .3

  &__input:focus + #{$root}__icon-wrap
    outline: none !important


  &.is--error
    #{$root}__icon-wrap
      border-color: colors.$red
</style>
