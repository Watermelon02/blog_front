<template>

    <el-card style="margin: 16px;">
        <div style="padding: 32px;">
            <h1 style="color: #40B882;font-weight: 700;">{{ result?.data.title }}</h1>
            <h2>{{ result?.data.sub_title }}</h2>
            <el-row>
                <el-col :span="12">
                    <h2 class="time">{{ result?.data.create_time }}</h2>
                </el-col>
                <el-col :span="12">
                    <h3 class="time">{{ result?.data.update_time }}</h3>
                </el-col>
            </el-row>
        </div>
        <v-md-preview :text="result?.data.content" />
        <div class="bottom">
            <el-row>
                <el-col v-for="tag in result?.data.tags" :span="24 / result!.data.tags.length">
                    <el-tag size="large" type="danger" v-if="tag != null" style="">{{ tag.name }}
                    </el-tag>
                </el-col>
            </el-row>
            <h5 style="color: #999;">字数:{{result?.data.content.length}}</h5>
        </div>
    </el-card>
</template>
  
<script setup lang = 'ts'>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import type { Passage, Result } from '@/bean/Bean';
import { service } from '@/main';

const route = useRoute()
const result = ref<Result<Passage>>()
onMounted(async () => {
    service.get<Result<Passage>>(import.meta.env.VITE_HOST + '/passage/selectById', { params: { passage_id: route.query.passage_id } }).then(function (response) {
        if (response.status = 200) {
            result.value = response.data
        }
    })
})
</script>
<style>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
}
</style>