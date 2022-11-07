<script setup lang="ts">
import { Tag, type Passage, type Result } from '@/bean/Bean';
import { service } from '@/main';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const currentPage = ref(0)
const passages = ref(new Array<Passage>())
const total = ref(0)
var tagId = '1'
var tagName = ref('')
const tags = [new Tag("生活", 1), new Tag("安卓", 2), new Tag("前端", 3), new Tag("后端", 4)]
const fetchPassagesByTag = () => {
    service.get<Result<Array<Passage>>>(import.meta.env.VITE_HOST + "/passage/selectByTag", { params: { currentPage: currentPage.value, tagId: tagId } })
        .then((response) => {
            total.value = response.data.total
            passages.value = passages.value.concat(response.data.data)
        })
}
function loadPassages() {
    if (currentPage.value < total.value / 6 || total.value == 0) {
        currentPage.value += 1
        fetchPassagesByTag()
    }
}
onMounted(() => {
    tagId = useRoute().query.tagId as string
    for (let i = 0; i < tags.length; i++) {
        if (Number.parseInt(tagId) == tags[i].tagId) {
            tagName.value = tags[i].name
        }
    }
    loadPassages()
})
</script>
<template>
    <h3 style="margin-top: 2vh;">标签：</h3>
    <el-card style="width: 100%;border-radius: 10px;" shadow="always">
        <h1>{{ tagName }}</h1>
    </el-card>
    <Transition>
        <el-card style="width: 100%;border-radius: 10px;margin-top: 20px;" shadow="always" v-if="currentPage != 0">
            <p style="color: #BABABA;">共 {{ total }} 个搜索结果</p>
            <ul v-infinite-scroll="loadPassages" class="infinite-list" style="overflow: auto">
                <li v-for="passage in passages" :key="passage.passageId" class="infinite-list-item"
                    style="text-align: left;">
                    <a :href="'/passage?passageId=' + passage.passageId">
                        <el-col>
                            <el-row :span="12">
                                <h2 style="color: #35495E;">{{ passage.title }}</h2>
                            </el-row>
                            <el-row :span="12">
                                <h3 style="color: #cdcdcd;">{{ passage.subTitle }}</h3>
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