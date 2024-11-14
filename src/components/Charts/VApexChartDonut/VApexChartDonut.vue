<script lang="ts" setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

  interface Props {
    data: number[];
    labels: string[];
    fontSize?: string;
    colors?: string[];
    title: string;
  }

const props = withDefaults(defineProps<Props>(), {
  data: [],
  labels: [],
  fontSize: '10px',
  colors: ['#004FFF', '#3DDC97', '#FF7070', '#6F3DFD', '#FFC24D'],
});


const options = computed(() => ({
  chart: {
    fontFamily: 'inherit',
    type: 'donut',
    width: '100%',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '50%',
        labels: {
          value: {
            fontSize: props.fontSize,
          },
        },
      },
    },
  },
  colors: props.colors,
  stroke: {
    width: 0,
  },
  labels: props.labels,
  legend: {
    show: false,
  },
  fill: {
    type: 'false',
  },
}));

</script>

<template>
  <div class="VApexChartDonut v-apex-chart-donut">
    <h3
      v-if="title"
      class="v-apex-chart-donut__title"
    >
      {{ title }}
    </h3>
    <VueApexCharts
      :options="options"
      :series="data"
      type="donut"
    />
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
.v-apex-chart-donut
  display: flex
  align-items: center
  flex-direction: column
  &__title
    margin-bottom: $title-margin-bottom
</style>
