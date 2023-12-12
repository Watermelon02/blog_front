<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import TagBar from './components/TagBar.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue';
import type { User, Result } from '@/bean/Bean'
import { centerDialogVisible, service, user } from './main';
import { ElMessage } from 'element-plus';
import { isMobile } from "@/main";
import { } from 'vue'

const route = useRoute()
const sideBarSpan = ref(4)
const routerSpan = ref(16)
const tagBarSpan = ref(4)

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const passwordPlaceHolder = ref('')

watch(route, (() => {
  if (route.path == '/passage' || route.path == '/search' || route.path == '/tagSearch') {
    sideBarSpan.value = 4
    routerSpan.value = 19
    tagBarSpan.value = 0
  } else {
    sideBarSpan.value = 4
    routerSpan.value = 16
    tagBarSpan.value = 4
  }
  if (_isMobile()) {
    sideBarSpan.value = 0
    routerSpan.value = 24
    tagBarSpan.value = 0
  }
}))
onMounted(() => {
  const token = localStorage.getItem('user')
  if (token != null) {
    user.value = JSON.parse(token);
  }

})
function callback() {//点击侧边栏CyberButton后的回调,根据是否登录处理不同情况
  if (user.value == null) {
    centerDialogVisible.value = true
  } else {
    service.get<Result<String>>(import.meta.env.VITE_HOST + '/user/logout').then((response) => {
      if (response.data.status == 200) {
        localStorage.removeItem('user')
        ElMessage({ message: '登出成功', type: 'success' })
        // 刷新页面
        window.location.reload();
      } else {
        ElMessage.error('登出失败，还没有登录')
      }
    })
  }
}

function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  if (flag) return true; else return false;
}
</script>

<template>
  <div style="width: 100vw;max-width: 100%;background-color: #f5f5fa;"
    :class="isMobile ? 'background-mobile' : 'background-pc'">
    <el-row>
      <el-col :span="sideBarSpan" v-if="!isMobile">
        <SideBar @login_click="callback" />
      </el-col>
      <el-col :span="routerSpan">
        <RouterView />
      </el-col>
      <el-col :span="tagBarSpan"
        v-if="(route.path != '/search' && route.path != '/passage' && route.path != '/tagSearch' && !isMobile)">
        <TagBar />
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="centerDialogVisible" center style="background:transparent" :show-close="false">
    <LoginDialog></LoginDialog>
  </el-dialog>
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

.background-mobile {
  height: 100vh;
}

.background-pc {
  height: 100%;
}

</style>
