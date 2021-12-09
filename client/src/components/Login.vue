<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div v-if="stage == 'login'" class="modal-header">
          <div  class="modal-header__items d-flex justify-space-between align-center">
            <h3 class="mb-2">Вход на сайт</h3>
            <div class="modal-header__close" @click="hideLogin"></div>
          </div>
          <p>Подарим подарок на день рождения, <br> сохраним адрес доставки и расскажем об <br> акциях</p>
        </div>

        <div v-if="stage == 'login'" class="modal-body">
          <slot name="body">
            <p class="mb-2">Адрес электронной почты</p>
            <div class="text-center">
              <input type="email" v-model="mailAdress" name="email" placeholder="example@mail.ru"
              ><br>
              <button @click="login">Выслать код</button>
            </div>
          </slot>
        </div>

        <div v-if="stage == 'verify'" class="modal-header">
          <div  class="modal-header__items d-flex justify-space-between align-center">
            <h3 class="mb-2">Вход на сайт</h3>
            <div class="modal-header__close" @click="hideLogin"></div>
          </div>
          <p>Код отправили сообщением на <br> <span class="verify__address">{{ mailAdress }}</span></p>
        </div>

          <div v-if="stage == 'verify'" class="modal-body">
            <slot name="body">
              <div class="text-center">
                <input type="text" v-model="code" name="code" maxlength="4" placeholder="****"><br>
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
      mailAdress: ''
    }
  },
  methods: {
    hideLogin() {
      this.$emit('hideLogin')
    },
    async login() {
      await axios.post('login', {
        email: this.mailAdress
      });
      this.stage = 'verify'
    },
    async verify() {
      const token = await axios.post('verify', {
        email: this.mailAdress,
        code: this.code
      });
      if (token.data.message) {
        alert('Неправильный код!')
      } else {
        localStorage.setItem('token', token.data.accessToken)
        localStorage.setItem('refreshToken', token.data.refreshToken)
        this.hideLogin()
        this.$store.commit('LOGIN')
        await this.$router.push('/customer')
      }
    }
  }
}
</script>

<style lang="scss">
.modal-mask {
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 420px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgb(243, 243, 247);;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
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

  &__close {
    position: relative;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    cursor: pointer;
  }

  &__close:hover {
    opacity: 1;
  }

  &__close:before, &__close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 28px;
    width: 2px;
    background-color: #000;
  }

  &__close:before {
    transform: rotate(45deg);
  }

  &__close:after {
    transform: rotate(-45deg);
  }
}

.modal-body {
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

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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