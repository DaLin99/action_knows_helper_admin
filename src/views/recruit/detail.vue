<template>
  <div class="app-container">
    <h2>详情</h2>
    <el-form ref="form" :model="form" label-width="120px" :rules="rule">
      <el-form-item label="岗位名称" prop="jobType">
        <el-select v-model="form.jobType" placeholder="请选择岗位">
          <el-option
            v-for="(optionItem, index) in jobTypeOptions"
            :key="index"
            :label="optionItem"
            :value="optionItem"
          >
            {{ optionItem }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位描述" prop="jobDescription">
        <el-input
          v-model="form.jobDescription"
          type="textarea"
          placeholder="以中文句号分隔"
        />
      </el-form-item>
      <el-form-item label="岗位责任" prop="jobResponsibility">
        <el-input
          v-model="form.jobResponsibility"
          type="textarea"
          placeholder="以中文逗号分隔"
        />
      </el-form-item>
      <el-form-item label="投递结束时间" prop="recuritEndDate">
        <el-date-picker
          v-model="form.recuritEndDate"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="company">
        <el-input v-model="form.company" placeholder="公司名称" />
      </el-form-item>
      <el-form-item label="工作地点" prop="address">
        <el-input v-model="form.address" placeholder="工作地点" />
      </el-form-item>
      <el-form-item label="工资" prop="salary">
        <el-input v-model="form.salary" />
      </el-form-item>
      <el-form-item label="邮件地址" prop="eMail">
        <el-input v-model="form.eMail" />
      </el-form-item>
      <el-form-item label="学历要求" prop="educationRequirement">
        <el-input v-model="form.educationRequirement" />
      </el-form-item>
      <el-form-item label="技能标签" prop="skillTagList">
        <el-input v-model="form.skillTagList" placeholder="以中文逗号分隔" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <span v-if="form.status === '0'" @click="onPublish('form')"
            >发布</span
          >
          <span v-else @click="onPublish('form')">重新发布</span>
        </el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button
          v-if="form.status === '0'"
          type="primary"
          @click="onSave('form')"
          >保存</el-button
        >
        <el-button v-if="form.id" type="danger" @click="onDelete"
          >删除</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { publishRecruit, deleteRecruit, editRecruit } from "@/api/recruit";
import dayjs from "dayjs";

export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          jodType: "",
          jobDescription: "",
          jobResponsibility: "",
          jobRequirement: "",
          recuritEndDate: "",
          salary: "",
          eMail: "",
          educationRequirement: "",
          skillTagList: "",
          publishDate: "",
          publisher: "",
          thumbUpNums: ""
        };
      }
    }
  },
  data() {
    return {
      jobTypeOptions: ["前端", "后端", "产品", "测试", "运营"],
      rule: {
        jobType: [
          { required: true, message: "请输入岗位类型", trigger: "blur" }
        ],
        jobDescription: [
          { required: true, message: "请输入岗位描述", trigger: "blur" }
        ],
        jobResponsibility: [
          { required: true, message: "请输入岗位责任", trigger: "blur" }
        ],
        recuritEndDate: [
          { required: true, message: "请输入投递结束时间", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入工作地点", trigger: "blur" }
        ],
        salary: [{ required: true, message: "请输入工资", trigger: "blur" }],
        eMail: [
          { required: true, message: "请输入投递简历", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        educationRequirement: [
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 重置
    onReset() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    // 发布
    onPublish(ruleForm) {
      this.form.publishDate = dayjs().format("YYYY-MM-DD HH:mm");
      this.form.status = "1";
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          await publishRecruit(this.form);
          if (this.form.id) {
            this.$message("重新发布成功!");
          } else {
            this.$message("发布成功!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.form);
    },

    // 保存
    onSave(ruleForm) {
      this.form.publishDate = dayjs().format("YYYY-MM-DD HH:mm");
      this.form.status = "0";
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          if (this.form.id) {
            const res = await editRecruit(this.form);
            if (res.code === 1) {
              this.$message("修改并保存成功!");
            }
          } else {
            const res = await publishRecruit(this.form);
            if (res.code === 1) {
              this.$message("保存成功!");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async onDelete() {
      console.log("s");
      const res = await deleteRecruit({
        id: this.form.id
      });
      if (res.code === 1) {
        this.$message("删除成功");
      }
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
