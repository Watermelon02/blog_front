<script setup lang="ts">
import CyberButton from "./CyberButton.vue";
import githubIcon from "@/assets/github.svg";
import homeIcon from "@/assets/home.svg";
import aboutIcon from "@/assets/about.svg";
import searchIcon from "@/assets/search.svg";
import postIcon from "@/assets/post.svg";
import { user } from "@/main";
import { ref } from "vue";
class Route {
  constructor(public name: string, public route: string, public img: string) {
    this.name = name;
    this.route = route;
    this.img = img;
  }
}
// 根据是否登录来决定是否显示发布按钮
const pagesVisitor = ref<Route[]>([
  new Route("主页", "", homeIcon),
  new Route("关于", "about", aboutIcon),
  new Route("搜索", "search", searchIcon),
]);
const pagesAdmin = ref<Route[]>([
  new Route("主页", "", homeIcon),
  new Route("关于", "about", aboutIcon),
  new Route("搜索", "search", searchIcon),
  new Route("发布", "post", postIcon),
]);
</script>

<template>
  <aside class="side-bar" style="align-items: center">
    <div
      class="blur-content"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <LogoRing />
      <div class="site-info">
        <h4 class="site-name" style="margin-top: 30%; font-weight: bold">
          Watermelon02`s Blog
        </h4>
        <h5 class="self-description" style="color: #bababa">Hello !</h5>
      </div>

      <div class="routes">
        <RouterLink
          to="https://github.com/Watermelon02"
          style="display: inline-flex; margin-top: 1em; margin-bottom: 1em"
        >
          <img
            :src="githubIcon"
            width="20"
            height="20"
            style="margin-right: 2vw"
          />
        </RouterLink>

        <div
          v-if="user == null || user.role !== 'admin'"
          v-for="page in pagesVisitor"
        >
          <RouterLink
            :to="`/${page.route}`"
            style="display: inline-flex; margin-top: 1em; margin-bottom: 1em"
          >
            <img
              :src="page.img"
              width="20"
              height="20"
              style="margin-right: 2vw"
            />{{ page.name }}
          </RouterLink>
        </div>
        <div
          v-if="user != null && user.role === 'admin'"
          v-for="page in pagesAdmin"
        >
          <RouterLink
            :to="`/${page.route}`"
            style="display: inline-flex; margin-top: 1em; margin-bottom: 1em"
          >
            <img
              :src="page.img"
              width="20"
              height="20"
              style="margin-right: 2vw"
            />{{ page.name }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="blur-content">
      <div class="cyber-button-container">
        <CyberButton @click="$emit('login_click')" :isLoggedIn="user != null" />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.side-bar {
  top: 0px;
  position: sticky;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.routes {
  display: flex;
  flex-direction: column;
  flex: 1; /* 占据剩余空间 */
}

.cyber-button-container {
  margin-top: auto; /* 将 CyberButton 推到底部 */
  align-self: center; /* 水平居中 */
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
  width: 100%; /* 让 .blur-content 的宽度占满父容器的宽度 */
}
</style>