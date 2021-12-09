const state = {
    customerInfo: [],
    isAuth: false
}

const mutations = {
    'LOGIN' (state) {
        state.isAuth = true
    },
    'LOGOUT' (state) {
        state.isAuth = false
    }
}

export default {
    state,
    mutations
}