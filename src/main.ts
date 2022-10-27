import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import type {User} from './bean/Bean'

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
export const service = axios.create({ baseURL: `http://${import.meta.env.BASE_URL}`, headers:{
  'Content-Type': "application/json;charset=utf-8",
  'Access-Control-Allow-Credentials':"true",
  'crossDomain': 'true'
},withCredentials: true, timeout: 5000 })
export let user = ref<User>() ;

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

VMdEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

app.use(VMdPreview)
app.use(VMdEditor);
app.use(createPinia())
app.use(router)

app.mount('#app')
