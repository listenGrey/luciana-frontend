<template>
  <div class="register-content">
    <form @submit.prevent="handleRegister">
      <div>
        <input type="text" v-model="user_name" required minlength="1" maxlength="10" placeholder="用户名"/>
        <input type="email" v-model="email" required placeholder="邮箱"/>
        <input type="password" v-model="password" required minlength="8" maxlength="16" placeholder="密码"/>
        <input type="password" v-model="re_password" required minlength="8" maxlength="16" placeholder="确认密码"/>
        <input type="text" v-model="invitation" required minlength="6" maxlength="6" placeholder="邀请码"/>
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_name: "",
      email: "",
      password: "",
      re_password: "",
      invitation: ""
    };
  },
  methods: {
    async handleRegister() {
      // 检查密码和确认密码是否一致
      if (this.password !== this.re_password) {
        alert("密码和确认密码不一致，请重新输入");
        return;
      }
      try {
        const response = await axios.post("http://localhost:8083/api/v1/register", {
          user_name: this.user_name.toString(),
          email: this.email,
          password: this.password.toString(),
          invitation: this.invitation.toString(),
        },{
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          if (response.data.code === 200) {
            // 注册成功，跳转到登录
            alert("注册成功，请登录");
            this.$router.push("/login");
          } else {
            // 注册失败，显示错误信息
            alert(response.data.msg || "注册失败，请重试");
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
.register-content {
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

/* 输入框样式 */
.register-content input {
  font-size: 20px;
  margin-bottom: 10px;
}
.register-content p {
  margin-top: 10px;
}
.register-content a {
  color: #8eb0ee;
}

/* 按钮样式 */
.register-content button {
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

.register-content button:hover {
  background-color: #2575fc;
  color: #ffffff;
}
</style>