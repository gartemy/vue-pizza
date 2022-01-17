import Vue from "vue"
import axios from 'axios'

const state = {
    pizzas: []
}

const getters = {
    pizzas: state => state.pizzas
}

const mutations = {
    'SET_PIZZAS'(state, pizzas) {
        state.pizzas = pizzas
    },
    INCREASE_PIZZA(state, id) {
        const pizza = state.pizzas.filter(item => item.pizza_id === id)
        pizza[0].quantity++
    },
    DECREASE_PIZZA(state, id) {
        const pizza = state.pizzas.filter(item => item.pizza_id === id)
        pizza[0].quantity--
    },
    'REMOVE_PIZZA' (state, id) {
        const pizza = state.pizzas.filter(item => item.pizza_id === id)
        pizza[0].quantity = 0
    },
    'RESET_PIZZAS' (state) {
        state.pizzas.forEach(item => {
            item.quantity = 0
        })
    }
}

const actions = {
    setPizzas: ({commit}) => {
        axios.get('pizzas').then(response => {
            response.data.map(item => Vue.set(item, 'quantity', 0))
            commit('SET_PIZZAS', response.data)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}