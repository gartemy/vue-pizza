<template>
  <header class="header">
    <v-container>
      <v-row class="align-center justify-space-between row">
        <v-col md="4" class="d-flex header__logo">
          <router-link :to="'/'"><img src="@/assets/logo.png" alt=""/></router-link>
        </v-col>

        <v-col md="3" class="d-flex header__items align-center">
          <div class="header__account" @click="openAccount">
            <a v-if="!$store.getters.isAuth" class="header__account-auth">Войти</a>
            <a class="d-flex flex-column justify-center align-center header__account-cabinet" v-else>
              <svg width="28" height="27" viewBox="0 0 25 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.5 22.5C18.299 22.5 23 17.799 23 12S18.299 1.5 12.5 1.5 2 6.201 2 12s4.701 10.5 10.5 10.5zm0-2.25a8.25 8.25 0 008.237-8.716c-1.5.114-3.315.072-5.093-.255-2.54-.466-5.197-1.551-6.643-3.796-.935.702-2.111 1.644-3.134 2.477-.62.504-1.178.964-1.584 1.302A8.25 8.25 0 0012.5 20.25z"
                      fill="#000"></path>
                <path d="M8.75 15.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 15.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                      fill="#000"></path>
              </svg>
              <span v-if="$store.getters.customer.first_name">{{ $store.getters.customer.first_name }}</span>
              <span v-else>Кабинет</span>
            </a>
          </div>

          <button class="d-flex justify-center align-center header__cart" @click="$router.push('/cart')">
            <div class="header__cart-price">
              <p v-if="$store.getters.totalPrice === 0">Корзина</p>
              <p v-else>{{ $store.getters.totalPrice }} ₽</p>
            </div>

            <div class="d-flex justify-center align-center header__cart-quantity">
              <img src="@/assets/cart-button.svg" alt="">
              <p>{{ $store.getters.totalCount }}</p>
            </div>
          </button>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>

export default {
  name: 'top',
  methods: {
    async openAccount() {
      if (!this.$store.getters.isAuth) {
        this.$store.commit('SHOW_LOGIN')
      } else {
        await this.$router.push(`/customer/${this.$store.getters.customer.customer_id}`)
      }
    }
  }
}
</script>

<style lang="scss">
.lock {
  overflow-y: hidden;
}

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

    &-auth {
      background-color: rgb(239, 239, 239);
      border-radius: 30px;
      padding: 12px 23px;
      color: #2C2C2C !important;
    }

    &-cabinet {
      font-size: 14px;
      color: #2C2C2C !important;
      font-weight: 600;
      margin: 0 23px;

      svg {
        transition: transform 500ms ease 0s;
      }

      &:hover {
        color:rgb(255, 105, 0)!important;

        svg {
          transform: rotate(15deg) scale(1.1);
        }
        path {
          fill: rgb(255, 105, 0);
        }
      }
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
