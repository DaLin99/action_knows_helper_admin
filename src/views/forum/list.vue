<template>
  <div style="margin:24px">
    <el-input
      v-model="searchValue"
      placeholder="请输入id或标题进行模糊搜索"
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
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publishDate }} </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布者" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.publisher }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="阅读量" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.readNums }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="点赞数" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.thumbNums }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from "@/api/forum";
export default {
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
      searchValue: ""
    };
  },
  // 根据radio选择的过滤的类型
  computed: {
    showData() {
      if (this.searchValue) {
        const filterData = this.list.filter(item => {
          const value = `${item.id}${item.title}`;
          return value.match(this.searchValue);
        });
        return filterData;
      }
      return this.list;
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

    handleDelete(done) {
      this.$confirm("确认删除？")
        .then(_ => {
          this.isShowDrawer = false;
          console.log(done);
          done();
        })
        .catch(_ => {});
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
