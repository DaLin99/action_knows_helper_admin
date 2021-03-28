<template>
  <div class="tab-container">
    <!-- 数据图标 -->
    <el-row>
      <pie-chart :opt="chartsData.pieData" />
      <hr>
      <line-chart :opt="chartsData.lineData" />
    </el-row>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
        @click="show(item.key)"
      >
        <keep-alive>
          <tab-pane
            v-if="activeName == item.key"
            :type="item.key"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import { chartsData } from "@/api/lostAndFound";
import { groupBy } from 'lodash'
export default {
  name: "Tab",
  components: { TabPane, PieChart, LineChart },
  data() {
    return {
      tabMapOptions: [
        { label: "失物", key: "lost" },
        { label: "失主", key: "found" }
      ],
      activeName: "lost",
      createdTimes: 0,
      chartsData: {
        pieData: {
          title: {
            text: "丢失物品数据",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: []
          },
          series: [
            {
              name: "丢失",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 335, name: "饭卡" },
                { value: 310, name: "钥匙" },
                { value: 234, name: "课本" },
                { value: 135, name: "耳机" },
                { value: 15, name: "帽子" }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        },
        lineData: {
          title: {
            text: "统计数据图"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["丢失物品", "拾取物品"]
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "丢失物品",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: [12, 13, 10, 14, 9, 23, 21]
            },
            {
              name: "拾取物品",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: [20, 12, 11, 4, 9, 3, 10]
            }
          ]
        }
      }
    };
  },

  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  async mounted() {
    const res = await chartsData()
    this.init(res)
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    show(key) {
      console.log("key:", key);
    },
    init(res) {
      // 饼图
      this.chartsData.pieData.series[0].data = res.data.pieData
      this.chartsData.legend = res.data.pieData.map(i => i.name) || []
      // 折线面积图
      const newDatas = groupBy(res.data.lineData, 'publishDate')
      console.log(newDatas)
      const times = []
      const lost = []
      const found = []
      Object.entries(newDatas || {}).map((arr, index) => {
        lost[index] = 0
        found[index] = 0
        const [key, value] = arr
        times.push(key)
        value.map(itm => {
          if (+itm.type === 0) {
            lost[index] = itm.count;
          } else {
            found[index] = itm.count;
          }
        })
      })

      this.chartsData.lineData.xAxis =
          {
            type: "category",
            boundaryGap: false,
            data: times
          };
      this.chartsData.lineData.series =
          {
            name: "丢失物品",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: lost
          },
      {
        name: "拾取物品",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: found
      }
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
