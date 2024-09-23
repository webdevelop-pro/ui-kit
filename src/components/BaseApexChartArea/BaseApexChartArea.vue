<script lang="ts" setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
	
	interface Props {
		data:  number[];
		labels: string[];
		fontSize?: string;
		baseColor?: string;
		labelColor?: string;
		borderColor?: string;
		name?: string;
		title?: string;
	}
	const props = withDefaults(defineProps<Props>(), {
		data: [],
		labels: [],
		fontSize: '10px',
		baseColor: '#FF3B3B', // red-dark
		labelColor: '#ADB5BD', // gray-50
		borderColor: '#DEE2E6', // gray-30
		name: '',
	})

	const series = computed(() => ([
	{
		name: props.name,
		data: props.data,
	},
	]));
	
const options = computed(() => ({
  chart: {
    fontFamily: 'inherit',
    type: 'area',
    width: '100%',
    height: 'auto',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {},
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 80, 100],
    },
  },
  stroke: {
    curve: 'smooth',
    show: true,
    width: 3,
    colors: [props.baseColor],
  },
  xaxis: {
    categories: props.labels,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tickAmount: 6,
    labels: {
      rotate: 0,
      rotateAlways: true,
      style: {
        colors: props.labelColor,
        fontSize: '12px',
      },
    },
    crosshairs: {
      position: 'front',
      stroke: {
        color: props.baseColor,
        width: 1,
        dashArray: 3,
      },
    },
    tooltip: {
      enabled: true,
      formatter: undefined,
      offsetY: 0,
      style: {
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    tickAmount: 4,
    max: 24,
    min: 10,
    labels: {
      style: {
        colors: props.labelColor,
        fontSize: '12px',
      },
    },
  },
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0,
      },
    },
    hover: {
      filter: {
        type: 'none',
        value: 0,
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
        value: 0,
      },
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
    },
  },
  colors: [props.baseColor],
  grid: {
    borderColor: props.borderColor,
    strokeDashArray: 4,
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  markers: {
    strokeColor: props.baseColor,
    strokeWidth: 3,
  },
}));

</script>

<template>
  <div class="base-apex-chart-area">
	<h6
		v-if="title"
		class="base-apex-chart-area__title"
	>
		{{ title }}
	</h6>
    <VueApexCharts
      :options="options"
      :series="series"
      type="area"
    />
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-apex-chart-area
	&__title
		margin-bottom: 10px
		padding-left: 30px
</style>