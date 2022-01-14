import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import pizzas from './modules/pizzas'
import cart from './modules/cart'
import customer from './modules/customer'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
    modules: {
        pizzas, cart, customer
    }
})