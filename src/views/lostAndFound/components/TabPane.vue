<template>
  <div>
    <el-radio-group v-model="filterType" style="margin: 16px 0px;">
      <el-radio label="all">全部</el-radio>
      <el-radio label="0">正在审核</el-radio>
      <el-radio label="1">已经发布</el-radio>
      <el-radio label="2">审核不通过</el-radio>
    </el-radio-group>
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
        fixed
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="物品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
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
          <span>{{ scope.row.content }}</span>
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
            <el-button type="danger" @click="onDelete($event, scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改的抽屉 -->
    <el-drawer
      style="overflow:auto"
      custom-class="self-drawer111"
      :with-header="false"
      :visible="isShowDrawer"
      size="44%"
      :before-close="handleClose"
      :show-close="true"
    >
      <h2 class="test">详情</h2>
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="物品名称" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="form.place" />
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
            <el-radio label="0">正在审核</el-radio>
            <el-radio label="2">审核不通过</el-radio>
            <el-radio label="1">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.status === '2'"
          label="不通过的原因"
          prop="reason"
        >
          <el-input v-model="form.reason" placeholder="不通过的原因" />
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input v-model="form.content" type="textarea" />
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
      <!-- <div v-for="(item, index) in form.imgPath" :key="index">
        <img :src="item" alt="" />
      </div> -->
    </el-drawer>
  </div>
</template>

<script>
import { fetchList, ok } from "@/api/lostAndFound";
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
        "1": "已经发布",
        "2": "审核不通过",
        "0": "正在审核"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        "1": "success",
        "2": "danger",
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
        title: "",
        place: "",
        time: "",
        type: "",
        tell: "",
        content: "",
        wechat: "",
        imgPath: "",
        status: "",
        submitor: "",
        submitorId: "",
        reason: ""
      },
      isShowDrawer: false,
      // 输入框输入搜索内容
      searchValue: "",
      rule: {
        title: [{ required: true, message: "请输入物品名称", trigger: "blur" }],
        place: [{ required: true, message: "请输入地点", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
        goodsType: [
          { required: true, message: "请选择物品类别", trigger: "blur" }
        ],
        tell: [{ required: true, message: "请输入Tell", trigger: "blur" }],
        content: [{ required: true, message: "请输入描述", trigger: "blur" }],
        wechat: [{ required: true, message: "请输入wechat", trigger: "blur" }],
        imgPath: [{ required: true, message: "请输入图片", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
        reason: [
          { require: true, message: "请输入不通过的原因", trigger: "blur" }
        ]
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
    const routerQuery = this.$router.history.current.query.tab;
    this.getList(routerQuery || "lost");
  },
  methods: {
    // 请求数据
    getList(type) {
      this.loading = true;
      fetchList({ type }).then(response => {
        console.log("response", response);
        this.list = response.data;
        this.loading = false;
        console.log(response.data);
      });
    },
    // 点击表格的一行
    rowClick(row, column, event) {
      this.isShowDrawer = !this.isShowDrawer;
      console.log(row.id, column, event);
      this.form = row;
    },
    // 修改数据
    onSubmit() {
      console.log("submit!");
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
    async onPass(e, id, checkRes) {
      e.stopPropagation();
      e.preventDefault();
      if (checkRes) {
        await ok({ id });
        this.$message("发布成功");
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

<style scoped>
.self-drawer111 {
  overflow: auto !important;
}
</style>
