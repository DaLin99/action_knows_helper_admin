<template>
  <div class="app-container">
    <h2>详情</h2>
    <el-form ref="form" :model="form" label-width="120px" :rules="rule">
      <el-form-item label="标题" prop="activityTitle">
        <el-input v-model="form.activityTitle" placeholder="请输入活动标题" />
      </el-form-item>
      <el-form-item label="活动介绍" prop="activityContent">
        <el-input
          v-model="form.activityContent"
          type="textarea"
          placeholder="以中文逗号分隔"
        />
      </el-form-item>
      <el-form-item label="报名时间">
        <div style="display:flex">
          <el-date-picker
            v-model="form.enterStartDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
          ~
          <el-date-picker
            v-model="form.enterEndDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </div>
      </el-form-item>
      <el-form-item label="活动时间">
        <div style="display:flex">
          <el-date-picker
            v-model="form.activityStartDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />~
          <el-date-picker
            v-model="form.activityEndDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </div>
      </el-form-item>

      <el-form-item label="组织者" prop="holder">
        <el-input v-model="form.holder" />
      </el-form-item>
      <el-form-item label="活动地点" prop="activityPlace">
        <el-input v-model="form.activityPlace" />
      </el-form-item>
      {{ form.status }}
      <el-form-item>
        <el-button type="primary" @click="onPublish('form')">
          <span v-if="form.status !== '1'">发布</span>
          <span v-else>重新发布</span>
        </el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button
          v-if="form.status !== '1'"
          type="primary"
          @click="onSave('form')"
          >保存</el-button
        >
        <el-button v-if="form.status" type="danger" @click="onDelete"
          >删除</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { publishActivity, delActivity } from "@/api/activity";

export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          activityContent: "",
          activityEndDate: "",
          activityPlace: "",
          activityStartDate: "",
          activityTitle: "",
          enterEndDate: "",
          enterNums: "",
          enterStartDate: "",
          holder: "",
          isCollect: ""
        };
      }
    }
  },
  data() {
    return {
      rule: {
        activityTitle: [
          { required: true, message: "请输入活动标题", trigger: "blur" }
        ],
        activityContent: [
          { required: true, message: "请输入活动内容", trigger: "blur" }
        ],
        holder: [
          { required: true, message: "请输入活动组织者", trigger: "blur" }
        ],
        activityPlace: [
          { required: true, message: "请输入活动地点", trigger: "blur" }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 发布
    async onPublish(ruleForm) {
      this.form.publishDate = dayjs().format("YYYY-MM-DD HH:mm");
      this.form.status = "1";
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          await publishActivity(this.form);
          if (this.form.status === "1") {
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
    async onSave(ruleForm) {
      this.form.publishDate = dayjs().format("YYYY-MM-DD HH:mm");
      this.form.status = "0";
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          if (this.form.id) {
            const res = await publishActivity(this.form);
            if (res.code === 1) {
              this.$message("修改并保存成功!");
            }
          } else {
            const res = await publishActivity(this.form);
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
    // 删除
    async onDelete(id) {
      const res = await delActivity({
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
