<script setup lang="ts">
import type { Tag } from "@/bean/Bean";
import router from "@/router";
import { ref } from "vue";
const tag = defineProps<{ data: Tag }>();
</script>
    
<template>
  <a
    :href="'/tagSearch?tagId=' + tag.data.tagId"
  >
    <div class="card cyber-btn">
      {{ tag.data.name }}
    </div>
  </a>
</template>
    
<style scoped>
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

.cyber-btn {
  --card-height: 6vh;
  --card-width: calc(var(--card-height) * 4);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}

.card {
  background: transparent;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  width: var(--card-width);
  height: var(--card-height);
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1em;
  color: white;
  cursor: pointer;
  font-family: cursive;
}

.card:hover {
  color: #50c9c3;
  background: linear-gradient(var(--rotate), #ffffff 100%, #5ba585 0%);
  transition: color 1s, background 1s;
}
.card:hover:before,
.card:hover:after {
  animation: none;
  opacity: 0;
}

.card::before {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate),
    #00cdac 0%,

    #8ddad5 50%,
  );
  position: absolute;
  z-index: -1;


  animation: spin 2.5s linear infinite;
}

.card::after {
  position: absolute;
  content: "";
  top: calc(var(--card-height) / 3);

  z-index: -1;
  height: 90%;
  width: 100%;
  top: 10%;
  border-radius: 8px;
  margin: 0 auto;

  filter: blur(calc(var(--card-height) / 6));
  background-image: linear-gradient(

    #00cdac 0%,

    #8ddad5 50%,
    #00cdac 0%
  );
  opacity: 1;
  transition: opacity 0.5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

.cyber-a {
  color: white;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: bold;
  margin-top: 0.25rem;
}

.blur-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 200px;
  background-color: rgba(255, 255, 255, 0.8); /* 设置背景颜色并添加透明度 */
  border-radius: 10px;
  backdrop-filter: blur(
    2px
  ); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需要调整模糊程度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 添加一些阴影效果，使内容更突出 */
}
</style>