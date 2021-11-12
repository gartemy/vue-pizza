<template>
  <v-container>
    <div class="cart cart--empty text-center">
      <h2>Корзина пустая 😕</h2>
      <p>Вероятнее всего, вы ещё не заказывали пиццу. <br> Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src="@/assets/empty-cart.png" alt="">
      <button @click="$router.push('/')">Вернуться назад</button>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Cart"
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
.cart--empty {
  max-width: 600px;
  margin: 70px auto;

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

</style>