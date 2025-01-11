<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="three-dots-loading"
  >
    <circle
      cx="-30%"
      cy="50%"
      r="20%"
      fill="currentColor"
    >
      <animate
        id="svgSpinners3DotsBounce0"
        attributeName="cy"
        begin="0;svgSpinners3DotsBounce1.end+0.188s"
        calcMode="spline"
        dur="0.45s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
    <circle
      cx="50%"
      cy="50%"
      r="20%"
      fill="currentColor"
    >
      <animate
        attributeName="cy"
        begin="svgSpinners3DotsBounce0.begin+0.075s"
        calcMode="spline"
        dur="0.45s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
    <circle
      cx="130%"
      cy="50%"
      r="20%"
      fill="currentColor"
    >
      <animate
        id="svgSpinners3DotsBounce1"
        attributeName="cy"
        begin="svgSpinners3DotsBounce0.begin+0.15s"
        calcMode="spline"
        dur="0.45s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
  </svg>
</template>

<style scoped>
.three-dots-loading {
  width: 40px;
  height: 20px;
  display: inline-block;
}
</style>
