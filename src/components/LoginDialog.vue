<template>
  <!-- Form -->
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <div class="social-container">
          <a href="#"><img :src="qqIcon" style="visibility: 50%;" width="30" height="30" /></a>
          <a href="#"><img :src="wechatIcon" style="visibility: 50%;" width="30" height="30" /></a>
          <a href="#"><img :src="weiboIcon" style="visibility: 50%;" width="30" height="30" /></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <div class="social-container">
          <a href="#"><img :src="qqIcon" style="visibility: 50%;" width="30" height="30" /></a>
          <a href="#"><img :src="wechatIcon" style="visibility: 50%;" width="30" height="30" /></a>
          <a href="#"><img :src="weiboIcon" style="visibility: 50%;" width="30" height="30" /></a>
        </div>
        <span>or use your account</span>
        <el-form-item label="account">
          <el-input v-model="email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="password" :placeholder="passwordPlaceHolder">
          <el-input v-model="password" autocomplete="off" show-password />
        </el-form-item>
        <a href="#">Forgot your password?</a>

        <el-button @click="login">Sign In</el-button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn" @click="clickSignIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>输入账号和密码以评论、修改个人信息、解锁更多功能</p>
          <button class="ghost" id="signUp" @click="clickSignUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import qqIcon from "@/assets/qq.svg";
import wechatIcon from "@/assets/微信.svg";
import weiboIcon from "@/assets/微博.svg";
import { centerDialogVisible, service, user } from '../main';
import { ElMessage } from 'element-plus';
import { Result, User } from '../bean/Bean';



const signUpButton = ref<HTMLElement | null>(null);
const signInButton = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
  const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const passwordPlaceHolder = ref('')

onMounted(() => {
  signUpButton.value = document.getElementById('signUp');
  signInButton.value = document.getElementById('signIn');
  container.value = document.getElementById('container');

  if (signUpButton.value && signInButton.value && container.value) {
    signUpButton.value.addEventListener('click', () => {
      container.value.classList.add('right-panel-active');
    });

    signInButton.value.addEventListener('click', () => {
      container?.value?.classList.remove('right-panel-active');
    });
  }
});

function login() {
  service.get<Result<User>>(
    import.meta.env.VITE_HOST + '/user/login', {
    params: { email: email.value, password: password.value, rememberMe: true }
  }).then((response) => {
    if (response.data.status == 200) {
      user.value = response.data.data
      localStorage.setItem('user', JSON.stringify(response.data.data))
      centerDialogVisible.value = false;
    } else {
      password.value = ""
      ElMessage.error("登录失败");
    }
  })
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid white;
  background-color: #03c8a8;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #03c8a8 74%;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #89d8d3 0%;
  background: -webkit-linear-gradient(315deg, #03c8a8 74%, #89d8d3 0%);
  background: linear-gradient(315deg, #03c8a8 74%, #89d8d3 0%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
  