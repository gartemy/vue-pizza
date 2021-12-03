<template>
  <header class="header">
    <v-container>
      <Login v-if="isLoginVisible" @hideLogin="hideLogin"/>
      <v-row class="align-center justify-space-between row">
        <v-col md="4" class="d-flex header__logo">
          <router-link :to="'/'"><img src="@/assets/logo.png" alt=""/></router-link>
        </v-col>

        <v-col md="3" class="d-flex header__items">
          <div class="header__account">
            <button @click="showLogin">Войти</button>
          </div>

          <button class="d-flex justify-center align-center header__cart" @click="$router.push('cart')">
            <div class="header__cart-price">
              <p v-if="totalPrice === 0">Корзина</p>
              <p v-else>{{totalPrice}} ₽</p>
            </div>

            <div class="d-flex justify-center align-center header__cart-quantity">
              <img src="@/assets/cart-button.svg" alt="">
              <p>{{totalCount}}</p>
            </div>
          </button>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'top',
  props: {
    totalPrice: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  components: {
    Login
  },
  data() {
    return {
      isLoginVisible: false,
    }
  },
  methods: {
    showLogin() {
      this.isLoginVisible = true
    },
    hideLogin() {
      this.isLoginVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #F6F6F6;

  &__logo {
    margin: 28px 0;
  }

  &__items {
    justify-content: end;
    gap: 15px;
  }

  &__account {
    background-color: rgb(239, 239, 239);
    border-radius: 30px;
    padding: 12px 23px;

    a {
      color: #2C2C2C;
    }
  }

  &__cart {
    cursor: pointer;
    background-color: #FE5F1E;
    border-radius: 30px;
    color: #fff;
    font-weight: bold;
    padding: 12px 23px;

    &:hover {
      background-color: #f24701;
    }

    &-price {
      white-space: nowrap;
      padding-right: 13px;
      border-right: 1px solid rgba(255, 255, 255, 0.25);;
    }

    &-quantity img {
      padding: 0px 9px 0px 14px;
    }
  }
}

@media (max-width: 817px) {
  .header {
    &__logo {
      margin-bottom: 10px;
    }
    &__items {
      justify-content: start;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 708px) {
  .header__items {
    justify-content: start;
  }
}

@media (max-width: 640px) {
  .header {
    &__logo {
      padding-bottom: 0px;

      img {
        max-width: 100%;
      }
    }

    &__items {
      flex-wrap: wrap;
      align-items: center;
    }

    .row {
      flex-direction: column;
    }
  }
}
</style>
