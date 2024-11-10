<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	show: boolean,
	opaque?: boolean,
	full?: boolean,
	small?: boolean,
}>();

const svgViewBox = computed(() => {
	if (props.small) {
		return '21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381';
	}
	return '22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715';
});

const circleSizeAttrs = computed(() => {
	if (props.small) {
		return {
			cx: 43.80952380952381,
			cy: 43.80952380952381,
			strokeWidth: 3.8095238095238093,
		};
	}
	return {
		cx: 45.714285714285715,
		cy: 45.714285714285715,
		strokeWidth: 5.714285714285714,
	};
});

</script>
<template>
  <transition
    name="fade"
  >
    <div
      v-show="props.show"
      class="BaseSpinner spinner"
      :class="{ 'is--opaque': props.opaque, 'is--full': props.full, 'is--small': props.small, }"
    >
      <!-- eslint-disable vuejs-accessibility/aria-props -->
      <div
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-progressbar-name="progressbar"
        aria-label="Base Spinner"
        class="spinner__container"
      >
        <!-- eslint-enable -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="svgViewBox"
          style="transform: rotate(0deg);"
        >
          <circle
            fill="transparent"
            r="20"
            stroke-dasharray="125.664"
            stroke-dashoffset="125.66370614359172px"
            class="spinner__overlay"
            v-bind="circleSizeAttrs"
          />
        </svg>
        <div class="spinner__info" />
      </div>
    </div>
  </transition>
</template>

<style lang="sass" scoped>
.spinner
	position: absolute
	width: 100%
	height: 100%
	top: 0
	bottom: 0
	left: 0
	right: 0
	content: ''
	z-index: 9999
	display: flex
	align-items: center
	justify-content: center
	color: #343D45
	&.is--opaque
		background-color: #fff
	&.is--full
		position: fixed
	&.is--small &__container
		height: 23px
		width: 23px
		svg
			circle
				stroke-width: 3.8095238095238093
	&__container
		position: relative
		display: inline-flex
		vertical-align: middle
		justify-content: center
		align-items: center
		height: 32px
		width: 32px
	&__info
		align-items: center
		display: flex
		justify-content: center
	svg
		animation: progress-circular-rotate 1.4s linear infinite
		transform-origin: center center
		transition: all 0.2s ease-in-out
		width: 100%
		height: 100%
		margin: auto
		position: absolute
		top: 0
		bottom: 0
		left: 0
		right: 0
		z-index: 0
		circle
			stroke-width: 5.714285714285714
	&__overlay
		animation: progress-circular-dash 1.4s ease-in-out infinite
		stroke-linecap: round
		stroke-dasharray: 80, 200
		stroke-dashoffset: 0
		stroke: currentColor
		z-index: 2
		transition: all 0.6s ease-in-out

@keyframes progress-circular-dash
	0%
		stroke-dasharray: 1, 200
		stroke-dashoffset: 0px
	
	50%
		stroke-dasharray: 100, 200
		stroke-dashoffset: -15px
	
	100%
		stroke-dasharray: 100, 200
		stroke-dashoffset: -125px

@keyframes progress-circular-rotate
	100%
		transform: rotate(360deg)

.fade-enter-active,
.fade-leave-active
	transition: opacity .3s
.fade-enter-from,
.fade-leave-to
	opacity: 0 !important
</style>
