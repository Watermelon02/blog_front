<template>
  <div class="comment blur-content">
    <transition-group name="fade">
      <div
        class="comment-body"
        v-for="(item, index) in comments"
        :key="item.id + '' + index"
      >
        <!-- 一级评论 -->
        <div class="first-comment">
          <el-avatar :size="40" :src="item.avatarUrl"></el-avatar>
          <div class="content">
            <!-- 一级评论用户昵称 -->
            <h3>{{ item.username }}</h3>
            <!-- 一级评论发布时间 -->
            <span>{{ item.date }}</span>
            <!-- 一级评论评论内容 -->
            <p>{{ item.content }}</p>
            <!-- 一级评论评论点赞 -->
            <div class="comment-right">
              <TrophyButton
                @click="giveALike(item, item.id)"
                :class="item.favour.includes(userId) ? 'active' : ''"
                :data="item.favour.length"
              />
              <ReplyButton @click="isShowSecReply(item.id)" />
              <DeleteCommentButton
                @click="deleteComment(item.id, undefined)"
                v-if="userId === item.userId"
              />
            </div>
            <!-- 回复一级评论 -->
            <Transition name="fade">
            <div class="reply-comment" v-show="isShowSec === item.id">
              <el-input
                :placeholder="placeholderText"
                class="input"
                v-model.trim="replyContext"
                :maxlength="contentLength"
              ></el-input>
              <AddCommentButton @click="addComment(item.id, item.username)" />
            </div>
          </Transition>
            <!-- 次级评论 -->
            <div
              class="second-comment"
              v-for="(reply, index) in item.replyInfo"
              :key="reply.id + '' + index"
            >
              <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
              <el-avatar :size="40" :src="reply.avatarUrl"></el-avatar>
              <div class="content">
                <!-- 次级评论用户昵称 -->
                <h3>{{ reply.username }}</h3>
                <!-- 次级评论评论时间 -->
                <span>{{ reply.date }}</span>
                <span class="to_reply">{{ reply.username }}</span>
                回复
                <span class="to_reply">{{ reply.replyName }}</span
                >:
                <p>{{ reply.content }}</p>
                <!-- 次级评论评论点赞 -->
                <div class="comment-right">
                  <TrophyButton
                    @click="giveALike(reply, item.id)"
                    :class="reply.favour.includes(userId) ? 'active' : ''"
                    :data="item.favour.length"
                  />
                  <ReplyButton @click="isShowSecReply(reply.id)" />
                  <DeleteCommentButton
                    @click="deleteComment(item.id, reply.id)"
                    v-if="userId === reply.userId"
                  />
                </div>
                <Transition name="fade">
                <div class="reply-comment" v-show="isShowSec === reply.id">
                  <el-input
                    :placeholder="placeholderText"
                    class="input"
                    v-model.trim="replyContext"
                    :maxlength="contentLength"
                  ></el-input>
                  <AddCommentButton
                    @click="addComment(item.id, reply.username)"
                  />
                  >
                </div>
              </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <!-- 暂无评论的空状态 -->
    <el-empty
      :description="emptyText"
      v-show="comments.length === 0"
    ></el-empty>
    <div class="comment-header">
      <el-tooltip
        class="item"
        effect="dark"
        content="点我更换头像"
        placement="top-start"
      >
        <div @click="handleClick">
          <input
            type="file"
            style="display: none"
            @change="dealWithdAvatar"
            ref="avatar"
          />
          <el-avatar
            :src="
              avatarUrl
                ? avatarUrl
                : 'http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5'
            "
            :size="40"
          ></el-avatar>
        </div>
      </el-tooltip>
      <el-input
        :placeholder="placeholderText"
        v-model="context"
        class="input"
        type="textarea"
        resize="none"
        size="mini"
        :maxlength="contentLength"
        @focus="isShowSecReply(undefined)"
      ></el-input>

      <AddCommentButton @click="addComment(articleId, undefined)" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
