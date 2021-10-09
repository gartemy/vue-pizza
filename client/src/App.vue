<template>
  <v-app>
    <v-container>
      <Header/>
      <Menu/>
    </v-container>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'
export default {
  name: 'app',
  components: {
    Header, Menu
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
body {
  color: #2C2C2C;
  font-size: 16px;
  background-color: rgb(255, 223, 140);
  margin: 0;
}
.container {
  max-width: 1225px;
}
a {
  text-decoration: none;
}
p {
  margin: 0 !important;
}
#app {
  font-family: 'Montserrat' !important;
  background-color: #fff;
  margin: 43px 55px 63px 45px;
  border-radius: 10px;
}

@media (max-width: 400px) {
  #app {
    margin: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>
