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
      <el-table-column
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
    </el-table>
    <el-button v-if="showData.length > 0" type="primary">
      修改
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    showData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
