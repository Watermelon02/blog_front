<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { Passage } from '../bean/Bean'
const router = useRouter()
const passage = defineProps<{ data: Passage }>()


function pushWithId() {
    router.push({
        name: 'passage',
        query: {
            passageId: passage.data?.passageId
        }
    })
}
</script>

<template>
    <el-card class="blog-card" :body-style="{ padding: '0px' }" shadow="hover">
        <a v-on:click="pushWithId"><img :src="passage.data.cover" class="image" /></a>
        <div style="padding: 14px">
            <a @click="pushWithId">
                <h1>{{ passage.data.title }}</h1>
            </a>
            <h2>{{ passage.data.subTitle }}</h2>
            <el-col>
                <el-row>
                    <el-col :span="12">
                        <h2 class="time">{{ passage.data.createTime }}</h2>
                    </el-col>
                    <el-col :span="12">
                        <h3 class="time">{{ passage.data.updateTime }}</h3>
                    </el-col>
                </el-row>
            </el-col>
            <div class="bottom">
                <el-row>
                    <el-col v-for="tag in passage.data.tags" :span="24 / passage.data.tags!.length">
                        <a :href="'/tagSearch?tagId=' + tag?.tagId">
                            <el-tag size="large" type="danger" v-if="tag != null" style="margin-right: 10px;">{{ tag.name }}
                            </el-tag>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-card>
</template>
  
<style>
.blog-card {
    width: 60vw;
    border-radius: 20px;
    margin-bottom: 5vh;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image {
    width: 60vw;
    height: 25vh;
    display: block;
    object-fit: scale-down;
}
</style>