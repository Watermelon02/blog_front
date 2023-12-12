<script lang="ts" setup>
import { ElMessage, genFileId } from "element-plus";
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";
import { onMounted, ref, watch } from "vue";
import type { Result, User } from "../bean/Bean";
import { service, user } from "../main";

const editable = ref(false);
const name = ref("");
const title = ref("");
const description = ref("");
const tip = ref("");
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const uploadRef = ref<UploadInstance>();

function clickEdit() {
  if (editable.value) {
    if (name.value != user.value?.name) {
      service
        .get<Result<User>>(import.meta.env.VITE_HOST + "/user/updateName", {
          params: { name: name.value },
        })
        .then((response) => {
          if (response.data.status == 200) {
            user.value = response.data.data;
            localStorage.setItem("user", JSON.stringify(response.data.data));
          } else {
            ElMessage.error("修改用户名称失败");
          }
        });
    }
    localStorage.setItem("description", description.value);
  }
  editable.value = !editable.value;
}
onMounted(() => {
  name.value = user.value?.name || "未登录";
  if (user == null) {
    title.value = "匿名用户";
    description.value = "登录查看更多";
  } else {
    title.value = "CQUPT STUDENT";
    description.value =
      localStorage.getItem("description") || "该用户没有个性签名哦";
  }
});
watch(user, (newUser, oldUser) => {
  name.value = newUser?.name || "未登录";
  if (newUser == null) {
    title.value = "匿名用户";
    description.value = "个人简介";
  } else {
    title.value = "CQUPT STUDENT";
    description.value = "该用户没有个性签名哦";
  }
});

const handleError: UploadProps["onError"] = (
  error,
  uploadFile,
  uploadFiles
) => {
  tip.value = error.stack!;
  console.log(error.stack);
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

async function uploadImage(
  response: string,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) {
  service
    .get<Boolean>(import.meta.env.VITE_HOST + "/user/updateAvatar", {
      params: {
        avatarUrl: response,
      },
    })
    .catch((result) => {
      tip.value = result;
    })
    .then((result) => {
      //成功则改变并存储头像url
      if(user.value!=null ){
        user.value.avatarUrl = response
      }
      localStorage.setItem("user", JSON.stringify(user.value));
    });
}
</script>

<template>
  <div class="center-container">
    <div class="wrapper">
      <div class="top-icons">
        <i class="fas fa-long-arrow-alt-left"></i>
        <i class="fas fa-ellipsis-v"></i>
        <i class="far fa-heart"></i>
      </div>

      <div class="profile">
        <el-upload
          class="avatar-uploader thumbnail"
          ref="uploadRef"
          :with-credentials="true"
          :action="`http://localhost:8080/image/uploadAvatar`"
          :auto-upload="true"
          :limit="1"
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-success="uploadImage"
          list-type="picture-card"
          ><img
            class="avatar"
            :src="
              user?.avatarUrl
                ? user.avatarUrl
                : 'http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5'
            "
        /></el-upload>
        <div class="check"><i class="fas fa-check"></i></div>
        <h3 class="name">{{ name }}</h3>
        <p class="title">{{ title }}</p>
        <p class="description">
          {{ description }}
        </p>
        <ProfileButton @click="clickEdit" v-if="user != null" type="button" />

        <form action="#" v-if="editable">
          <!-- <el-form-item > -->
          <Transition name="fade" appear>
            <input v-model="name" autocomplete="off" />
          </Transition>
          <Transition name="fade" appear>
            <input v-model="description" autocomplete="off" />
          </Transition>
          <!-- </el-form-item>
          <input v-model="password" autocomplete="off"/> -->
        </form>
      </div>
    </div>
  </div>
</template>
  
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background: #eeeeec;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 100%;
}

.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

// ------------------------------------------------

$purple-gradient: linear-gradient(
  45deg,
  rgba(87, 29, 146, 1) 0%,
  rgba(172, 25, 102, 1) 100%
);
$purple-gradient: linear-gradient(to bottom right, #c90a6d, #ff48a0);
$blue1-gradient: linear-gradient(to bottom right, #5e5aec, #3f9efc);
$blue2-gradient: linear-gradient(to bottom right, #6452e9, #639ff9);
$shadow: 0 13px 26px rgba(#000, 0.2), 0 3px 6px rgba(#000, 0.2);

.wrapper {
  width: 320px;
  height: 540px;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: background 0.6s ease;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 8px 40px rgba(#000000, 0.2);

  .top-icons {
    i {
      color: #080911;
      &:nth-of-type(1) {
        float: left;
      }
      &:nth-of-type(2) {
        float: right;
      }
      &:nth-of-type(3) {
        float: right;
        padding-right: 0.8em;
      }
    }
  }
  .profile {
    margin-top: 2.2em;
    position: relative;

    &:after {
      width: 100%;
      height: 1px;
      content: " ";
      display: block;
      margin-top: 1.3em;
      background: #e9eff6;
    }

    .check {
      position: absolute;
      right: 5em;
      bottom: 12.7em;
      i {
        color: #fff;
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 100%;
        background: $purple-gradient;
      }
    }
    .name {
      color: #2d354a;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }

    .title {
      color: #7c8097;
      font-size: 0.75em;
      font-weight: 300;
      text-align: center;
      padding-top: 0.5em;
      padding-bottom: 0.7em;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .description {
      color: #080911;
      font-size: 14px;
      font-weight: 300;
      text-align: center;
      margin-bottom: 1.3em;
    }
  }
}

input {
  background-color: transparent; /* 取消背景色 */
  border: none;
  border-bottom: 1px solid #ccc; /* 添加底边线 */
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: border-bottom-color 0.3s ease; /* 添加颜色过渡效果 */
}

input:focus {
  outline: none;
  border-bottom-color: #03c8a8; /* 输入框获得焦点时底边线颜色变为指定颜色 */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-leave-active,
.fade-enter-active {
  position: 0.5s;
}
/*移动时的动画效果*/
.fade-move {
  transition: transform 0.5s ease;
}
.avatar {
  width: 124px;
  height: 124px;
  margin-right: 24px;
  margin-bottom: 24px;
}

.avatar-uploader {
  height: 124px;
  width: 124px;

  border: 0px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
  background: #000;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.thumbnail {
  width: 124px;
  height: 124px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5em;
  border-radius: 100%;
  box-shadow: $shadow;
}
</style>
  