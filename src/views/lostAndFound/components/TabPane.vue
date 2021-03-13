<template>
  <div>
    <el-radio-group v-model="filterType" style="margin: 16px 0px;">
      <el-radio label="all">全部</el-radio>
      <el-radio label="checking">正在审核</el-radio>
      <el-radio label="fail">审核不通过</el-radio>
      <el-radio label="publish">已经发布</el-radio>
    </el-radio-group>
    {{ searchValue }}
    <el-input
      v-model="searchValue"
      placeholder="请输入内容id或物品名称进行模糊搜索"
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
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="物品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地点">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | tagFilter">
            {{ scope.row.status | labelFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="tell" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.tell }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="wechat" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'fail'" type="danger"
            >删除</el-button
          >
          <div v-else-if="scope.row.status === 'checking'">
            <el-button type="success">通过</el-button>
            <el-button type="danger">不通过</el-button>
          </div>
          <div v-else>
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
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
      <h2>详情</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="物品名称">
          <el-input v-model="form.goodsName" />
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="form.place" />
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="物品类别">
          <el-select v-model="form.goodsType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="checking">正在审核</el-radio>
            <el-radio label="fail">审核不通过</el-radio>
            <el-radio label="publish">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Tell">
          <el-input v-model="form.tell" />
        </el-form-item>
        <el-form-item label="wechat">
          <el-input v-model="form.wechat" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { fetchList } from "@/api/lostAndFound";

export default {
  filters: {
    labelFilter(status) {
      const statusMap = {
        publish: "已经发布",
        fail: "审核不通过",
        checking: "正在审核"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        publish: "success",
        fail: "danger",
        checking: "warning"
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
      filterType: "checking",
      form: {
        goodsName: "",
        place: "",
        date: "",
        goodsType: "",
        delivery: false,
        tell: [],
        description: "",
        wechat: "",
        imgPath: "",
        status: "",
        submitor: "",
        submitorId: ""
      },
      isShowDrawer: false,
      searchValue: ""
    };
  },
  // 根据radio选择的过滤的类型
  computed: {
    showData() {
      if (this.filterType === "all") return this.list;
      let filterData = this.list.filter(
        item => item.status === this.filterType
      );
      if (this.searchValue) {
        filterData = filterData.filter(item => {
          const value = `${item.id}${item.goodsName}`;
          return value.match(this.searchValue);
        });
      }
      return filterData;
    }
  },
  created() {
    const routerQuery = this.$router.history.current.query.tab;
    this.getList(routerQuery || "lost");
  },
  methods: {
    // 请求数据
    getList(type) {
      this.loading = true;
      fetchList({ type }).then(response => {
        this.list = response.data.items;
        this.loading = false;
      });
    },
    rowClick(row, column, event) {
      this.isShowDrawer = !this.isShowDrawer;
      console.log(row.id, column, event);
      this.form = row;
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
