<script setup lang="ts">
import { ref } from 'vue';
import type { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import router from '@/router';
import { service } from '@/main';
import { Upload } from '@element-plus/icons-vue'
import axios from 'axios';
let host = ref(import.meta.env.VITE_HOST)
const uploadRef = ref<UploadInstance>();

const title = ref('');
const subTitle = ref('');
const content = ref('');
const tip = ref('');
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const checkboxGroup = ref(["1"]);
const tags = [{ name: '生活', id: "1" }, { name: '安卓', id: "2" }, { name: '前端', id: "3" }, { name: '后端', id: "4" }];
axios.defaults.withCredentials = true;

const uploadImage = async () => {
    uploadRef.value!.submit()
}

async function uploadPassage(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('subTitle', subTitle.value)
    formData.append('content', content.value)
    formData.append('cover', response)
    for (let i = 0; i < checkboxGroup.value.length; i++) {
        formData.append('tags', checkboxGroup.value[i])
    }
    service.post(`${import.meta.env.VITE_HOST}/passage/post`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch((response) => {
        tip.value = response
    }).then((respongse) => {
        //成功返回主页
        router.push("")
    })
}

const handleError: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
    tip.value = error.stack!
    console.log(error.stack)
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
</script>
<template>
    <el-card style="width: 90%;height: 100%;border-radius: 10px;margin: 16px;" shadow="always">
        <el-row>
            <el-col :span="12">
                <el-input v-model="title" placeholder="" size="large">
                    <template #prepend>标题</template>
                </el-input>
                <el-input v-model="subTitle" placeholder="" size="large">
                    <template #prepend>子标</template>
                </el-input>
                <div>
                    <el-checkbox-group v-model="checkboxGroup" size="large" style="--el-color-primary: #40B882">
                        <el-checkbox-button v-for="tag in tags" :key="tag.id" :label="tag.id">
                            {{ tag.name }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </el-col>
            <el-col :span="12">
                <el-upload ref="uploadRef" class="upload" :with-credentials="true" :action="`${host}/image/upload`"
                    :auto-upload="false" :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
                    :on-error="handleError" :on-success="uploadPassage" list-type="picture-card"
                    style="height: 15vh;margin-bottom: 5vh;">
                    <template #trigger>
                        <el-button type="primary" style="--el-color-primary: #35495E">+</el-button>
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

        <el-button class="ml-3" type="success" @click="uploadImage"
            style="height: 5vh;margin-top: 5vh;background-color: #40B882;">
            发布<el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
    </el-card>

</template>