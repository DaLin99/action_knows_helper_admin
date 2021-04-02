<template>
  <div>
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
      <el-form-item label="物品类别" prop="lostType">
        <el-select v-model="form.lostType" placeholder="请选择活动区域">
          <el-option
            v-for="(item,lostIndex) in lostTypeList"
            :key="item"
            :label="item"
            :value="lostIndex + ''"
          />
        </el-select>
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
      <el-form-item label="图片" prop="imgPath">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="onUpload"
          :auto-upload="false"
          :multiple="false"
        >
          <img v-if="form.imgPath" :src="form.imgPath" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="form.status === '0'">
        <el-button type="success" @click="onPass('form')">通过</el-button>
        <el-button type="danger" @click="onReject(form.id)">不通过 </el-button>
      </el-form-item>
      <el-form-item v-else-if="form.status === '1'">
        <el-button
          type="primary"
          @click="onPublish('form')"
        >修改发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button v-if="form.imgPath" type="danger" @click="onResetImg">重新上传图片</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="danger" @click="onDelete()">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import dayjs from "dayjs";
import upload from "@/utils/upload";

import {
  publishLostAndFound,
  approve,
  deleteLostAndFound
} from "@/api/lostAndFound";
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
          imageUrl: ""
        };
      }
    }
  },
  data() {
    return {
      rule: {
        title: [{ required: true, message: "请输入物品名称", trigger: "blur" }],
        place: [{ required: true, message: "请输入地点", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
        lostType: [
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
      },
      lostTypeList: ["日用品", "学习书籍", "衣物", "电子产品", "其他"]

    };
  },
  created() {
    console.log("os", this.isShowDrawer);
  },
  methods: {
    // 修改发布
    async onPublish(ruleForm) {
      this.form.publishDate = dayjs().format("YYYY-MM-DD HH:mm");
      this.form.status = "1";
      this.form.type = "lost";

      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          const { code } = await publishLostAndFound(this.form);
          if (code === 1) {
            this.$message("修改发布成功");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 通过
    async onPass(ruleForm) {
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          await approve(this.form);
          if (this.form.id) {
            this.$message("修改发布成功!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 不通过
    async onReject(id) {
      this.$emit("showDiag", id);
    },
    // 删除
    async onDelete() {
      const { code } = await deleteLostAndFound({
        id: this.form.id
      });
      if (code === 1) {
        this.$message("审核不通过");
      }
    },
    onUpload(e) {
      upload.uploadImg(e, this, "form", "imgPath");
    },
    // 删除照片
    onResetImg() {
      this.form.imgPath = ''
    }
  }
};
</script>
<style scoped>
.avatar{
  width: 50%;
  height: 50%;
  margin:0px 60px 20px 60px ;
}
</style>
