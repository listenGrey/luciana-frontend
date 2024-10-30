<template>
  <div class="chat-screen">
    <div class="chat-left">
      <ChatList @selectChat="handleSelectChat"/>
    </div>
    <div class="chat-right">
      <ChatView :chatId="selectedChatId"/>
    </div>
  </div>
</template>

<script>
import ChatView from '../components/ChatView.vue';
import ChatList from "../components/ChatList.vue";
export default {
  name: 'Chat',
  components: {
    ChatView,
    ChatList,
  },
  data() {
    return {
      selectedChatId: null,
    }
  },
  methods: {
    handleSelectChat(chatId) {
      this.selectedChatId = chatId;
    }
  }
};
</script>

<style scoped>
.chat-screen {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.chat-left{
  width: 20%;
  padding: 1rem;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  background-color: rgb(225, 225, 225);
}

.chat-right{
  width: 80%;
  padding: 1rem;
}
</style>
