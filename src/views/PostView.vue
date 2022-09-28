<script setup lang="ts">
import { ref } from 'vue';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import axios from 'axios'
import router from '@/router';
const instance = axios.create({
    baseURL: 'http://localhost:8080/passage/',
    timeout: 5000
})
const uploadRef = ref<UploadInstance>()

var cover: string
const title = ref('')
const sub_title = ref('')
const content = ref('')
const tip = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const checkboxGroup = ref(["1"])
const tags = [{ name: '生活', id: "1" }, { name: '安卓', id: "2" }, { name: '前端', id: "3" }, { name: '后端', id: "4" }]

const submitUpload = async() => {
    uploadRef.value!.submit()
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('sub_title', sub_title.value)
    formData.append('content', content.value)
    for(let i = 0;i<checkboxGroup.value.length;i++){
        formData.append('tags', checkboxGroup.value[i])
    }
    instance.post('/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    router.push("/home")
}

const handleError: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
    tip.value = error.stack!
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
    <el-card style="width: 100%;height: 100%;border-radius: 10px" shadow="always">
        <el-row>
            <el-col :span="12">
                <el-input v-model="title" placeholder="" size="large">
                    <template #prepend>标题</template>
                </el-input>
                <el-input v-model="sub_title" placeholder="" size="large">
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
                <el-upload ref="uploadRef" class="upload" action="http://localhost:8080/image/upload"
                    :auto-upload="false" :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
                     :on-error="handleError" list-type="picture-card"
                    style="height: 15vh;margin-bottom: 5vh;">
                    <template #trigger>
                        <el-button type="primary" style="--el-color-primary: #35495E">+</el-button>
                    </template>

                    <template #tip>
                        <div class="el-upload__tip">
                            {{tip}}
                        </div>
                    </template>
                </el-upload>
            </el-col>
        </el-row>

        <v-md-editor v-model="content" height="65vh" />

        <el-button class="ml-3" type="success" @click="submitUpload"
            style="height: 5vh;margin-top: 5vh;background-color: #40B882;">
            发布
        </el-button>
    </el-card>

</template>