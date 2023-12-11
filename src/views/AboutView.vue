<script lang="ts" setup>
import { ref } from 'vue';

const about_me = ref('')
</script>
<template>
  <div style="display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;margin-top: 30vh;">
    <el-avatar :size="100" src="http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5" />
    <v-md-preview :text="about_me" />
  </div>

</template>

<style scoped>

.blur-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.blur-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 200px;
  background-color: rgba(255, 255, 255, 0.8); /* 设置背景颜色并添加透明度 */
  border-radius: 10px;
  backdrop-filter: blur(2px); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需要调整模糊程度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 添加一些阴影效果，使内容更突出 */
}
</style>

