<template>

    <el-card style="height: 90vh;width: 75vw;border-radius: 10px;padding: 0px;display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;margin-top: 5vh;" shadow="always" v-if="result != null">
        <img :src="result?.data.cover" class="image"
            style="height:auto ;width:75vw;display: block;object-fit: cover;margin-top: -10vh;" />
        <div style="padding: 13px;">
            <h1 style="color: #40B882;">{{result?.data.title}}</h1>
            <h2>{{result?.data.sub_title}}</h2>
            <el-col>
                <el-row>
                    <el-col :span="12">
                        <h2 class="time">{{result?.data.create_time}}</h2>
                    </el-col>
                    <el-col :span="12">
                        <h3 class="time">{{result?.data.update_time}}</h3>
                    </el-col>
                </el-row>
            </el-col>
            <div class="bottom">
                <el-row>
                    <el-col v-for="tag in result?.data.tags" :span="24/result!.data.tags.length">
                        <el-tag size="large" type="danger" v-if="tag!=null" style="">{{tag.name}}
                        </el-tag>
                    </el-col>
                </el-row>
                <h5 style="color: #999;">字数:212</h5>
            </div>
        </div>
        <v-md-preview :text="result?.data.content"></v-md-preview>
    </el-card>
</template>
  
<script setup lang = 'ts'>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import axios from "axios";
import type { Passage, Result } from '@/bean/Bean';

const route = useRoute()
const result = ref<Result<Passage>>()
onMounted(async () => {
    axios.get<Result<Passage>>('http://localhost:8080/passage/selectById', { params: { passage_id: route.query.passage_id } }).then(function (response) {
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
    align-items: center;
}
</style>