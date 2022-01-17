<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div v-if="stage == 'login'" class="modal-header">
          <div  class="modal-header__items d-flex justify-space-between align-center">
            <h3 class="mb-2">Вход на сайт</h3>
            <div class="modal-header__close" @click="$store.commit('HIDE_LOGIN')"></div>
          </div>
          <p>Подарим подарок на день рождения, сохраним адрес доставки и расскажем об акциях</p>
        </div>

        <div v-if="stage == 'login'" class="modal-body">
          <slot name="body">
            <p class="mb-2" v-if="error" :style="{color: 'red'}">Некорректный адрес!</p>
            <p class="mb-2" v-else>Адрес электронной почты</p>
            <div class="text-center">
              <input type="email" v-model="mailAddress" :class="{failed: error}" name="email" placeholder="example@mail.ru"
              ><br>
              <button @click="login">Выслать код</button>
            </div>
          </slot>
        </div>

        <div v-if="stage == 'verify'" class="modal-header">
          <div  class="modal-header__items d-flex justify-space-between align-center">
            <h3 class="mb-2">Вход на сайт</h3>
            <div class="modal-header__close" @click="$store.commit('HIDE_LOGIN')"></div>
          </div>
          <p>Код отправили сообщением на <br> <span class="verify__address">{{ mailAddress }}</span></p>
        </div>

          <div v-if="stage == 'verify'" class="modal-body">
            <slot name="body">
              <p class="mb-2" v-if="error" :style="{color: 'red'}">Неправильный код!</p>
              <div class="text-center">
                <input type="text" v-model="code" name="code" maxlength="4" placeholder="****" :class="{failed: error}"><br>
                <button @click="verify">Отправить код</button>
              </div>
            </slot>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      stage: 'login',
      code: '',
      mailAddress: '',
      error: false,
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('login', {
          email: this.mailAddress
        })
        if (response.data.message) {
          this.error = true
        } else {
          this.stage = 'verify'
        }
      } catch(e) {
        console.log(e.response.data.message)
      }
    },
    async verify() {
      try {
        const response = await axios.post('verify', {
          email: this.mailAddress,
          code: this.code
        })
        if (response.data.message) {
          this.error = true
        } else {
          localStorage.setItem('token', response.data.accessToken)
          this.$store.commit('HIDE_LOGIN')
          this.$store.commit('LOGIN')
          await this.$store.dispatch('getCustomer')
        }
      } catch(e) {
        console.log(e.response.data.message)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.modal {

  &-container {
    width: 420px;
    padding: 20px 30px;
  }

  &-header {

    h3 {
      max-width: 300px;
      margin-top: 0;
      color: #000;
      font-size: 36px;
      font-weight: 500;
    }

    p {
      color: rgb(92, 99, 112);
      font-weight: 600;
      margin-bottom: 24px;
    }


  }

  &-body {
    margin: 20px 0;

    p {
      color: rgb(92, 99, 112);
      font-size: 14px;
      font-weight: 400;
    }

    input {
      width: 100%;
      padding: 16px;
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid rgb(226, 226, 233);

      &:focus {
        border-color: rgb(255, 105, 0);
        outline: none;
      }
    }

    button {
      margin-top: 35px;
      width: 100%;
      background-color: #FE5F1E;
      color: #fff;
      font-weight: 500;
      padding: 12px 24px;
      border-radius: 9999px;
      line-height: 24px;
    }
  }
}

.failed {
  border-color: red!important;
}

.verify__address {
  color: #000;
}

@media (max-width: 460px) {
  .modal-container {
    width: 90%;
  }
  .modal-header {
    h3 {
      font-size: 24px;
    }
    &__close:before, &__close:after {
      height: 24px;
    }

  }
}

</style>