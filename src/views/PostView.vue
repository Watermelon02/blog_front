<script setup lang="ts">
import { ref } from "vue";
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";
import { genFileId } from "element-plus";
import router from "@/router";
import { service } from "@/main";
import axios from "axios";
let host = ref(import.meta.env.VITE_HOST);
const uploadRef = ref<UploadInstance>();

const title = ref("");
const subTitle = ref("");
const content = ref("");
const tip = ref("");
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const checkboxGroup = ref(["1"]);
const tags = [
  { name: "生活", id: "1" },
  { name: "安卓", id: "2" },
  { name: "前端", id: "3" },
  { name: "后端", id: "4" },
];
axios.defaults.withCredentials = true;

const uploadImage = async () => {
  uploadRef.value!.submit();
};

async function uploadPassage(
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("subTitle", subTitle.value);
  formData.append("content", content.value);
  formData.append("cover", response);
  for (let i = 0; i < checkboxGroup.value.length; i++) {
    formData.append("tags", checkboxGroup.value[i]);
  }
  service
    .post(`${import.meta.env.VITE_HOST}/passage/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((response) => {
      tip.value = response;
    })
    .then((respongse) => {
      //成功返回主页
      router.push("");
    });
}

const handleError: UploadProps["onError"] = (
  error,
  uploadFile,
  uploadFiles
) => {
  tip.value = error.stack!;
  console.log(error.stack);
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>
<template>
  <div class="background">
    <el-row>
      <el-col :span="12">
        <el-row>
          <span style="margin-right: 10px; margin-left: 10px">标题 : </span>
          <el-input
            v-model="title"
            placeholder=""
            style="width: 200px; margin-bottom: 10px"
          />
        </el-row>
        <el-row
          ><span style="margin-right: 10px">子标题: </span
          ><el-input
            v-model="subTitle"
            placeholder=""
            style="width: 200px; margin-bottom: 10px"
        /></el-row>
        <el-row
          ><span style="margin-right: 10px">分类: </span>
          <div>
            <el-checkbox-group
              v-model="checkboxGroup"
              size="large"
              style="--el-color-primary: #40b882"
            >
              <el-checkbox-button
                v-for="tag in tags"
                :key="tag.id"
                :label="tag.id"
              >
                {{ tag.name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div></el-row
        >
      </el-col>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="upload"
          :with-credentials="true"
          :action="`${host}/image/upload`"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-success="uploadPassage"
          list-type="picture-card"
          style="height: 15vh; margin-bottom: 5vh"
        >
          <template #trigger>
            <el-button type="primary" style="--el-color-primary: #35495e"
              >+</el-button
            >
          </template>

          <template #tip>
            <div class="el-upload__tip">
              {{ tip }}
            </div>
          </template>
        </el-upload>
      </el-col>
    </el-row>

    <v-md-editor v-model="content" height="65vh" />

    <PostButton
      @click="uploadImage"
      style="margin-top: 10px; margin-bottom: 10px"
      class="add-comment-button"
    >
    </PostButton>
  </div>
</template>
<style scoped>
.background {
  backdrop-filter: blur(2px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: 95vh;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  padding: 10px;
}

.add-comment-button {
  position: fixed;
  margin-right: 4px;
  right: 30px;
  z-index: 999;
}
</style>