<script setup lang="ts">
import CyberButton from "./CyberButton.vue";
import githubIcon from '@/assets/github.svg';
import homeIcon from '@/assets/home.svg';
import aboutIcon from '@/assets/about.svg';
import searchIcon from '@/assets/search.svg';
import postIcon from '@/assets/post.svg';
import { user } from "@/main";
import { ref } from "vue";
class Route {
    constructor(public name: string, public route: string, public img: string) {
        this.name = name
        this.route = route
        this.img = img
    }
}
// 根据是否登录来决定是否显示发布按钮
const pages_visitor = ref<Route[]>([new Route('主页', '', homeIcon), new Route('关于', 'about', aboutIcon), new Route('搜索', 'search', searchIcon)])
const pages_admin = ref<Route[]>([new Route('主页', '', homeIcon), new Route('关于', 'about', aboutIcon), new Route('搜索', 'search', searchIcon), new Route('发布', 'post', postIcon)])
</script>

<template>
    <aside class="side-bar" style="align-items: left;">

        <div class="avater">
            <img src="/logo.svg" width="40" height="40" />
            <img class="ring" src="/ring.svg" width="120" height="120" />
        </div>

        <div class="site-info">
            <h4 class="site-name" style="margin-top: 30%;font-weight: bold;">Watermelon02`s Blog</h4>
            <h5 class="self-description" style="color: #BABABA;">Hello !</h5>
        </div>

        <div class="routes">
            <RouterLink to='https://github.com/Watermelon02'
                style="display: inline-flex;margin-top: 1em;margin-bottom: 1em;"> <img :src="githubIcon" width="20"
                    height="20" style="margin-right: 2vw;" />
            </RouterLink>

            <div v-if="user==null || user.role !== 'admin'" v-for="page in pages_visitor">

                <RouterLink :to="`/${page.route}`" style="display: inline-flex;margin-top: 1em;margin-bottom: 1em;">
                    <img :src="page.img" width="20" height="20" style="margin-right: 2vw" />{{ page.name }}
                </RouterLink>
            </div>
            <div v-if="user!=null && user.role === 'admin'" v-for="page in pages_admin">

                <RouterLink :to="`/${page.route}`" style="display: inline-flex;margin-top: 1em;margin-bottom: 1em;">
                    <img :src="page.img" width="20" height="20" style="margin-right: 2vw" />{{ page.name }}
                </RouterLink>
            </div>
        </div>
        <CyberButton @click="$emit('login_click')" />
    </aside>
</template>

<style>
.side-bar {
    top: 0px;
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.ring {
    animation: rotation 20s infinite;
    animation-timing-function: calc();
    position: absolute;
}

.avater {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30%;
}

@keyframes rotation {
    100% {
        transform: rotate(360deg);
    }
}

.routes {
    display: flex;
    flex-direction: column;
}
</style>