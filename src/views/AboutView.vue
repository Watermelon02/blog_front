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

<style>

</style>

