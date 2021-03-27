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
          {{ scope.row.status }}
          <el-button
            v-if="scope.row.status === '2'"
            type="danger"
            @click="onDelete($event, scope.row.id)"
            >删除</el-button
          >
          <div v-else-if="scope.row.status === '0'">
            <el-button
              type="success"
              @click="onPass($event, scope.row.id, true)"
              >通过</el-button
            >
            <el-button
              type="danger"
              @click="handleRejectByList($event, scope.row.id)"
              >不通过
            </el-button>
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
      <detail :form="form" @showDiag="showDiag"
    /></el-drawer>

    <!-- 写原因的弹窗 -->
    <el-dialog
      title="请填写原因"
      :visible.sync="dialogVisible"
      :before-close="
        () => {
          dialogVisible = false;
        }
      "
    >
      <el-input v-model="dialogReason" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determineReject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  approve,
  reject,
  deleteLostAndFound
} from "@/api/lostAndFound";
import detail from "./Detail";
/**
 * 对应状态的操作选项
 * 正在审核：通过/不通过
 * 审核不通过：删除
 * 已经发布：删除/修改
 */
export default {
  components: { detail },
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
      dialogVisible: false,
      dialogReason: "",
      dialogRejectId: ""
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
      console.log(type);
      fetchList().then(response => {
        console.log("response", response);
        this.list = response.data.filter(item => item.type === this.type);
        this.loading = false;
        console.log(response.data);
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
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 点击关闭drawer
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.isShowDrawer = false;
          this.getList();
          done();
        })
        .catch(_ => {});
    },
    // 正在审核 - 通过
    async onPass(e, id, checkRes) {
      e.stopPropagation();
      e.preventDefault();
      if (checkRes) {
        const { code } = await approve({ id });
        if (code) {
          this.$message("发布成功");
          this.getList();
        }
      } else {
        const { code } = await reject({ id, reason: this.form.reason });
        if (code) {
          this.$message("不发布");
          this.getList();
        }
      }
    },
    // 点击表格的不通过（有弹窗出现）
    handleRejectByList(e, id) {
      e.stopPropagation();
      e.preventDefault();
      this.dialogVisible = true;
      this.dialogRejectId = id;
    },
    // 点击弹窗的确定
    async determineReject() {
      const { code } = await reject({
        id: this.dialogRejectId,
        reason: this.dialogReason
      });
      if (code) {
        this.dialogVisible = false;
        this.$message("不发布");
        this.getList();
      }
    },
    showDiag(id) {
      this.dialogVisible = true;
      this.dialogRejectId = id;
      console.log("diani");
    },
    // 点击删除
    async onDelete(e, id) {
      e.stopPropagation();
      e.preventDefault();
      const { code } = await deleteLostAndFound({
        id
      });
      if (code === 1) {
        this.$message("删除成功");
        this.getList();
      }
    }
  }
};
</script>

<style scoped>
.self-drawer111 {
  overflow: auto !important;
}
</style>
