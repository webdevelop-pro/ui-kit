<script setup lang="ts" generic="T extends Record<string, any>">
import type { BaseChartProps } from './index';
import { VChartSingleTooltip, defaultColors } from 'UiKit/components/Base/VChart';
import { Donut } from '@unovis/ts';
import { VisDonut, VisSingleContainer } from '@unovis/vue';
import { useMounted } from '@vueuse/core';
import { type Component, computed, ref } from 'vue';

// yarn add @unovis/ts
// yarn add @unovis/vue

const props = withDefaults(defineProps<Pick<BaseChartProps<T>, 'data' | 'colors' | 'index' | 'margin' | 'showLegend' | 'showTooltip' | 'filterOpacity'> & {
  /**
   * Sets the name of the key containing the quantitative chart values.
   */
  // eslint-disable-next-line no-use-before-define
  category: KeyOfT;
  /**
   * Change the type of the chart
   * @default "donut"
   */
  type?: 'donut' | 'pie';
  /**
   * Function to sort the segment
   */
  sortFunction?:(a: any, b: any) => number | undefined;
  /**
   * Controls the formatting for the label.
   */
  valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;
  /**
   * Render custom tooltip component.
   */
  customTooltip?: Component;
  showCenter?: boolean;
  title?: string;
}>(), {
  margin: () => ({
    top: 0, bottom: 0, left: 0, right: 0,
  }),
  sortFunction: () => undefined,
  valueFormatter: (tick: number) => `${tick}`,
  type: 'donut',
  filterOpacity: 0.2,
  showTooltip: true,
  showLegend: true,
});

type KeyOfT = Extract<keyof T, string>
type Data = typeof props.data[number]

const category = computed(() => props.category);
const index = computed(() => props.index);

const isMounted = useMounted();
const activeSegmentKey = ref<string>();
const colors = computed(() => (props.colors?.length ? props.colors : defaultColors(props.data.filter((d) => d[props.category]).filter(Boolean).length)));
const legendItems = computed(() => props.data.map((item, i) => ({
  name: item[props.index],
  color: colors.value[i],
  inactive: false,
})));

const totalValue = computed(() => props.data.reduce((prev, curr) => prev + curr[props.category], 0));
</script>

<template>
  <div class="VShadcnChartDonut v-shadcn-chart-donut">
    <h3
      v-if="title"
      class="v-shadcn-chart-donut__title"
    >
      {{ title }}
    </h3>
    <VisSingleContainer
      :style="{ height: isMounted ? '100%' : 'auto' }"
      :margin="{ left: 20, right: 20 }"
      :data="data"
    >
      <VChartSingleTooltip
        :selector="Donut.selectors.segment"
        :index="category"
        :items="legendItems"
        :value-formatter="valueFormatter"
        :custom-tooltip="customTooltip"
      />

      <VisDonut
        :value="(d: Data) => d[category]"
        :sort-function="sortFunction"
        :color="colors"
        :arc-width="type === 'donut' ? 20 : 0"
        :show-background="false"
        :central-label="((type === 'donut') && showCenter) ? valueFormatter(totalValue) : ''"
        :events="{
          [Donut.selectors.segment]: {
            click: (d: Data, ev: PointerEvent, i: number, elements: HTMLElement[]) => {
              if (d?.data?.[index] === activeSegmentKey) {
                activeSegmentKey = undefined
                elements.forEach(el => el.style.opacity = '1')
              } else {
                activeSegmentKey = d?.data?.[index]
                elements.forEach(el => el.style.opacity = `${filterOpacity}`)
                elements[i].style.opacity = '1'
              }
            },
          },
        }"
      />

      <slot />
    </VisSingleContainer>
  </div>
</template>

<style lang="scss">
.v-shadcn-chart-donut {
  display: flex;
  flex-direction: column;
}
</style>
