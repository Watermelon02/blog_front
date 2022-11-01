<script setup lang="ts">
import { Tag } from '@/bean/Bean';
import router from '@/router';
import { ref } from 'vue';
const input = ref('')
const tags = [new Tag("生活", 1), new Tag("安卓", 2), new Tag("前端", 3), new Tag("后端", 4)]
function search() {
    const url = router.resolve({
        name: "search",
        query: {
            keyword: input.value
        }
})
 window.open(url.href, '_blank')

}
</script>
    
<template>
    <aside class="side-bar" style="align-items: right;">

        <div class="avater">
            <img src="/logo.svg" width="40" height="40" />
            <img class="ring_right" src="/ring.svg" width="120" height="120" />
        </div>
        <div style="margin-top: 8vh;align-self: start;">
            <h2 class="self-description" style="color: #BABABA;">搜索文章</h2>
        </div>
        <el-card style="width: 100%;border-radius: 10px;margin-top: 2vh;" shadow="always">
            <form>
                <input placeholder="请输入关键字" v-model="input" @keydown.enter="search"/>
                <button class="search-button" @click="search">
                    <img src="/search.svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                </button>
            </form>
        </el-card>
        <div style="margin-top: 8vh;align-self: start;">
            <h2 class="self-description" style="color: #BABABA;">标签</h2>
        </div>
        <div style="display: flex;flex-wrap: wrap;gap: 20px;align-self: start;margin-top: 2vh;">
            <TransitionGroup>
                <el-card class="btn neo" v-for="tag in tags" :key="tag.tag_id"
                    style="border-radius: 20%;background-color: #ffffff;color: #35495E;background-clip: border-box;text-transform: uppercase;border-style: hidden;text-align: center;">
                    <a style="font-weight: bold;font-size:10px;color: #BABABA;" :href="'/tagSearch?tag_id='+tag.tag_id">{{tag.name}}</a>
                </el-card>
            </TransitionGroup>
        </div>
    </aside>
</template>
    
<style>
input {
    height: 2vh;
    width: 80%;
    border: 0;
    outline-color: transparent;
    caret-color: #40B882;
}

.search-button {
    background-color: transparent;
    border: 0;
}

.side-bar {
    top: 0px;
    position: sticky;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.ring_right {
    animation: rotation_right 20s infinite;
    animation-timing-function: calc();
    position: absolute;
}

.avater {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30%;
}

@keyframes rotation_right {
    100% {
        transform: rotate(-360deg);
    }
}

.routes {
    display: flex;
    flex-direction: column;
}

.neo:hover {
    background-color: #40B882;
    -webkit-box-shadow: 10px 10px 99px 6px rgb(146, 249, 138);
    -moz-box-shadow: 10px 10px 99px 6px rgba(146, 249, 138);
    box-shadow: 10px 10px 99px 6px rgba(146, 249, 138);
}
</style>