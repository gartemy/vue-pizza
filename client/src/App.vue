<template>
  <v-app>
    <Login v-if="$store.getters.isLoginVisible"/>
    <Header :totalPrice="totalPrice" :totalCount="totalCount"/>
    <router-view :totalPrice="totalPrice" :totalCount="totalCount"></router-view>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Login from '@/components/Login'

export default {
  name: 'app',
  components: {
    Header, Login
  },
  computed: {
    totalPrice() {
      return this.$store.state.cart.cartItems.reduce((res, pizza) => res + pizza.price * pizza.quantity, 0)
    },
    totalCount() {
      return this.$store.state.cart.cartItems.reduce((res, pizza) => res + pizza.quantity, 0)
    }
  },
  mounted() {
    this.$store.dispatch('checkAuth')
    this.$store.dispatch('getCustomer')
  }
}
</script>

<style lang="scss">
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

.modal {

  &-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &-container {
    margin: 0px auto;
    background-color: rgb(243, 243, 247);;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &-header {

    &__close {
      position: relative;
      width: 32px;
      height: 32px;
      opacity: 0.3;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 28px;
        width: 2px;
        background-color: #000;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }
}

.back-btn {
  color: #c3c3c3;
  border: 1px solid #D3D3D3;

  &:hover {
    color: #FFFFFF;
    background-color: #000000;
    border-color: #000000;
  }
}

.pay-btn {
  color: #FFFFFF!important;
  font-weight: 600;
  background-color: #FE5F1E;
  border: none;

  &:hover {
    background-color: #f24701!important;
  }
}

.failed {
  border-color: red!important;
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
