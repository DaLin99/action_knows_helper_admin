<template>
  <div class="staff-list-container">
    <div v-if="!isShowExcel">
      <div class="header-select">
        <el-radio-group v-model="filterType" style="margin: 16px 0px;">
          <el-radio label="all">全部</el-radio>
          <el-radio label="0">普通学生</el-radio>
          <el-radio label="1">管理员</el-radio>
        </el-radio-group>
        <div>
          <el-button type="primary" @click="addStaff"> 新建 </el-button>
          <el-button @click="importFun"> 导入excel </el-button>
        </div>
      </div>
      <el-input
        v-model="searchValue"
        placeholder="请输入ID或学号/工号进行模糊搜索"
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
        <el-table-column align="center" label="学号/工号">
          <template slot-scope="scope">
            <span>{{ scope.row.cardId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="密码">
          <template slot-scope="scope">
            <span>{{ scope.row.cardPassword }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="微信昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份类别" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.userIdentity | tagFilter">
              {{ scope.row.userIdentity | labelFilter }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="danger" @click="onDelete($event, scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="primary"
              @click="handleModify($event, scope.row.id)"
            >
              修改
            </el-button>
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
    <div v-else>
      <import-excel
        v-if="isShowExcel"
        class="import-excel"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      />
      <staff-table :show-data="excelData" />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { fetchList, deleteUser } from "@/api/staff";
import detail from "./detail";
import importExcel from "./importExcel";
import staffTable from "./staffTable";
export default {
  components: { detail, importExcel, staffTable },

  filters: {
    labelFilter(status) {
      const statusMap = {
        "0": "普通学生",
        "1": "管理员"
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const statusMap = {
        "0": "success",
        "1": "warning"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      searchValue: "",
      list: [],
      loading: false,
      form: {
        id: "",
        cardId: "",
        cardPassword: "",
        nickName: "",
        userAvator: "",
        userIdentity: ""
      },
      filterType: "0",
      isShowDrawer: false,
      isShowExcel: false,
      listObj: {},
      excelData: []
    };
  },
  // 根据radio选择的过滤的类型
  computed: {
    showData() {
      let filterTypeData = [];
      console.log("this.list:", this.list);
      if (this.filterType === "all") {
        filterTypeData = this.list;
      } else {
        filterTypeData = this.list.filter(
          item => item.userIdentity === String(this.filterType)
        );
        console.log("filterTypeData:", filterTypeData);
      }

      if (this.searchValue) {
        const filterData = filterTypeData.filter(item => {
          const value = `${item.id}${item.cardId}`;
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
    getList() {
      this.loading = true;
      fetchList({}).then(response => {
        console.log(response.data);
        this.list = response.data;
        this.loading = false;
      });
    },
    // 点击删除
    onDelete(e, id) {
      this.$confirm("确认删除？")
        .then(async _ => {
          console.log("点击", id);
          const { code } = await deleteUser({ id });
          if (code === 1) {
            this.$message("删除成功");
            this.getList();
          }
        })
        .catch(_ => {});
    },
    // 新增角色
    addStaff() {
      this.isShowDrawer = !this.isShowDrawer;
      this.form = {
        cardId: "",
        cardPassword: "",
        userIdentity: "0"
      };
    },
    // 修改
    handleModify(e, id) {
      this.isShowDrawer = !this.isShowDrawer;
      const index = this.list.findIndex(item => item.id === id);
      this.form = { ...this.list[index] };
    },
    // drawer关闭
    handleClose(done) {
      console.log("关闭1");
      this.$confirm("确认关闭？")
        .then(_ => {
          console.log("关闭12");

          this.isShowDrawer = false;
          this.getList();
          done();
        })
        .catch(_ => {});
    },
    importFun() {
      this.isShowExcel = true;
    },
    handleSuccess(response, file) {
      console.log("file:", file, response);
      this.excelData = response.results;
      console.log(this.excelData);
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      console.log(file, "---");
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function() {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.lastModified,
            width: this.width,
            height: this.height
          };
        };
        resolve(true);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.staff-list-container {
  margin: 24px;
}
.header-select {
  display: flex;
  justify-content: space-between;
}
.import-excel {
  margin-bottom: 24px;
}
</style>
