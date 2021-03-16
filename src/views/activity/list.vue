<template>
  <div style="margin:24px">
    <div class="header-select">
      <el-radio-group v-model="filterType" style="margin: 16px 0px;">
        <el-radio label="all">全部</el-radio>
        <el-radio label="save">已经保存</el-radio>
        <el-radio label="publish">已经发布</el-radio>
      </el-radio-group>
      <div>
        <el-button type="primary" @click="addActivity"> 新建 </el-button>
        <el-button
          :loading="downloadLoading"
          type="primary"
          @click="handleDownload"
        >
          导出
        </el-button>
      </div>
    </div>
    <el-input
      v-model="searchValue"
      placeholder="请输入id或活动标题进行模糊搜索"
      prefix-icon="el-icon-search"
      style="margin: 28px 0px;"
    />
    <el-table
      key="id"
      :data="showData"
      border
      fit
      highlight-current-row
      type="index"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="200"
        fixed
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.content.split('。')"
            :key="index"
          >
            <span>{{ index + 1 }}、{{ item }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名时间" width="150">
        <template slot-scope="scope">
          <span
            >{{ scope.row.enterStartDate }} - {{ scope.row.enterEndDate }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动时间" width="150">
        <template slot-scope="scope">
          <span
            >{{ scope.row.activityStartDate }} -
            {{ scope.row.activityEndDate }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动信息" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.holder }}-{{ scope.row.place }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名人数" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.enterNums }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="status" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布信息" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publisher }}{{ scope.row.publishDate }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改的抽屉 -->
    <el-drawer
      :with-header="false"
      :visible="isShowDrawer"
      size="44%"
      :before-close="handleClose"
      :show-close="true"
    >
      <detail :form="form" />
    </el-drawer>
  </div>
</template>

<script>
import { fetchList } from "@/api/activity";
import detail from "./detail";
export default {
  components: { detail },
  props: {
    type: {
      type: String,
      default: "CN"
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      filterType: "save",
      form: {
        id: 1,
        title: "",
        content: "",
        enterStartDate: "",
        enterEndDate: "",
        activityStartDate: "",
        activityEndDate: "",
        educationRequire: "",
        holder: "",
        enterNums: 0,
        publisher: "",
        publishDate: "",
        status: "save",
        place: ""
      },
      emptyForm: {},
      isShowDrawer: false,
      searchValue: "",
      downloadLoading: false
    };
  },
  // 根据radio选择的过滤的类型
  computed: {
    showData() {
      let filterTypeData = [];
      if (this.filterType === "all") {
        filterTypeData = this.list;
      } else {
        filterTypeData = this.list.filter(
          item => item.status === this.filterType
        );
        console.log("filterTypeData:", filterTypeData);
      }

      if (this.searchValue) {
        const filterData = filterTypeData.filter(item => {
          const value = `${item.id}${item.title}`;
          return value.match(this.searchValue);
        });
        return filterData;
      }
      return filterTypeData;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 请求数据
    getList(type) {
      this.loading = true;
      fetchList({ type }).then(response => {
        console.log(response.data);
        this.list = response.data.items;
        this.loading = false;
      });
    },
    rowClick(row, column, event) {
      this.isShowDrawer = !this.isShowDrawer;
      console.log(row.id, column, event);
      this.form = { ...row };
    },
    // 修改数据
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.isShowDrawer = false;

          done();
        })
        .catch(_ => {});
    },
    // 新增活动
    addActivity() {
      this.isShowDrawer = !this.isShowDrawer;

      this.form = {
        title: "",
        content: "",
        enterStartDate: "",
        enterEndDate: "",
        activityStartDate: "",
        activityEndDate: "",
        educationRequire: "",
        holder: "",
        enterNums: 0,
        publisher: "",
        publishDate: "",
        status: "save",
        place: ""
      };
    },
    // TODO:导出excel
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel")
        .then(excel => {
          const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
          const filterVal = [
            "id",
            "title",
            "author",
            "pageviews",
            "display_time"
          ];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          });
          this.downloadLoading = false;
        })
        .catch(err => console.log(err));
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return 2021;
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style scope>
.header-select {
  color: red;
  display: flex;
  justify-content: space-between;
}
</style>
