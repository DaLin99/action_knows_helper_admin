<template>
  <div style="margin:24px">
    <div class="header-select">
      <el-radio-group v-model="filterType" style="margin: 16px 0px;">
        <el-radio label="all">全部</el-radio>
        <el-radio label="0">已经保存</el-radio>
        <el-radio label="1">已经发布</el-radio>
      </el-radio-group>
      <div>
        <el-button type="primary" @click="addActivity"> 新建 </el-button>
        <!-- <el-button
          :loading="downloadLoading"
          type="primary"
          @click="handleDownload"
        >
          导出
        </el-button> -->
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
        fixed
        width="80"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.activityTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <span>{{ scope.row.activityContent }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名时间" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.enterStartDate }} - {{ scope.row.enterEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动时间" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.activityStartDate }} -
            {{ scope.row.activityEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动信息" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.holder }}-{{ scope.row.activityPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | tagFilter">
            {{ scope.row.status | labelFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名人数" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.list.length }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="查看次数" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.readNums }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.list.length !== 0"
            size="small"
            type="primary"
            @click="showEnterDiag($event, scope.row.id)"
          >导出报名单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 报名单 -->
    <el-dialog
      title="是否导出报名单"
      :visible.sync="isShowEnterDiag"
      width="80%"
      :before-close="() => (isShowEnterDiag = false)"
    >
      <el-table
        key="id"
        :data="enterList"
        border
        fit
        highlight-current-row
        type="index"
        style="width: 100%"
      >
        <el-table-column align="center" label="ID" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="学号">
          <template slot-scope="scope">
            <span>{{ scope.row.cardId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="nickName">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEnterDiag = false">取 消</el-button>
        <el-button type="primary" @click="handleDownload">确 定</el-button>
      </span>
    </el-dialog>

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
import { fetchList, downloadExcel } from "@/api/activity";
import detail from "./detail";
export default {
  components: { detail },
  filters: {
    labelFilter(status) {
      const statusMap = {
        "1": "已经发布",
        "0": "已经保存"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        "1": "success",
        "0": "warning"
      };
      return statusMap[status];
    }
  },
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
      filterType: "0",
      form: {
        activityContent: "",
        activityEndDate: "",
        activityPlace: "",
        activityStartDate: "",
        activityTitle: "",
        enterEndDate: "",
        enterNums: "",
        enterStartDate: "",
        holder: "",
        isCollect: "",
        publisher: "",
        readNums: ""
      },
      emptyForm: {},
      isShowDrawer: false,
      searchValue: "",
      downloadLoading: false,
      isShowEnterDiag: false,
      enterList: []
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
        this.list = response.data;
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
          this.getList();
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
        place: ""
      };
    },
    async showEnterDiag(e, id) {
      e.stopPropagation();
      e.preventDefault();
      this.isShowEnterDiag = true;
      const { code, data } = await downloadExcel({ id });
      if (code) {
        this.enterList = data;
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel")
        .then(excel => {
          const tHeader = ["Id", "学号", "昵称"];
          const filterVal = ["userId", "cardId", "nickName"];
          const list = this.enterList;
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
