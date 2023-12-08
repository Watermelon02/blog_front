<script setup lang="ts">

import { onMounted, ref, watch } from "vue";
import Blog from "../components/Blog.vue";
import { Passage, Result } from '../bean/Bean'
import { service } from "/Users/xigua/Desktop/vue/src/main";

const currentPage = ref(1)
const result = ref<Result<Array<Passage>>>(new Result(404, 0, []))
const getPassages = async () => {
    console.log(import.meta.env.VITE_HOST)
    let url = `${import.meta.env.VITE_HOST}/passage/select`
    service.get<Result<Array<Passage>>>(url, {
        params: { currentPage: currentPage.value }
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

const beforeEnter = (el) => {
    console.log('Before Enter', el);
};
const enter = (el, done) => {
    console.log('Enter', el);
    done();
};
const leave = (el, done) => {
    console.log('Leave', el);
    done();
};
const afterLeave = (el) => {
    console.log('After Leave', el);
};

</script>

<template>
    <div class="article-list">
        <TransitionGroup name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave" @after-leave="afterLeave">
            <Blog v-for="p in result!.data" :data="p" :key="p.passageId" />
        </TransitionGroup>
        <el-pagination color="#ffffff" background layout="prev, pager, next" :total="result.total/4"
            v-model:currentPage="currentPage" v-if="result!.total > 0" />

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


.fade-enter-from,.fade-leave-to{
  opacity: 0;
  transform: translateY(50%);
}
.fade-enter-from{
  opacity: 0;
  transform: translateY(50%);
}
.fade-enter-active,.fade-leave-active{
  transition:all 1s ease
}
.fade-leave-active {
  position: absolute;
}
/*移动时的动画效果*/
.fade-move { 
  transition:transform 1s ease;
}
</style>