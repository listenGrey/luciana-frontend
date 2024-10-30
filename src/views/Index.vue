<template>
  <div class="index-screen">
    <div class="topic">
      <h1 ref="typedText">{{ displayedText }}</h1>
    </div>

    <div class="auth-container">
      <!-- 首页 -->
      <div v-if="showIndexDiv" class="index-content">
        <button @click="showLogin">登录</button>
        <button @click="showRegister">注册</button>
      </div>

      <!-- 注册 -->
      <div v-if="showRegisterDiv">
        <Register />
      </div>

      <!-- 登录 -->
      <div v-if="showLoginDiv">
        <Login />
      </div>

    </div>

    <div class="auth-footer">
      <p v-if="showLoginDiv">没有账号，点击<a @click="showRegister">这里</a>去注册</p>
      <p v-if="showRegisterDiv">已有账号，点击<a @click="showLogin">这里</a>去登录</p>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
  name: 'index',
  components: {
    Login,
    Register,
  },
  data() {
    return {
      fullText: "luciana —— 你的全能助手",
      displayedText: "", // 用于逐字显示的文本
      typingSpeed: 150, // 打字速度（毫秒）
      showIndexDiv: true,
      showLoginDiv: false,
      showRegisterDiv: false
    };
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < this.fullText.length) {
          this.displayedText += this.fullText.charAt(i);
          i++;
        } else {
          clearInterval(interval); // 结束打字效果
        }
      }, this.typingSpeed);
    },
    showLogin() {
      this.showIndexDiv = false;
      this.showLoginDiv = true;
      this.showRegisterDiv = false;
    },
    showRegister() {
      this.showIndexDiv = false;
      this.showLoginDiv = false;
      this.showRegisterDiv = true;
    },
  },
};
</script>

<style scoped>
/* 背景样式 */
.index-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(90deg, #6a11cb 0%, #6a9ef6 100%);
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
}

/* 标题样式 */
.topic {
  flex: 0.5;
  font-size: 3em;
}

/* 内容容器样式 */
.index-content {
  width: 150px;
  display: flex;
  justify-content: space-between;
}

/* 按钮样式 */
button {
  background-color: #ffffff;
  color: #2575fc;
  border: none;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2575fc;
  color: #ffffff;
}

a {
  color: #79a8f5;
  cursor: pointer;
}

/* 设置固定高度，避免组件切换时页面抖动 */
.auth-container {
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 设置页脚 */
.auth-footer {
  height: 24px;
  margin-top: 20px;
}
</style>