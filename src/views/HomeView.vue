<script setup lang="ts">

import { onMounted, ref, watch } from "vue";
import Blog from "../components/Blog.vue";
import { Passage, Result } from '../bean/Bean'
import { service } from "@/main";

const currentPage = ref(1)
const result = ref<Result<Array<Passage>>>(new Result(404, 0, []))
const getPassages = async () => {
    console.log(import.meta.env.VITE_HOST)
    let url = `${import.meta.env.VITE_HOST}/passage/select`
    service.get<Result<Array<Passage>>>(url, {
        params: { curPage: currentPage.value }
    }).then(function (response) {
        if (response.status = 200) {
            result.value = response.data
        }
    })
}
onMounted(() => {
    getPassages()
})
watch(currentPage, async (newPage, oldPage) => {
    getPassages()
})
</script>

<template>
    <div class="article-list" >
        <TransitionGroup name="list" tag="ul">
            <Blog v-for="p in result!.data" :data="p" :key="p.passage_id" />
        </TransitionGroup>
        <el-pagination color="#ffffff" background layout="prev, pager, next" :total="result.total/4"
            v-model:currentPage="currentPage" v-if="result!.total>0" />

    </div>
</template>

<style>
.article-list {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>