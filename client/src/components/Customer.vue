<template>
  <v-container>
    <h1>Личные данные</h1>
    <div class="profile__row">
      <label>Имя</label><br>
      <input type="text" v-model="$store.getters.customer.first_name" :disabled="true"
             v-if="$store.getters.customer.first_name">
      <input type="text" v-model="firstName" @keypress="isNumber($event)" v-else>
      <button class="btn" @click="setName" v-if="!$store.getters.customer.first_name">Сохранить</button>
      <button class="change-btn" @click="$store.getters.customer.first_name = null" v-else>Изменить</button>
    </div>
    <div class="profile__row">
      <label>Номер телефона</label><br>
      <input type="text" v-model="$store.getters.customer.phone_number" :disabled="true"
             v-if="$store.getters.customer.phone_number" minlength="11" maxlength="11">
      <input type="text" v-model="phoneNumber" minlength="11" maxlength="11" @keypress="isNotNumber($event)" v-else>
      <button class="btn" @click="setPhone" v-if="!$store.getters.customer.phone_number">Сохранить</button>
      <button class="change-btn" @click="$store.getters.customer.phone_number = null" v-else>Изменить</button>
      <span v-if="phoneError">Такой номер телефона уже занят!</span>
    </div>
    <div class="profile__row">
      <label>День рождения<br></label>
      <input type="date" v-model="$store.getters.customer.birthday" id="birthday"
             :disabled="$store.getters.customer.birthday" v-if="$store.getters.customer.birthday">
      <input type="date" v-model="birthDay" id="birthday1" v-else>
      <button class="btn" @click="setBirthday" v-if="!$store.getters.customer.birthday">Сохранить</button>
    </div>
    <div class="profile__row">
      <label>Эл. почта</label><br>
      <input type="text" v-model="$store.getters.customer.email" :disabled="true">
    </div>

    <button class="logout-btn" @click="logout">Выйти</button>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Customer",
  data() {
    return {
      firstName: null,
      phoneNumber: null,
      birthDay: null,
      emailError: false,
      phoneError: false
    }
  },
  methods: {
    isNumber(event) {
      if ("1234567890".indexOf(event.key) != -1) {
        event.preventDefault()
      }
    },
    isNotNumber(event) {
      if ("1234567890".indexOf(event.key) == -1) {
        event.preventDefault()
      }
    },
    async setName() {
      if (this.firstName !== null) {
        await axios.put('name', {
          firstName: this.firstName
        }, {
          headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
        await this.$store.dispatch('getCustomer')
      }
    },
    async setPhone() {
      if (this.phoneNumber !== null) {
        const result = await axios.put('phone', {
          phone: this.phoneNumber
        }, {
          headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
        await this.$store.dispatch('getCustomer')
        if (result.data.error) {
          this.phoneError = true
        }
      }
    },
    async setBirthday() {
      if (this.birthDay !== null) {
        await axios.put('birthday', {
          birthday: this.birthDay
        }, {
          headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
        await this.$store.dispatch('getCustomer')
      }
    },
    async logout() {
      await axios.post('logout', {withCredentials: true, credentials: 'include'})
      localStorage.removeItem('token')
      this.$store.commit('LOGOUT')
      await this.$router.push('/')
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('checkAuth')
      this.$store.dispatch('getCustomer')
    } else {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="scss" scoped>

input[type=date]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

.change-btn {
  color: rgb(255, 105, 0) !important;
}

.profile__row {
  position: relative;
  max-width: 300px;

  button {
    position: absolute;
    font-size: 14px;
    color: rgb(171, 173, 186);
    top: 33px;
    right: 10px;
  }

  button:hover {
    color: rgb(255, 105, 0);
  }
}

h1 {
  padding-top: 76px;
  margin-bottom: 28px;
}

label {
  font-size: 14px;
  color: rgb(92, 99, 112);
}

input {
  position: relative;
  border: 1px solid rgb(226, 226, 233);
  margin-bottom: 24px;
  padding: 10px 16px;
  font-size: 14px;
  color: rgb(0, 0, 0);
  width: 100%;
  height: 40px;
  border-radius: 8px;
}

input:focus {
  border-color: rgb(255, 105, 0);
  outline: none;
}

input:disabled {
  background-color: rgb(243, 243, 247);
  opacity: 1;
  color: rgb(92, 99, 112);
  cursor: not-allowed;
}

.logout-btn {
  margin-top: 20px;
  background-color: #efefef;
  color: rgb(92, 99, 112);
  padding: 12px 23px;
  border-radius: 30px;
}

</style>