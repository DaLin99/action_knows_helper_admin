<template>
  <div style="margin:24px">
    <el-radio-group v-model="filterType" style="margin: 16px 0px;">
      <el-radio label="all">全部</el-radio>
      <el-radio label="save">已经保存</el-radio>
      <el-radio label="publish">已经发布</el-radio>
    </el-radio-group>
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
        width="200"
        fixed
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投递结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.recruitEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位责任">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.responsibility.split('。')"
            :key="index"
          >
            <span>{{ index + 1 }}、{{ item }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="工资" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.salary }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮件地址" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作地点" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}-{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布者" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publisher }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publishDate }}</span>
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
      filterType: "save",
      form: {
        jodType: "",
        description: "",
        responsibility: "",
        recuritEndDate: "",
        salary: "",
        email: "",
        educationRequire: "",
        skillTagList: ""
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
        filterTypeData = this.list.filter(
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
    }
  }
};
</script>
