import Vue from "vue";

const state = {
    cartItems: [],
    totalCount: 0,
    totalPrice: 0
}

const getters = {
    cartItems: state => state.cartItems,
    totalCount: state => state.totalCount,
    totalPrice: state => state.totalPrice
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
        state.totalCount++
        state.totalPrice += pizza.price
    },
    'INCREASE_QUANTITY'(state, index) {
        state.cartItems[index].quantity++
        state.totalCount++
        state.totalPrice += state.cartItems[index].price
    },
    'DECREASE_QUANTITY'(state, index) {
        if (state.cartItems[index].quantity > 1) {
            state.cartItems[index].quantity--
            state.totalCount--
            state.totalPrice -= state.cartItems[index].price
        }
    },
    'REMOVE_FROM_CART'(state, index) {
        state.totalCount -= state.cartItems[index].quantity
        state.totalPrice -= state.cartItems[index].price * state.cartItems[index].quantity
        state.cartItems = state.cartItems.filter((item, i) => i !== index)
    },
    'CLEAR_CART' (state) {
        state.cartItems = []
        state.totalCount = 0
        state.totalPrice = 0
    }
}

export default {
    state,
    getters,
    mutations
}