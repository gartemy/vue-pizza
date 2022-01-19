import axios from 'axios'

const state = {
    customer: {},
    isAuth: false,
    isLoginVisible: false,
    isLoading: true
}

const getters = {
    customer: state => state.customer,
    isAuth: state => state.isAuth,
    isLoginVisible: state => state.isLoginVisible,
    isLoading: state => state.isLoading
}

const mutations = {
    'SHOW_LOGIN'(state) {
        state.isLoginVisible = true
        document.querySelector('html').classList.add('lock')
    },
    'HIDE_LOGIN'(state) {
        state.isLoginVisible = false
        document.querySelector('html').classList.remove('lock')
    },
    'LOGIN'(state) {
        state.isAuth = true
    },
    'LOGOUT'(state) {
        state.isAuth = false
        state.customer = {}
    },
    'GET_INFO'(state, customer) {
        state.customer = customer
    },
    'SET_NAME'(state, firstName) {
        state.customer.first_name = firstName
    },
    'SET_PHONE'(state, phone) {
        state.customer.phone_number = phone
    },
    'SET_BIRTHDAY'(state, birthday) {
        state.customer.birthday = birthday
    },
    'SET_EMAIL'(state, email) {
        state.customer.email = email
    },
    'SET_LOADING' (state) {
        state.isLoading = true
    },
    'REMOVE_LOADING' (state) {
        state.isLoading = false
    }
}

const actions = {
    async getCustomer({commit}) {
        try {
            const response = await axios.get('info', {
                headers: {Authorization: "Bearer " + localStorage.getItem('token')}
            })
            let birthday = response.data.rows[0].birthday
            if (birthday !== null) {
                birthday = birthday.slice(0, 10).split('-')
                birthday[2] = Number(birthday[2]) + 1
                response.data.rows[0].birthday = birthday.join('-')
            }
            commit('GET_INFO', response.data.rows[0])
        } catch (e) {
            console.log(e)
        } finally {
            commit('REMOVE_LOADING')
        }
    },
    async checkAuth({commit}) {
        try {
            const response = await axios.get('refresh', {withCredentials: true})
            if (!response.data.message) {
                localStorage.setItem('token', response.data.accessToken)
                commit('LOGIN')
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}