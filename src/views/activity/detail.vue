<template>
  <div class="app-container">
    <h2>详情</h2>
    <el-form ref="form" :model="form" label-width="120px" :rules="rule">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入活动标题" />
      </el-form-item>
      <el-form-item label="活动介绍" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="以中文逗号分隔"
        />
      </el-form-item>
      <el-form-item label="报名时间">
        <div style="display:flex">
          <el-date-picker
            v-model="form.enterStartDate"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
          ~
          <el-date-picker
            v-model="form.enterEndDate"
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
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />~
          <el-date-picker
            v-model="form.activityEndDate"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </div>
      </el-form-item>

      <el-form-item label="组织者" prop="holder">
        <el-input v-model="form.holder" />
      </el-form-item>
      <el-form-item label="活动地点" prop="place">
        <el-input v-model="form.place" />
      </el-form-item>
      <el-form-item label="图片" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="onUpload"
          :auto-upload="false"
          :multiple="false"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
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
import upload from "@/utils/upload";

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
          skillTagList: "",
          imageUrl: ''
        };
      }
    }
  },
  data() {
    return {
      rule: {
        title: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入活动内容", trigger: "blur" }
        ],
        holder: [
          { required: true, message: "请输入活动组织者", trigger: "blur" }
        ],
        place: [{ required: true, message: "请输入活动地点", trigger: "blur" }],
        imageUrl: [
          { required: true, message: "请选择图片", trigger: "blur" }
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
    },
    // 保存
    onSave() {
      console.log("保存");
    },
    // 删除
    onDelete() {
      console.log("删除");
    },
    onUpload(e) {
      upload.uploadImg(e, this, 'form', 'imageUrl');
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
