<template>
  <div class="avater-tag" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div class="ring-wrapper">
      <img class="ring_right" src="/ring.svg" />
      <img src="/logo.svg" class="logo" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleMouseOver() {
      // 当鼠标移入时，添加类名以实现效果
      this.$refs.ringWrapper.classList.add("hovered");
    },
    handleMouseLeave() {
      // 当鼠标移出时，移除类名以恢复初始状态
      this.$refs.ringWrapper.classList.remove("hovered");
    },
  },
};
</script>

<style scoped>
@keyframes rotation_right {
  100% {
    transform: rotate(-360deg);
  }
}

.ring-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease-out;
}

.ring_right {
  height: 120px;
  width: 120px;
  animation: rotation_right 20s infinite;
  animation-timing-function: calc();
  position: absolute;
}

.avater-tag {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 添加鼠标悬停时的样式 */
.avater-tag:hover .logo {
  transform: translate(-50%, -50%) scale(1.5);
}

/* 鼠标悬停时给外环添加模糊和发光效果 */
.avater-tag:hover .ring_right {
  filter: blur(5px) brightness(1.5); /* 模糊和发光效果 */
}
</style>
