<template>
  <div>
    <el-table
      key="id"
      :data="showData"
      border
      fit
      highlight-current-row
      type="index"
      style="width: 100%"
    >
      <el-table-column align="center" label="学号/工号" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.cardId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.cardPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="身份类型"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userIdentity }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-container">
      <el-button v-if="showData.length > 0" type="primary" @click="importExcel">
        批量新建
      </el-button>
    </div>
  </div>
</template>
<script>
import { importUser } from "@/api/staff";

export default {
  props: {
    showData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    async importExcel() {
      const { code } = await importUser({
        arr: this.showData
      });
      if (code === 1) {
        this.$message("批量新建成功");
      }
    }
  }
};
</script>
<style scoped>
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;
}
</style>
