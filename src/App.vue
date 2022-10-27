<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import TagBar from './components/TagBar.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
import type { User, Result } from '@/bean/Bean'
import { service, user } from './main';
import { replace } from 'lodash';
import router from './router';
const route = useRoute()
const routerSpan = ref(16)

watch(route, (() => {
  if (route.path == '/passage' || route.path == '/search' || route.path == '/tagSearch') {
    routerSpan.value = 20
  } else {
    routerSpan.value = 16
  }
}))
function callback() {//点击侧边栏CyberButton后的回调
  if (user.value == null) {
    centerDialogVisible.value = true
  } else {
    if (user.value.role == "admin") {
      router.push({
        name: 'post'
      })
    } else {
      router.push({
        name: 'logout'
      })
    }
  }
}
const centerDialogVisible = ref(false)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const passwordPlaceHolder = ref('')
function login() {
  service.get<Result<User>>(
    import.meta.env.VITE_HOST + '/user/login', {
    params: { email: email.value, password: password.value, rememberMe: true }
  }).then((response) => {
    if (response.data.status == 200) {
      user.value = response.data.data
      centerDialogVisible.value = false
    } else {
      password.value = ""
      passwordPlaceHolder.value = "登录失败"
    }
  })
}
</script>

<template>
  <div style="width: 100vw;max-width: 100%;background-color: #f5f5fa;">
    <el-row>
      <el-col :span="3">
        <SideBar @login_click="callback" />
      </el-col>
      <el-col :span="routerSpan">
        <RouterView />
      </el-col>
      <el-col :span="4" v-if="route.path!='/search' && route.path!='/passage' && route.path != '/tagSearch'">
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
</style>
