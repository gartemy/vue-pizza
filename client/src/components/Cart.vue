<template>
  <v-container>
    <Order v-if="isOrderVisible" @hideOrder="hideOrder"/>
    <div v-if="$store.getters.totalCount !== 0" class="cart text-center">
      <div class="cart__top d-flex justify-space-between align-center">
        <div class="cart__title d-flex align-end">
          <h2 class="d-flex align-center"><img src="@/assets/cart.svg" alt="">Корзина</h2>
        </div>
        <div class="cart__clear d-flex align-center" @click="$store.commit('RESET_PIZZAS'); $store.commit('CLEAR_CART')">
          <img src="@/assets/cart-clear.svg" alt="">
          <span>Очистить корзину</span>
        </div>
      </div>
      <div class="cart__items">
        <div class="cart__item d-flex align-center" v-for="(item, index) in $store.getters.cartItems" :key="item.id">
          <div class="cart__item-icon">
            <img :src="require(`@/assets/pizzas/${item.img}`)" alt="">
          </div>
          <div class="cart__item-info text-left">
            <h3>{{ item.title }}</h3>
            <p class="ps-1">{{ item.type }} тесто, {{ item.size }} см.</p>
          </div>
          <div class="cart__item-count d-flex align-center justify-space-between">
            <div class="cart__item-count-minus d-flex align-center justify-center">
              <button class="button--circle" @click="$store.commit('DECREASE_PIZZA', item.id); $store.commit('DECREASE_QUANTITY', index)">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"></path>
                </svg>
              </button>
            </div>
            <b>{{ item.quantity }}</b>
            <div class="cart__item-count-plus d-flex justify-center align-center">
              <button class="button--circle" @click="$store.commit('INCREASE_PIZZA', item.id); $store.commit('INCREASE_QUANTITY', index)">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"></path>
                  <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="cart__item-price"><b>{{ item.price * item.quantity }} ₽</b></div>
          <div class="cart__item-remove d-flex justify-center align-center">
            <button class="button--circle" @click="$store.commit('REMOVE_PIZZA', item.id); $store.commit('REMOVE_FROM_CART', index)">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#d0d0d0"></path>
                <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#d0d0d0"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="cart__bottom">
        <div class="cart__bottom-info d-flex align-center justify-space-between">
          <span>Всего пицц: <b>{{ $store.getters.totalCount }} шт.</b></span>
          <span>Сумма заказа: <b>{{ $store.getters.totalPrice }} ₽</b></span>
        </div>
        <div class="cart__bottom-buttons d-flex justify-space-between align-center">
          <button class="back-btn d-flex justify-center align-center" @click="$router.push('/')">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>
            <span class="ps-2">Вернуться назад</span>
          </button>
          <button class="pay-btn" @click="showOrder">Оформить заказ</button>
        </div>
      </div>
    </div>

    <div v-else class="cart cart--empty text-center">
      <h2>Корзина пустая 😕</h2>
      <p>Вероятнее всего, вы ещё не заказывали пиццу. <br> Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src="@/assets/empty-cart.png" alt="">
      <button @click="$router.push('/')">Вернуться назад</button>
    </div>
  </v-container>
</template>

<script>
import Order from '@/components/Order'

export default {
  name: "Cart",
  components: {Order},
  data() {
    return {
      isOrderVisible: false
    }
  },
  methods: {
    showOrder() {
      if (this.$store.getters.isAuth) {
        this.isOrderVisible = true
        document.querySelector('html').classList.add('lock')
      } else {
        this.$store.commit('SHOW_LOGIN')
      }
    },
    hideOrder() {
      this.isOrderVisible = false
      document.querySelector('html').classList.remove('lock')
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.button--circle {
  width: 32px;
  height: 32px;
  border-radius: 30px;
  border: 2px solid #fe5f1e;
  cursor: pointer;
  transition: all .15s ease-in-out;
}

.cart {
  max-width: 820px;
  margin: 94px auto;

  &__top {
    padding-bottom: 30px;
  }

  &__title h2 {
    gap: 17px;
    font-size: 32px;
    line-height: 39px;
  }

  &__clear {
    gap: 7px;
    color: #B6B6B6;
    transition: all .15s ease-in-out;

    &:hover {
      cursor: pointer;
      color: #232323;
    }
  }

  &__item {
    padding: 30px 0;
    border-top: 1px solid #F4F4F4;

    &-icon {
      width: 80px;
      height: 80px;
      margin-right: 15px;
    }

    &-info {
      width: 40%;

      h3 {
        font-size: 22px;
        margin-bottom: 3px;
      }

      p {
        font-size: 18px;
        color: #8D8D8D;
      }
    }

    &-count {
      width: 13%;

      b {
        font-size: 22px;
      }

      &-minus .button--circle:hover, &-plus .button--circle:hover {
        background-color: #fe5f1e;

        path {
          fill: #FFFFFF;
        }
      }
    }

    &-price {
      width: 33%;

      b {
        font-size: 22px;
      }
    }

    &-remove .button--circle {
      border-color: #ddd;

      svg {
        width: 11.5px;
        height: 11.5px;
        transform: rotate(45deg)
      }

      &:hover, &:hover path {
        fill: #FFFFFF;
        background-color: #2a2a2a;
        border-color: #2a2a2a;
      }
    }
  }

  &__bottom {
    &-info {
      padding-top: 10px;

      span {
        font-size: 22px;
      }

      span:last-child b {
        color: #FE5F1E;
      }
    }

    &-buttons {
      padding-top: 40px;

      button {
        font-size: 16px;
        width: 210px;
        border-radius: 30px;
        padding: 16px;
        transition: all .15s ease-in-out;
      }
    }
  }
}

.cart--empty {
  max-width: 600px;

  h2 {
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #777;
  }

  img {
    display: block;
    width: 300px;
    margin: 45px auto 60px;
  }

  button {
    padding: 14px 0 16px;
    width: 230px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #282828;
    border-radius: 30px;

    &:hover {
      background-color: #3d3d3d;
    }
  }
}

@media (max-width: 990px) {
  .cart__item {
    flex-direction: column;
    position: relative;

    &-icon {
      width: 100%;
      height: 100%;
    }

    &-info, &-count {
      width: 100%;
      padding-bottom: 20px;

      h3, p {
        text-align: center;
      }
    }

    &-count {
      justify-content: center !important;

      b {
        padding: 0 10px;
      }
    }

    &-price {
      width: 100%;

      b {
        padding-left: 20px;
      }

    }

    &-remove {
      position: absolute;
      top: 20px;
      left: 94%;
    }
  }
}

@media (max-width: 650px) {
  .cart__bottom {
    &-info, &-buttons {
      flex-direction: column;
    }
    button:first-child {
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 500px) {
  .cart {
    &__top {
      flex-direction: column;
    }
    &__title h2 {
      margin-bottom: 20px;
    }
    &__bottom {
      &-info span {
        font-size: 20px;
      }
    }
  }
}

</style>