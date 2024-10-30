<template>
  <div class="login-content">
    <form @submit.prevent="handleLogin">
      <div>
        <input type="email" v-model="email" required placeholder="邮箱"/>
        <input type="password" v-model="password" required placeholder="密码"/>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      // 检查密码长度
      if (this.password.length < 8) {
        alert("密码至少为8位，请重新输入");
        return;
      } else if (this.password.length > 16) {
        alert("密码最多为16位，请重新输入");
        return
      }
      try {
        const response = await axios.post("http://localhost:8083/api/v1/login", {
          email: this.email,
          password: this.password.toString(),
        },{
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.status === 200){
          if (response.data.code === 200) {
            localStorage.setItem('jwtToken', response.data.data.access_token);
            // 登录成功，跳转到主页
            this.$router.push("/chat");
          } else {
            // 登录失败，显示错误信息
            alert(response.data.msg || "登录失败，请重试");
          }
        } else {
          alert("网络错误，请稍后再试");
        }
      } catch (error) {
        alert("网络错误，请稍后再试");
      }
    }
  }
};
</script>

<style scoped>
/* 内容容器样式 */
.login-content {
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

/* 输入框样式 */
.login-content input {
  font-size: 20px;
  margin-bottom: 10px;
}
.login-content p {
  margin-top: 10px;
}
.login-content a {
  color: #8eb0ee;
}

/* 按钮样式 */
.login-content button {
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

.login-content button:hover {
  background-color: #2575fc;
  color: #ffffff;
}
</style>