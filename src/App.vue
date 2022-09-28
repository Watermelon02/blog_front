<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import TagBar from './components/TagBar.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
const route = useRoute()
const routerSpan = ref(16)
watch(route, (() => {
  if(route.path =='/passage' || route.path == '/search'|| route.path == '/tagSearch'){
    routerSpan.value =20
  }else{
    routerSpan.value =16
  }
}))
</script>

<template>
  <div style="width: 100vw;max-width: 100%;background-color: #f5f5fa;">
    <el-row>
      <el-col :span="3">
        <SideBar />
      </el-col>
      <el-col :span="routerSpan">
        <RouterView />
      </el-col>
      <el-col :span="4" v-if="route.path!='/search' && route.path!='/passage' && route.path != '/tagSearch'">
        <TagBar />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
nav {
  font-size: 20px;
  position: absolute;
  float: left
}

nav router-link-exact-active {
  color: var(--color-text);
}

nav router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
