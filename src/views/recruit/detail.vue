<template>
  <div class="app-container">
    <h2>详情</h2>
    <el-form ref="form" :model="form" label-width="120px" :rules="rule">
      <el-form-item label="岗位名称" prop="jodType">
        <el-select v-model="form.jodType" placeholder="请选择岗位">
          <el-option label="前端" value="qianduan" />
          <el-option label="后端" value="houduan" />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="以中文句号分隔"
        />
      </el-form-item>
      <el-form-item label="岗位责任" prop="responsibility">
        <el-input
          v-model="form.responsibility"
          type="textarea"
          placeholder="以中文逗号分隔"
        />
      </el-form-item>
      <el-form-item label="投递结束时间" prop="recuritEndDate">
        <el-date-picker
          v-model="form.recruitEndDate"
          type="date"
          placeholder="选择时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="工资" prop="salary">
        <el-input v-model="form.salary" />
      </el-form-item>
      <el-form-item label="邮件地址" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="学历要求" prop="educationRequire">
        <el-input v-model="form.educationRequire" />
      </el-form-item>
      <el-form-item label="技能标签" prop="skillTagList">
        <el-input v-model="form.skillTagList" placeholder="以中文逗号分隔" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          <span v-if="form.statue === 'save'">发布</span>
          <span v-else>重新发布</span>
        </el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button type="danger" @click="onDelete">删除</el-button>
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
        jodType: [
          { required: true, message: "请输入岗位类型", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入岗位描述", trigger: "blur" }
        ],
        responsibility: [
          { required: true, message: "请输入岗位责任", trigger: "blur" }
        ],
        recuritEndDate: [
          { required: true, message: "请输入投递结束时间", trigger: "blur" }
        ],
        salary: [{ required: true, message: "请输入工资", trigger: "blur" }],
        email: [{ required: true, message: "请输入投递简历", trigger: "blur" }],
        educationRequire: [
          { required: true, message: "请输入岗位学历要求", trigger: "blur" }
        ],
        skillTagList: [
          { required: true, message: "请输入岗位技能要求", trigger: "blur" }
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
    onSubmit() {
      // 验空 格式 post
      this.$message("submit!");
    },
    // 重置
    onReset() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    // 重新发布
    onRePublish() {
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
