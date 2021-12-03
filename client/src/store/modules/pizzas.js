import axios from "axios";
import Vue from "vue";

const state = {
    pizzas: []
}

const getters = {
    pizzas: state => state.pizzas
}

const mutations = {
    'SET_PIZZAS'(state, pizzas) {
        state.pizzas = pizzas
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