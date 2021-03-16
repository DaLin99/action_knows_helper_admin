<template>
  <div class="app-container">
    <h2>详情</h2>
    <el-form ref="form" :model="form" label-width="120px" :rules="rule">
      <el-form-item label="身份类型" prop="userIdentify">
        <el-radio v-model="form.userIdentify" :label="0">普通学生</el-radio>
        <el-radio v-model="form.userIdentify" :label="1">团学干部</el-radio>
        <el-radio v-model="form.userIdentify" :label="2">管理员</el-radio>
      </el-form-item>

      <el-form-item label="学号/工号" prop="cardId">
        <el-input v-model="form.cardId" placeholder="学号/工号" />
      </el-form-item>
      <el-form-item label="登录密码" prop="cardPassword">
        <el-input v-model="form.cardPassword" placeholder="登录密码" />
      </el-form-item>
      <el-form-item v-if="form.id" label="微信昵称" prop="nickName">
        <el-input v-model="form.nickName" disabled />
      </el-form-item>
      <el-form-item v-if="form.id">
        <el-button type="primary" @click="modify(form.id)">
          修改
        </el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="addPerson(form.id)">
          新增
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          jodType: "",
          description: "",
          responsibility: "",
          recuritEndDate: "",
          salary: "",
          email: "",
          educationRequire: "",
          skillTagList: ""
        };
      }
    }
  },
  data() {
    return {
      rule: {
        cardId: [
          { required: true, message: "请输入学号/工号", trigger: "blur" }
        ],
        cardPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        userIdentify: [
          { required: true, message: "请输入身份类型", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {
    // 从列表点进来要初始化
  },
  methods: {
    // 提交
    addPerson() {
      // 验空 格式 post
      this.$message("submit!");
    },

    // 重新发布
    modify() {
      console.log("重新发布");
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
