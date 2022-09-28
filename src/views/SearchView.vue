<script setup lang="ts">
import type { Passage, Result } from '@/bean/Bean';
import axios from 'axios';
import {  onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const input = ref('')
const currentPage = ref(0)
const passages = ref(new Array<Passage>())
const total = ref(0)
var lastKeyword = ""
const fetchPassagesLike = (keyword: string) => {
    if (keyword != lastKeyword) {
        lastKeyword = keyword
        axios.get<Result<Array<Passage>>>("http://localhost:8080/passage/selectLike", { params: { curPage: currentPage.value, keyword: keyword } })
            .then((response) => {
                total.value = response.data.total
                passages.value = passages.value.concat(response.data.data)
            })
    }
}
const loadPassages = () => {
    if (currentPage.value < total.value / 6 || total.value == 0) {
        currentPage.value += 1
        fetchPassagesLike(input.value)
    }
}
watch(input, (() => {
    if (input.value != '') {
        currentPage.value = 0
        passages.value = new Array<Passage>()
        loadPassages()
    }
}))
onMounted(()=>{
    const keyword = useRoute().query.keyword
    if(keyword!=null){
        input.value = keyword as string
    }
})
function brightenKeyword(val: string, keyword: string) {
    // 方法1：筛选变色
    // val = val + '';
    // if (val.indexOf(keyword) !== -1 && keyword !== '') {
    //     return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
    // } else {
    //     return val
    // }
    // 方法2：用正则表达式
    const Reg = new RegExp(keyword, 'i');
    if (val) {
        const index = val.indexOf(keyword)
        var res: string = val
        //截断过长的文本
        if (index > 100) {
            res = val.substring(index - 50, index + 50)
        }
        res = res.replace(Reg, `<span style="color: #FF3939;">${keyword}</span>`)
        // console.log(res); 
        return res;
    }

}
</script>
<template>
    <el-card style="width: 100%;border-radius: 10px;margin-top: 5vh;" shadow="always">
        <form>
            <input placeholder="请输入关键字" v-model="input" />
            <button class="search-button">
                <img src="@/assets/search.svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </button>
        </form>
    </el-card>
    <Transition>
        <el-card style="width: 100%;border-radius: 10px;margin-top: 20px;" shadow="always" v-if="currentPage!=0">
            <p style="color: #BABABA;">共 {{total}} 个搜索结果</p>
            <ul v-infinite-scroll="loadPassages" class="infinite-list" style="overflow: auto">
                <li v-for="passage in passages" :key="passage.passage_id" class="infinite-list-item"
                    style="text-align: left;">
                    <a :href="'/passage?passage_id='+passage.passage_id">
                        <el-col>
                            <el-row :span="12">
                                <h2 style="color: #35495E;" v-html="brightenKeyword(passage.title,input)"></h2>
                            </el-row>
                            <el-row :span="12">
                                <h3 style="color: #cdcdcd;" v-html="brightenKeyword(passage.content,input)"></h3>
                            </el-row>
                        </el-col>
                    </a>
                </li>
            </ul>
        </el-card>
    </Transition>
</template>
<style scoped>
input {
    width: 95%;
    padding: 10px 10px 10px 10px;
    border: 0;
    outline-color: transparent;
    caret-color: #40B882;
    font-size: 20px;
}

.search-button {
    background-color: transparent;
    border: 0;
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

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.hightLight {
    color: red;
}
</style>