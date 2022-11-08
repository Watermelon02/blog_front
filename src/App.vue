<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import TagBar from './components/TagBar.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue';
import type { User, Result } from '@/bean/Bean'
import { service, user } from './main';
import { ElMessage } from 'element-plus';
import { isMobile } from "@/main";
import { } from 'vue'

const route = useRoute()
const sideBarSpan = ref(3)
const routerSpan = ref(16)
const tagBarSpan = ref(4)
const centerDialogVisible = ref(false)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const passwordPlaceHolder = ref('')

watch(route, (() => {
  if (route.path == '/passage' || route.path == '/search' || route.path == '/tagSearch') {
    sideBarSpan.value = 3
    routerSpan.value = 20
  } else {
    sideBarSpan.value = 3
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
    user.value = JSON.parse(token)
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
      } else {
        ElMessage.error('登出失败，还没有登录')
      }
    })
  }
}

function login() {
  service.get<Result<User>>(
    import.meta.env.VITE_HOST + '/user/login', {
    params: { email: email.value, password: password.value, rememberMe: true }
  }).then((response) => {
    if (response.data.status == 200) {
      user.value = response.data.data
      localStorage.setItem('user', JSON.stringify(response.data.data))
      centerDialogVisible.value = false
    } else {
      password.value = ""
      ElMessage.error("登录失败")
    }
  })
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
  <el-dialog v-model="centerDialogVisible" title="登录" width="30%" center>
    <el-form-item label="account">
      <el-input v-model="email" autocomplete="off" />
    </el-form-item>
    <el-form-item label="password" :placeholder="passwordPlaceHolder">
      <el-input v-model="password" autocomplete="off" show-password />
    </el-form-item>
    <el-row>
      <el-col :span="21">
        <el-button type="success" style="margin-top: 10px;" @click="login">login</el-button>
      </el-col>
      <el-col :span="3">
        <el-switch v-model="rememberMe" />
      </el-col>
    </el-row>
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
