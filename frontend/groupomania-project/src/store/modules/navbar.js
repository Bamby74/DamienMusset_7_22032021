const state = {
    isConnected: false,
};

const getters = {
    navButton: state => state.isConnected
};

const actions = {
    checkNavButton({ commit }) {
        const token = localStorage.getItem('token')
        if(token) {
            commit('navButtonConnected', state.isConnected)
        }else{
            commit('navButtonDisconnected', state.isConnected)
        }
    },
    connectNavButton({ commit }) {
        commit('navButtonConnected', state.isConnected)
    }
};

const mutations = {
    navButtonDisconnected: (state) => state.isConnected = false,
    navButtonConnected: (state) => state.isConnected = true
}


export default {
    state, getters, actions, mutations
}