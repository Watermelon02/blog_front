<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from "vue";
import Blog from "../components/Blog.vue";
import { Passage, Result } from "../bean/Bean";
import { service } from "/Users/xigua/Desktop/vue/src/main";

const currentPage = ref(1);
const result = ref<Result<Array<Passage>>>(new Result(404, 0, []));
const showTransitionGroup = ref(true);

const getPassages = async () => {
  console.log(import.meta.env.VITE_HOST);
  let url = `${import.meta.env.VITE_HOST}/passage/select`;
  service
    .get<Result<Array<Passage>>>(url, {
      params: { currentPage: currentPage.value },
    })
    .then(function (response) {
      if (response.status === 200) {
        result.value = response.data;
        // 在数据更新后设置 showTransitionGroup 为 false
        showTransitionGroup.value = false;
        // 异步操作（例如 nextTick）将 showTransitionGroup 设置为 true，强制重新渲染 TransitionGroup
        nextTick(() => {
          showTransitionGroup.value = true;
        });
      }
    });
};

onMounted(() => {
  getPassages();
});

watch(currentPage, (newPage, oldPage) => {
  getPassages();
});
</script>

<template>
  <div class="article-list">
    <transition-group v-if="showTransitionGroup" name="fade">
      <Blog v-for="p in result.data" :data="p" :key="p.passageId" />
    </transition-group>
    <el-pagination
      color="#ffffff"
      background
      layout="prev, pager, next"
      :total="result.total"
      :page-size="4"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<style>
.article-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 20px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-leave-active {
  position: absolute;
}
/*移动时的动画效果*/
.fade-move {
  transition: transform 1s ease;
}
</style>
