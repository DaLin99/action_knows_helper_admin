<template>
  <div style="margin:24px">
    <div class="header-select">
      <el-radio-group v-model="filterType" style="margin: 16px 0px;">
        <el-radio label="all">全部</el-radio>
        <el-radio label="0">已经保存</el-radio>
        <el-radio label="1">已经发布</el-radio>
      </el-radio-group>
      <el-button type="primary" @click="addRecurit"> 新建 </el-button>
    </div>
    <el-input
      v-model="searchValue"
      placeholder="请输入id或岗位类型进行模糊搜索"
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
        width="80"
        fixed
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投递结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.recuritEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="岗位类型"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.jobType }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="岗位责任">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.responsibility.split('。')"
            :key="index"
          >
            <span>{{ index + 1 }}、{{ item }}</span>
          </p>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="工资" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.salary }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮件地址" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.eMail }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作地点" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}-{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布者" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.publisher }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publishDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="查看次数" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.readNums }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="点赞人数" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.thumbUpNums }}</span>
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
import { fetchList } from "@/api/recruit";
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
      filterType: "0",
      form: {
        id: "",
        jobType: "",
        description: "",
        responsibility: "",
        recuritEndDate: "",
        salary: "",
        email: "",
        educationRequire: "",
        skillTagList: "",
        jobDescription: "",
        jobResponsibility: "",
        company: "",
        address: ""
      },
      isShowDrawer: false,
      searchValue: ""
    };
  },
  // 根据radio选择的过滤的类型
  computed: {
    showData() {
      let filterTypeData = [];
      if (this.filterType === "all") {
        filterTypeData = this.list;
      } else {
        filterTypeData = this.list?.filter(
          item => item.status === this.filterType
        );
        console.log("filterTypeData:", filterTypeData);
      }

      if (this.searchValue) {
        const filterData = filterTypeData.filter(item => {
          const value = `${item.id}${item.jodType}`;
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
    addRecurit() {
      console.log("新建");
      this.isShowDrawer = !this.isShowDrawer;

      this.form = {
        jodType: "",
        jodDescription: "",
        jobResponsibility: "",
        jodRequirement: "",
        recuritEndDate: "",
        salary: "",
        eMail: "",
        educationRequirement: "",
        skillTagList: "",
        publishDate: "",
        publisher: "",
        thumbUpNums: "",
        status: "0"
      };
    }
  }
};
</script>
<style scoped>
.header-select {
  color: red;
  display: flex;
  justify-content: space-between;
}
</style>
