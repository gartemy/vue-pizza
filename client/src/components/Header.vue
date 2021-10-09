<template>
  <header class="header">
    <Login v-if="isLoginVisible" @hideLogin="hideLogin" />
    <v-row class="align-center justify-space-between row">
      <v-col md="3" class="header__logo">
        <a href="#"><img src="@/assets/logo.png" alt=""/></a>
      </v-col>

      <v-col md="3" class="d-flex header__items">
        <div class="header__account">
          <button @click="showLogin">Войти</button>
        </div>

        <div class="d-flex justify-center align-center header__basket">
          <div class="header__basket-price">
            <p>Корзина</p>
          </div>

          <div class="d-flex justify-center header__basket-quantity">
            <img src="@/assets/basket.svg" alt="">
            <p>0</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </header>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'top',
  components: {
    Login
  },
  data() {
    return {
      isLoginVisible: false
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
  }
  &__items {
    justify-content: end;
    gap: 15px;
    margin: 30px 0px;
  }

  &__account {
    background-color: rgb(239, 239, 239);
    border-radius: 30px;
    padding: 12px 23px;

    a {
      color: #2C2C2C;
    }
  }

  &__basket {
    cursor: pointer;
    background-color: #FE5F1E;
    border-radius: 30px;
    color: #fff;
    font-weight: bold;
    padding: 12px 23px 13px 23px;

    &-price {
      padding-right: 13px;
      border-right: 1px solid rgba(255, 255, 255, 0.25);;
    }

    &-quantity img {
      padding: 0px 9px 0px 14px;
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
