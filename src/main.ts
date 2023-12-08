import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import type { User } from './bean/Bean'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import ElementPlus from 'element-plus'
export const service = axios.create({
  baseURL: `${import.meta.env.ORIGIN}`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: true,
  timeout: 5000
});
// 添加service对没有登录的拦截器
service.interceptors.response.use(response => {
  let data = response.data
  if (data.status === 200) {
    return response
  }
  if (data.status === 401) {
    window.location.href = '/'
    ElMessage.error('没有登录', this)
  }
  return Promise.reject(data)
}, error => {
  return Promise.reject(error)
})
export const user = ref<User>();
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  if (flag) return true; else return false;
}
export const isMobile = ref(_isMobile())
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

VMdEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

app.use(VMdPreview).use(VMdEditor).use(createPinia()).use(router).use(ElementPlus).mount('#app')
