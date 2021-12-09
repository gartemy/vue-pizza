<template>
  <v-container>
    <h1>Личные данные</h1>
    <div class="profile__row">
      <label for="name">Имя</label><br>
      <input type="text" id="name">
      <button class="btn">Сохранить</button>
    </div>
    <div class="profile__row">
      <label for="phone">Номер телефона</label><br>
      <input type="text" id="phone">
      <button class="btn">Сохранить</button>
    </div>
    <div class="profile__row">
      <label for="birthday">День рождения</label><br>
      <input type="text" id="birthday" disabled>
    </div>
    <div class="profile__row">
      <label for="email">Эл. почта</label><br>
      <input type="text" id="email">
      <button class="btn">Сохранить</button>
    </div>

    <button class="back-btn" @click="logout">Выйти</button>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "CustomerPage",
  methods: {
    async logout() {
      localStorage.clear()
      await axios.post('logout', {withCredentials: true, credentials: 'include'})
      this.$store.commit('LOGOUT')
      await this.$router.push('/')
    },
    check() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.check()
  }
}

</script>

<style lang="scss" scoped>
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

.back-btn {
  margin-top: 20px;
  background-color:  #efefef;
  color: rgb(92, 99, 112);
  padding: 12px 23px;
  border-radius: 30px;
}

</style>