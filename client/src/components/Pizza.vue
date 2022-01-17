<template>
  <v-col class="menu__item">
    <div class="menu__item-icon">
      <img :src="require(`@/assets/pizzas/${getImg}`)" alt="">
    </div>
    <div class="menu__item-title">
      <h2 class="text-center">{{ pizza.title }}</h2>
    </div>
    <div class="menu__item-options">
      <div class="item-options d-flex align-center">
        <v-col class="item-options__type text-center" v-for="(type, index) in ['тонкое', 'традиционное']" :key="type">
          <button :class="{'active' : index === typeIndex && pizza.options[index].sizes.includes(activeSize) }"
                  :disabled="!pizza.options[index].sizes.includes(activeSize)"
                  @click="typeIndex = index; activeType = type">{{ type }}
          </button>
        </v-col>
      </div>

      <div class="d-flex item-options">
        <v-col class="item-options__size text-center" v-for="size in [25, 30, 35]" :key="size">
          <button :class="{'active' : size === activeSize && pizza.options[typeIndex].sizes.includes(size) }"
                  :disabled="!pizza.options[typeIndex].sizes.includes(size)"
                  @click="activeSize = size">{{ size }} см.
          </button>
        </v-col>
      </div>
    </div>

    <div class="d-flex justify-space-between menu__item-adding align-center">
      <p class="item-adding__price">от {{ getPrice }} ₽</p>
      <button class="d-flex justify-end align-center item-adding__btn text-center" @click="$store.commit('INCREASE_PIZZA', pizza.pizza_id); addToCart(pizza)">
        <svg class="me-1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="#EB5A1E"></path>
        </svg>
        <p>Добавить</p>
        <span class="d-flex justify-center align-center ms-1" v-if="pizza.quantity > 0"> {{ pizza.quantity }} </span>
      </button>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "Pizza",
  props: {
    pizza: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      typeIndex: 1,
      activeType: 'традиционное',
      activeSize: 30,
    }
  },
  computed: {
    getImg() {
      const types = [...new Set(this.pizza.options.map((item, index) => index))]
      let img = new Map()

      for (let type in types) {
        img.set(types[type], this.pizza.img[type])
      }

      return img.get(this.typeIndex)
    },
    getPrice() {
      let sizes = []
      let price = new Map()

      for (let option in this.pizza.options) {
        sizes = sizes.concat(this.pizza.options[option].sizes)
      }

      sizes = [...new Set(sizes.sort((a, b) => a - b))]

      for (let size in sizes) {
        price.set(sizes[size], this.pizza.prices[size])
      }

      return price.get(this.activeSize)
    }
  },
  methods: {
    addToCart(pizza) {
      let cartItem = {
        id: pizza.pizza_id,
        img: this.getImg,
        title: pizza.title,
        type: this.activeType,
        size: this.activeSize,
        price: this.getPrice
      }
      this.$store.commit('ADD_TO_CART', cartItem)
    }
  }
}
</script>

<style lang="scss" scoped>

img {
  max-width: 100%;
}

.menu__item {
  margin-top: 44px;
  max-width: 280px;
  padding: 0;

  &-options {
    font-size: 14px;
    font-weight: 700;
    background-color: #F3F3F3;
    border-radius: 10px;
    margin-top: 22px;
  }

  &-icon {
    transition: 1s;

    img {
      display: block;
      margin: auto;
      max-width: 280px
    }
  }

  &-icon:hover {
    transform: scale(1.1);
  }

  &-title {
    h2 {
      margin-top: 11px;
      font-size: 20px;
      font-weight: 800;
    }
  }
}

.item-options__size, .item-options__type {
  padding: 6px;
}

.item-options__type button, .item-options__size button {
  width: 100%;
  padding: 6px;
}

.item-options__type button.active, .item-options__size button.active {
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}

.item-options__type button:disabled, .item-options__size button:disabled {
  opacity: 0.4;
}


.menu__item-adding {
  padding-top: 17px;
  max-width: 280px;

  .item-adding {
    &__price {
      color: #000;
      font-size: 22px;
      font-weight: 700;
      padding-right: 0;
    }

    &__btn {
      color: #EB5A1E;
      font-weight: 700;
      border: 1px solid #EB5A1E;
      border-radius: 30px;
      padding: 8px 16px;
      text-align: left;

      span {
        color: #fff;
        width: 22px;
        height: 22px;
        font-size: 13px;
        border-radius: 30px;
        background-color: #EB5A1E;
      }

      &:hover {
        color: #fff;
        background-color: #FE5F1E;

        svg path {
          fill: #fff;
        }

        span {
          color: #EB5A1E;
          background-color: #fff;
        }
      }
    }
  }
}
</style>