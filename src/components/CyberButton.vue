<template>
  <div>
    <div class="card cyber-btn">{{ isLoggedIn ? 'Logout' : 'Login' }}</div>
  <a class="cyber-a" href="http://localhost:5173/" target="_blank"
    >watermelon</a
  >
  </div>
</template>

<script lang="ts" setup>

const { isLoggedIn } = defineProps(["isLoggedIn"]);
</script>

<style scoped>
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

.cyber-btn {
  --card-height: 6vh;
  --card-width: calc(var(--card-height) * 2);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}

.card {
  background: linear-gradient(
    var(--rotate),
    #96deda 0%,
    #96deda 0%,
    #50c9c3 74%
  );
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
background: white;
  transition: color 1s,background 1s;
}
.card:hover:before,
.card:hover:after {
  animation: none;
  opacity: 0;
}

.card::before {
  content: "";
  width: 110%;
  height: 114%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate),
    #00cdac 0%,

    #8ddad5 43%
  );
  position: absolute;
  z-index: -1;
  top: -7%;
  left: -5%;
  animation: spin 2.5s linear infinite;
}

.card::after {
  position: absolute;
  content: "";
  top: calc(var(--card-height) / 3);
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  top: 30%;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(calc(var(--card-height) / 6));
  background-image: linear-gradient(
    var(--rotate),
    #00cdac 0%,
    #8ddad5 43%
  );
  border-radius: 10px;
  backdrop-filter: blur(
    2px
  ); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需要调整模糊程度 */
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
</style>
