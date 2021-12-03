<template>
  <v-app>
    <Header :totalPrice="totalPrice" :totalCount="totalCount"/>
    <router-view :totalPrice="totalPrice" :totalCount="totalCount"></router-view>
  </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    Header
  },
  computed: {
    totalPrice() {
      return this.$store.state.cart.cartItems.reduce((res, pizza) => res + pizza.price * pizza.quantity, 0)
    },
    totalCount() {
      return this.$store.state.cart.cartItems.reduce((res, pizza) => res + pizza.quantity, 0)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

body {
  color: #2C2C2C;
  font-size: 16px;
  background-color: rgb(255, 223, 140);
  padding: 50px 0;
}

.container {
  max-width: 90%;
}

a {
  text-decoration: none;
}

p {
  margin: 0 !important;
}

#app {
  font-family: 'Montserrat' !important;
  width: calc(100vw - 100px);
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  max-width: 1400px;
}

@media (max-width: 594px) {
  body {
    padding: 0;
  }
  #app {
    margin: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>
