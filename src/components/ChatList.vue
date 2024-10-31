<template>
  <div class="chat-list">
    <ul>
      <li @click="newChat" class="new-chat">
        新建对话
      </li>
    </ul>

    <p style="text-align: center">对话列表</p>

    <ul>
      <li v-for="chat in chats" :key="chat.cid" @click="selectChat(chat.cid)" class="chat-item" >
        <p class="chat-name">{{ chat.name || 'New Chat'}}</p>
        <button @click="startRenameChat(chat.cid)" class="func-button">重命名</button>
        <button @click="deleteChat(chat.cid)" class="func-button">删除</button>
      </li>
    </ul>
  </div>
  <!-- 重命名对话输入框 -->
  <div v-if="isRenaming" class="rename-modal">
    <input
        v-model="newChatTitle"
        placeholder="输入新对话名称"
        @keyup.enter="confirmRename"
    />
    <button @click="confirmRename">确定</button>
    <button @click="cancelRename">取消</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chats: [], // 可以从后端获取对话列表
      isRenaming: false,       // 是否正在重命名
      newChatTitle: '',         // 新的对话名称
      renameChatId: null,      // 当前重命名的对话ID
    };
  },
  methods: {
    selectChat(chatId) {
      this.$emit('selectChat', chatId); // 触发选择对话的事件
    },
    startRenameChat(cid) {
      this.isRenaming = true
      this.newChatTitle = ''
      this.renameChatId = cid
    },
    async fetchChatList() {
      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.get("http://localhost:8083/api/v1/index", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.chats = response.data.data
          } else {
            alert("获取对话失败，请重试")
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试")
      }
    },
    async newChat() {
      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.post("http://localhost:8083/api/v1/new_chat", {
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.chats.unshift({cid:response.data.data.cid, name: 'New Chat'});
          } else {
            alert("新建对话失败，请重试")
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试")
      }
    },
    async deleteChat(cid) {
      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.delete(`http://localhost:8083/api/v1/delete/${cid}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.chats = this.chats.filter(chat => chat.cid !== cid);
            this.showMenuId = null;  // 关闭菜单
          } else {
            alert("删除对话失败，请重试")
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试")
      }
    },
    async confirmRename() {
      if (!this.newChatTitle.trim()) return;
      try {
        const token = localStorage.getItem('jwtToken'); // 获取JWT
        const response = await axios.put(`http://localhost:8083/api/v1/rename`, {
          cid: this.renameChatId,
          name: this.newChatTitle
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          if (response.data.code === 200){
            const updatedChat = this.chats.find(chat => chat.cid === this.renameChatId);
            if (updatedChat) {
              updatedChat.name = this.newChatTitle;
            }
            this.isRenaming = false;
            this.renameChatId = null;
            this.newChatTitle = '';
          } else {
            alert("重命名失败，请重试"+response.data.code+response.data.msg)
          }
        } else {
          alert("网络错误，请稍后再试")
        }
      } catch (error) {
        alert("网络错误，请稍后再试")
      }
    },
    async cancelRename() {
      this.isRenaming = false
      this.newChatTitle = ''
      this.renameChatId = null
    },
    updateCid(tempChatId, realChatId) {
      // 查找临时对话并更新chatId
      const chat = this.chats.find(chat => chat.cid === tempChatId);
      if (chat) {
        chat.chatId = realChatId;
      }

      // 刷新当前选中的对话
      this.selectChat(realChatId);
    },
  },
  mounted() {
    // 从后端获取实际数据
    this.fetchChatList();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  cursor: pointer;
}
li:hover {
  background-color: #f5f5f5;
}

.new-chat {
  text-align: center;
  background-color: #97cdf3;
}

.new-chat:hover {
  background-color: #a8d1ec;
}

.chat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px;
}

.chat-name {
  flex: 1;
}

.func-button {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.rename-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.rename-modal input {
  width: 200px;
  padding: 5px;
  margin-right: 10px;
}

.rename-modal button {
  margin-right: 5px;
}

</style>