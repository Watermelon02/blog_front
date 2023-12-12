<script setup lang="ts">
import { Tag } from "@/bean/Bean";
import router from "@/router";
import { ref } from "vue";
const input = ref("");
const tags = [
  new Tag("Life", 1),
  new Tag("Android", 2),
  new Tag("FrontEnd", 3),
  new Tag("BackEnd", 4),
];
function search() {
  const url = router.resolve({
    name: "search",
    query: {
      keyword: input.value,
    },
  });
  window.open(url.href, "_blank");
}
</script>
    
<template>
  <aside class="side-bar" style="align-items: right">
    <div class="blur-content">
      <LogoRing />
    </div>
    <div class="blur-content">
      <h2 class="self-description">搜索文章</h2>
      <form>
        <el-input
          placeholder="请输入关键字"
          v-model="input"
          @keydown.enter="search"
          style="width: 80%"
        /><button class="search-button" @click="search">
          <img
            src="/search.svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </button>
      </form>
    </div>

    <div class="blur-content">
      <h2 class="self-description">标签</h2>
        <TagButton v-for="tag in tags" :data="tag" :key="tag.tagId"></TagButton>
    </div>
  </aside>
</template>
    
<style scoped>
.self-description {
  color: #bababa;
  text-align: left;
  width: 100%;
  margin-left: 20px;
}
input {
  height: 2vh;
  width: 80%;
  border: 0;
  outline-color: transparent;
  caret-color: #40b882;
}

.search-button {
  background-color: transparent;
  border: 0;
}

.side-bar-tag {
  top: 0px;
  position: sticky;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.routes {
  display: flex;
  flex-direction: column;
}

.blur-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 竖直居中 */
  gap: 20px;
  padding-top: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: transparent;
  border-radius: 10px;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>