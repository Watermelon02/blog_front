<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { Passage } from '../bean/Bean'
import { isMobile } from "@/main";
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
    <div class="avater-top" v-if="isMobile">
        <img src="/logo.svg" width="20" height="20" />
        <img class="ring_right" src="/ring.svg" width="60" height="60" />
    </div>
    <el-card :class="isMobile ? 'blog-card-mobile' : 'blog-card-pc'" :body-style="{ padding: '0px' }" shadow="hover">
        <a v-on:click="pushWithId"><img :src="passage.data.cover" :class="isMobile ? 'image-mobile' : 'image-pc'" /></a>
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
                            <el-tag size="large" type="danger" v-if="tag != null" style="margin-right: 10px;">{{
                                    tag.name
                            }}
                            </el-tag>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-card>
</template>
  
<style>
.blog-card-pc {
    width: 60vw;
    border-radius: 20px;
    margin-bottom: 5vh;
}

.blog-card-mobile {
    width: 90vw;
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

.image-pc {
    width: 60vw;
    height: 25vh;
    display: block;
    object-fit: scale-down;
}

.image-mobile {
    width: 90vw;
    height: 25vh;
    display: block;
    object-fit: scale-down;
}

.avater-top {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5vh;
}
</style>