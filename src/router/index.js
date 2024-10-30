import { createRouter, createWebHistory } from 'vue-router'
import index from "../views/Index.vue";
import Chat from "../views/Chat.vue"

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
]

const router = createRouter({
    history: createWebHistory(''),
    routes,
})

export default router