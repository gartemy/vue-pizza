import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'
import Customer from "@/components/Customer"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'menu',
            component: Menu
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/customer/:id',
            name: 'customer',
            component: Customer
        }
    ]
})