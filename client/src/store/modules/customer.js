import axios from 'axios'
import router from '../../router'

const state = {
    customer: {},
    isAuth: false
}

const getters = {
    customer: state => state.customer,
    isAuth: state => state.isAuth
}

const mutations = {
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
            await router.push(`/customer/${response.data.rows[0].customer_id}`)
        } catch(e) {
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