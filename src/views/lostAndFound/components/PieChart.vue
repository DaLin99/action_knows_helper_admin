<template>
  <v-chart class="chart" :option="opt" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "HelloWorld",
  components: {
    VChart
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    return {
    };
  },
  computed: {
    titles() {
      return this.pieData.map(i => i.name) || []
    },
    datas() {
      return this.pieData || []
    }
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