const service = axios.create({
  baseURL: `${import.meta.env.ORIGIN}`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true,
  timeout: 5000,
});
export default {
  props: {
    articleId: {
      //评论所属文章 id
      type: String,
    },
    emptyText: {
      // 评论为空的时候显示的文字
      type: String,
      default: "期待你的评论！",
    },
    buttonText: {
      // 按钮文字
      type: String,
      default: "确定",
    },
    contentLength: {
      // 评论长度
      type: Number,
      default: 150,
    },
    placeholderText: {
      // 默认显示文字
      type: String,
      default: "请输入最多150字的评论...",
    },
    comments: {},
  },
  data() {
    return {
      comments: [
        {
          id: "first0", // 评论id
          date: "2023.12.00", //创建日期
          username: "username", //评论人
          userId: "1",
          avatarUrl: "http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5", //头像地址
          favour: ["1", "2", "3"], //点赞的用户id
          content: "content", //评论内容
          replyInfo: [
            //回复的内容
            {
              id: "sec0", // 当前此条回复的id
              date: "2023.12.10", //创建日期
              replyName: "replyName", //回复的对象
              username: "username", //评论人
              userId: "1",
              favour: ["2", "3", "4"],
              avatarUrl: "http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5",
              content: "博主厉害了", //回复的内容
            },
          ],
        },
      ], // 获取得到的评论
      context: "", // 评论内容
      replyContext: "", //一级评论回复
      isShowSec: "", //是否显示次级回复框
      isClickId: "", //记录点击回复的评论id
      userId: "1", // 浏览器指纹
      username: "watermelon02", //你的用户名
      firstIdx: 1,
      secIdx: 1,
      avatarUrl: "http://q1.qlogo.cn/g?b=qq&nk=1446157077&s=5",
    };
  },
  created() {
    // 获取评论数据
    this.getCommentList();
  },
  methods: {
    // 唤起文件选择
    handleClick() {
      this.$refs.avatar.click();
    },
    dealWithdAvatar(e) {
      const maxSize = 2 * 1024 * 1024;
      const file = Array.prototype.slice.call(e.target.files)[0];
      console.log(file);
    },
    async getCommentsOfArticle() {
      try {
        // 使用 service 向 /comment/select 发起 GET 请求
        return service
          .get(import.meta.env.VITE_HOST + "/comment/select", {
            params: {
              currentPage: 1,
              passageId: this.$route.query.passageId,
            },
          })
          .then(function (response) {
            return response;
          });
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 获取本篇文章所有评论
    async getCommentList() {
      try {
        //将点开的文章路由的id传给articleId
        this.comments = [];
        // 获取某篇文章下的所有评论

        const res = await this.getCommentsOfArticle();
        console.log(res);
        this.comments = res.data.comments; //评论列表
        this.username = res.data.user?.username;
        this.avatarUrl = res.data.user?.avatarUrl;
      } catch (err) {
        console.error("getCommentListErr");
        this.$message.error(err);
      }
    },
    // 评论点赞
    giveALike(item, id) {
      try {
        // 不允许同一个人重复点赞
        if (item.favour?.includes(this.userId)) {
          this.$message.info("您已经点过赞啦！");
          return;
        }
        //判断是给一级评论点赞还是二级评论，只有二级评论会有replyName
        if (item.replyName) {
          // 给二级评论点赞，向后台提交数据
        } else {
          // 一级评论点赞，向后台提交数据
        }
        item.favour.push(this.userId);
      } catch (err) {
        this.$message.error(err);
      }
    },
    isShowSecReply(id) {
      if (id) {
        this.isShowSec = id;
        if (this.isClickId === this.isShowSec) {
          this.isShowSec = "";
        } else {
          this.isShowSec = id;
        }
        this.isClickId = this.isShowSec;
      } else {
        this.isShowSec = this.isClickId = "";
      }
    },
    async deleteReplyInServer(replyId) {
      return service
        .get(import.meta.env.VITE_HOST + "/comment/deleteReply", {
          params: {
            id: replyId,
          },
        })
        .then(function (response) {
          return response;
        });
    },
    async deleteCommentInServer(id) {
      return service
        .get(import.meta.env.VITE_HOST + "/comment/deleteComment", {
          params: {
            id: id,
          },
        })
        .then(function (response) {
          return response;
        });
    },
    async deleteComment(id, replyId) {
      try {
        if (replyId) {
          // 删除二级评论，提交请求到后端
          let res = 0;
          res = await this.deleteReplyInServer(replyId);
          if (res.data != 0) {
            // 成功后从本地记录中删除该回复
            const temp = this.comments.find((item) => item.id == id).replyInfo;
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].id == replyId) {
                temp.splice(i, 1);
                break;
              }
            }
          }
        } else {
          // 删除一级评论，提交请求到后端
          let res = 0;
          res = await this.deleteCommentInServer(id);
          if (res.data != 0) {
            // 成功后从本地记录中删除该评论
            for (let i = 0; i < this.comments.length; i++) {
              if (this.comments[i].id == id) {
                this.comments.splice(i, 1);
              }
            }
          }
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    async addCommentToServer() {
      try {
        // 使用 service 向 /comment/addComment 发起 GET 请求
        return service
          .get(import.meta.env.VITE_HOST + "/comment/addComment", {
            params: {
              passageId: this.$route.query.passageId,
              content: this.context,
            },
          })
          .then(function (response) {
            return response;
          });
      } catch (err) {
        this.$message.error(err);
      }
    },
    async addReplyToServer() {
      try {
        // 使用 service 向 /comment/select 发起 GET 请求
        return service
          .get(import.meta.env.VITE_HOST + "/comment/addReply", {
            params: {
              commentId: this.isClickId,
              content: this.replyContext,
            },
          })
          .then(function (response) {
            return response;
          });
      } catch (err) {
        this.$message.error(err);
      }
    },
    async addComment(id, replyName) {
      let res = {};
      // 评论添加成功，返回的数据
      //本地更新评论列表
      if (replyName) {
        // 添加二级评论
        if (!this.replyContext) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        // 数据提交成功后返回数据
        res = await this.addReplyToServer();
        console.log(res.data);
        const comment = this.comments.find((item) => item.id == id);
        if (!comment.replyInfo) {
          comment.replyInfo = [];
        }
        comment.replyInfo.push(res.data);
        this.replyContext = "";
      } else {
        // 添加一级评论，提交数据到后端
        if (!this.context) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        // 数据提交成功后返回数据
        res = await this.addCommentToServer();
        this.comments.push(res.data);
        this.context = "";
      }
      this.isShowSec = this.isClickId = "";
    },
  },
};
</script>

<style lang="less" scoped>

.comment {
  min-height: 26vh;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  overflow: hidden;

  .active {
    color: rgb(202, 4, 4);
  }

  .comment-header {
    position: relative;
    height: 50px;
    padding: 10px 5px;
    display: flex;
    align-items: center;

    .input {
      margin-left: 10px;
      margin-right: 20px;
      flex: 1;

      /deep/.el-input__inner:focus {
        border-color: #dcdfe6;
      }
    }
  }

  .comment-body {
    min-height: 70px;
    padding: 10px 20px;
    font-size: 14px;

    .first-comment {
      display: flex;

      .input {
        /deep/.el-input__inner:focus {
          border-color: #dcdfe6;
        }
      }

      i {
        margin-right: 5px;
        margin-left: 1vw;
        cursor: pointer;

        &:nth-child(3) {
          color: rgb(202, 4, 4);
        }
      }

      .content {
        margin-left: 10px;
        position: relative;
        flex: 1;

        & > span {
          font-size: 12px;
          color: rgb(130, 129, 129);
        }

        .comment-right {
          position: absolute;
          padding-top: 8px;
          padding-bottom: 8px;
          border-radius: 4px;
          right: 0;
          top: 0;
        }

        .reply-comment {
          height: 60px;
          display: flex;
          align-items: center;

          .reply-button {
            margin-left: 20px;
            height: 35px;
          }
        }

        .second-comment {
          display: flex;
          padding: 10px 10px 10px 5px;
          margin-bottom: 10px;
          border-radius: 20px;
          backdrop-filter: blur(2px);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          border-radius: 10px;

          .to_reply {
            color: rgb(126, 127, 128);
          }
        }
      }
    }
  }
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
</style>


