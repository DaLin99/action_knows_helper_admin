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
          <span>{{ scope.row.place }}</span>
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
          <el-button
            v-if="scope.row.status === 'fail'"
            type="danger"
            @click="onDelete($event, scope.row.id)"
            >删除</el-button
          >
          <div v-else-if="scope.row.status === 'checking'">
            <el-button
              type="success"
              @click="onPass($event, scope.row.id, true)"
              >通过</el-button
            >
            <el-button
              type="danger"
              @click="onPass($event, scope.row.id, false)"
              >不通过</el-button
            >
          </div>
          <div v-else>
            <el-button type="primary">修改</el-button>
            <el-button type="danger" @click="onDelete($event, scope.row.id)"
              >删除</el-button
            >
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
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="物品名称" prop="goodsName">
          <el-input v-model="form.goodsName" />
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="form.place" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="物品类别" prop="goodsType">
          <el-select v-model="form.goodsType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="checking">正在审核</el-radio>
            <el-radio label="fail">审核不通过</el-radio>
            <el-radio label="publish">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Tell" prop="tell">
          <el-input v-model="form.tell" />
        </el-form-item>
        <el-form-item label="wechat" prop="wechat">
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
/**
 * 对应状态的操作选项
 * 正在审核：通过/不通过
 * 审核不通过：删除
 * 已经发布：删除/修改
 */
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
        tell: "",
        description: "",
        wechat: "",
        imgPath: "",
        status: "",
        submitor: "",
        submitorId: ""
      },
      isShowDrawer: false,
      // 输入框输入搜索内容
      searchValue: "",
      rule: {
        goodsName: [
          { required: true, message: "请输入物品名称", trigger: "blur" }
        ],
        place: [{ required: true, message: "请输入地点", trigger: "blur" }],
        date: [{ required: true, message: "请输入时间", trigger: "blur" }],
        goodsType: [
          { required: true, message: "请选择物品类别", trigger: "blur" }
        ],
        tell: [{ required: true, message: "请输入Tell", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        wechat: [{ required: true, message: "请输入wechat", trigger: "blur" }],
        imgPath: [{ required: true, message: "请输入图片", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }]
      }
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
    // 获取列表信息
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
    // 点击表格的一行
    rowClick(row, column, event) {
      this.isShowDrawer = !this.isShowDrawer;
      console.log(row.id, column, event);
      this.form = { ...row };
    },
    // 修改数据
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
      this.isShowDrawer = false;
      const index = this.list.findIndex(item => item.id === this.form.id);
      console.log(this.list, index, "---");
      this.list[index] = { ...this.form };
    },
    // 点击关闭drawer
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.isShowDrawer = false;
          done();
        })
        .catch(_ => {});
    },
    // 正在审核 - 通过/不通过
    onPass(e, id, checkRes) {
      e.stopPropagation();
      e.preventDefault();
      if (checkRes) {
        console.log("通过", id);
      } else {
        console.log("不通过", id);
      }
    },
    // 点击删除
    onDelete(e, id) {
      e.stopPropagation();
      e.preventDefault();
      console.log("点击删除", id);
    }
  }
};
</script>
