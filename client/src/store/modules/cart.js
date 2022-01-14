import Vue from "vue";

const state = {
    cartItems: []
}

const getters = {
    cartItems: state => state.cartItems
}

const mutations = {
    'ADD_TO_CART'(state, pizza) {
        let found = state.cartItems.find(item => item.id == pizza.id && item.type == pizza.type && item.size == pizza.size)
        if (found) {
            found.quantity++
        } else {
            state.cartItems.push(pizza)
            Vue.set(pizza, 'quantity', 1)
        }
    },
    'INCREASE_QUANTITY'(state, index) {
        state.cartItems[index].quantity++
    },
    'DECREASE_QUANTITY'(state, index) {
        if (state.cartItems[index].quantity > 1) {
            state.cartItems[index].quantity--
        }
    },
    'REMOVE_FROM_CART'(state, index) {
        state.cartItems = state.cartItems.filter((item, i) => i !== index)
    },
    'CLEAR_CART' (state) {
        state.cartItems = []
    }
}

export default {
    state,
    getters,
    mutations
}