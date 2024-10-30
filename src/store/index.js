import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        conversations: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setConversations(state, conversations) {
            state.conversations = conversations;
        },
    },
    actions: {
        async login({ commit }, credentials) {
            // Assume API call for login
            const user = await api.login(credentials);
            commit('setUser', user);
        },
        async fetchConversations({ commit }) {
            // Assume API call for fetching conversations
            const conversations = await api.getConversations();
            commit('setConversations', conversations);
        },
    },
    modules: {},
});
