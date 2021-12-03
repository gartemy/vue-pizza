import Vue from 'vue'
import Vuex from 'vuex'
import pizzas from './modules/pizzas'
import cart from './modules/cart'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        pizzas, cart
    }
})