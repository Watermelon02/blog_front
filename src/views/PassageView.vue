<template>

    <el-card style="margin: 16px;">
        <div style="padding: 32px;">
            <h1 style="color: #40B882;font-weight: 700;">{{ passageResult?.data.title }}</h1>
            <h2>{{ passageResult?.data.subTitle }}</h2>
            <el-row>
                <el-col :span="12">
                    <h2 class="time">{{ passageResult?.data.createTime }}</h2>
                </el-col>
                <el-col :span="12">
                    <h3 class="time">{{ passageResult?.data.updateTime }}</h3>
                </el-col>
            </el-row>
        </div>
        <v-md-preview :text="passageResult?.data.content" />
        <div class="bottom">
            <el-row>
                <el-col v-for="tag in passageResult?.data.tags" :span="24 / passageResult!.data.tags.length">
                    <el-tag size="large" type="danger" v-if="tag != null" style="">{{ tag.name }}
                    </el-tag>
                </el-col>
            </el-row>
            <h5 style="color: #999;">字数:{{ passageResult?.data.content.length }}</h5>
        </div>
        <ul v-infinite-scroll="loadMoreComments" class="infinite-list" style="overflow: auto">
            <li v-for="comment in comments" :key="comment.commentId" class="infinite-list-item"
                style="text-align: left;">

            </li>
        </ul>
    </el-card>
</template>
  
<script setup lang = 'ts'>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import type { Comment, Passage, Result } from '@/bean/Bean';
import { service } from '@/main';

const route = useRoute()
const passageResult = ref<Result<Passage>>()
const currentPage = ref(0)
const comments = ref<Array<Comment>>()
const total = ref(0)
onMounted(async () => {
    fetchPassage()
})
async function fetchPassage() {
    service.get<Result<Passage>>(import.meta.env.VITE_HOST + '/passage/selectById', { params: { passageId: route.query.passageId } }).then(function (response) {
        if (response.status = 200) {
            passageResult.value = response.data
        }
        fetchComment()
    })
}
async function fetchComment() {
    service.get<Result<Array<Comment>>>(import.meta.env.VITE_HOST + '/comment/select', {
        params: { currentPage: currentPage.value, passageId: passageResult.value?.data.passageId }
    }).then((response) => {
        comments.value = response.data.data
    })
}
function loadMoreComments() {
    if (currentPage.value < total.value / 8 || total.value == 0) {
        currentPage.value += 1
        fetchComment()
    }
}
</script>
<style>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
}

.infinite-list {
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    height: 50px;

    margin: 10px;
    color: var(--el-color-primary);
}
</style>