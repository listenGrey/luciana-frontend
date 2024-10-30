<template>
  <div class="chat-view" ref="chatView">
    <div v-if="chatId !== null || qas.length === 0" class="empty-msg">
      <h1>有什么可以帮你的</h1>
    </div>

    <!-- 加载动画 -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <div v-else class="qa-container">
      <div v-for="(qa, index) in qas" :key="index" class="qa-pair">
        <div class="request">{{ qa.request }}</div>
        <!-- 渲染 response 为 Markdown 格式 -->
        <div class="response" v-html="renderMarkdown(qa.response)"></div>
      </div>
    </div>
  </div>


  <footer  v-if="chatId !== null || qas.length !== 0" class="chat-footer">
    <!-- 输入框和发送按钮 -->
    <div class="input-container">
      <input
          type="text"
          v-model="userInput"
          placeholder="给“luciana”发送消息"
          @keyup.enter="sendQa"
      />
      <button @click="sendQa" :disabled="isLoading">发送</button>
    </div>
  </footer>
</template>

<script>
import axios from "axios";
import MarkdownIt from "markdown-it";
export default {
  props: {
    chatId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      qas: [], // 当前对话的消息列表
      markdown: new MarkdownIt(),
      userInput: '',
      isLoading: false,
    };
  },
  watch: {
    chatId(newChatId) {
      // 当 chatId 变化时，获取对应的消息
      this.fetchQAs(newChatId);
    },
    qas() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    async fetchQAs(chatId) {
      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.get(`http://localhost:8083/api/v1/chat/${chatId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.qas = response.data.data.qas;
          } else {
            alert("无法加载对话内容，请重试"+response.data.code+response.data.msg)
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试");
      }
    },
    async sendQa(){
      if (!this.userInput.trim()) return; // 如果输入为空，不执行发送
      // 将用户问题添加到对话中
      const userMessage = { request: this.userInput, response: '' };
      this.qas.push(userMessage);
      this.isLoading = true

      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.post("http://localhost:8083/api/v1/prompt", {
          cid: this.chatId,
          prompt: this.userInput
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200) {
            userMessage.response = response.data.data
            // 清空输入框
            this.userInput = '';

            this.$nextTick(() => {
              setTimeout(() => {
                this.scrollToBottom()
              }, 10)
            })
          } else {
            alert("获取回答失败，请重试")
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试")
      } finally {
        this.isLoading = false
      }
    },
    renderMarkdown(text) {
      return this.markdown.render(text);
    },
    scrollToBottom() {
      const chatContent = this.$refs.chatView;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight
      }
    }
  },
  mounted() {
    if (this.chatId) {
      this.fetchQAs(this.chatId)
    }
  },
};
</script>

<style scoped>
.chat-view {
  //width: 80%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.qa-container {
  width: 80%;
  padding-bottom: 80px;
}

.qa-pair {
  padding: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 让request居右 */
}

.chat-footer {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* 使 footer 永远在最上层 */
  position: sticky;
  bottom: 0;
}

.request {
  color: #333;
  margin-bottom: 0.5rem;
  text-align: right; /* 文字居右 */
  background-color: #97cdf3;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%; /* 控制宽度以避免过宽 */
  font-size: 16px;
}

.response {
  max-width: 80%;
  align-self: flex-start; /* 让response在左侧 */
  font-size: 16px;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 50%;
  background-color: #fff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0853f3;
}
button:disabled {
  background-color: grey;
  cursor: not-allowed;
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}
.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
