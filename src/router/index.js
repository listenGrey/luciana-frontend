import { createRouter, createWebHistory } from 'vue-router'
import index from "../views/Index.vue";
import Chat from "../views/Chat.vue"
import NotFound from "../views/NotFound.vue";

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
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(''),
    routes,
})

export default router