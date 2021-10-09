<template>
  <v-main class="menu">
    <v-row class="menu__navigation justify-space-between align-center">
      <v-col class="menu__navigation-categories">
        <ul class="d-flex">
          <li v-for="category in categories" :key="category.id" :class="{'active' : category.isActive}"
              @click="activeCategory(category.id)" class="me-2">{{ category.title }}
          </li>
        </ul>
      </v-col>

      <v-col xl="3" class="d-flex align-end flex-wrap menu__navigation-sorting">
        <p class="me-2">Сортировка по: </p>
        <v-menu offset-y>
          <template v-slot:activator="{on, attrs}">
            <span class="menu__navigation-sorting-type" v-bind="attrs" v-on="on">{{ filterSorting }}</span>
          </template>
          <v-list>
            <v-list-item v-for="sorting in sortings" :key="sorting.id">
              <v-list-item-title @click="activeSorting(sorting.id)">{{ sorting.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row class="menu__heading">
      <v-col>
        <h1>{{ filterTitle }} пиццы</h1>
      </v-col>
    </v-row>

    <v-row class="menu__items justify-center flex-wrap">
      <v-col class="menu__item" v-for="pizza in pizzas" :key="pizza.id">
        <div class="menu__item-icon">
          <img :src="require(`@/assets/pizzas/${pizza.img}`)" alt="">
        </div>
        <div class="menu__item-title">
          <h2 class="text-center">{{ pizza.title }}</h2>
        </div>
        <div class="menu__item-options">
          <div class="item-options d-flex align-center">
            <v-col class="item-options__type text-center" v-for="type in types" :key="type.id"
                   :class="{'active' : type.isActive}" @click="activeType(type.id)">
              <p>{{ type.title }}</p>
            </v-col>
          </div>

          <div class="d-flex item-options">
            <v-col class="item-options__size text-center" v-for="size in sizes" :key="size.id"
                   :class="{'active' : size.isActive}" @click="activeSize(size.id)">
              <p>{{ size.title }} см.</p>
            </v-col>
          </div>
        </div>

        <v-row class="menu__item-adding align-center">
          <v-col class="item-adding__price">
            <p>от {{ pizza.price }} ₽</p>
          </v-col>
          <button class="d-flex align-center item-adding__btn text-center">
            <span></span>
            <p>Добавить</p>
          </button>
        </v-row>
      </v-col>

      <v-col class="menu__item" v-for="pizza in pizzas" :key="pizza.pizza_id">
        <div class="menu__item-icon">
          <img :src="require(`@/assets/pizzas/${pizza.img}`)" alt="">
        </div>
        <div class="menu__item-title">
          <h2 class="text-center">{{ pizza.title }}</h2>
        </div>
        <div class="menu__item-options">
          <div class="item-options d-flex">
            <v-col class="item-options__type text-center" v-for="type in types" :key="type.type_id"
                   :class="{'active' : type.isActive}" @click="activeType(type.id)">
              <p>{{ type.title }}</p>
            </v-col>
          </div>

          <div class="item-options d-flex">
            <v-col class="item-options__size text-center" v-for="size in sizes" :key="size.size_id"
                   :class="{'active' : size.isActive}" @click="activeSize(size.id)">
              <p>{{ size.title }} см.</p>
            </v-col>
          </div>
        </div>

        <v-row class="menu__item-adding align-center">
          <v-col class="item-adding__price">
            <p>от {{ pizza.price }} ₽</p>
          </v-col>
          <button class="d-flex align-center item-adding__btn text-center">
            <span></span>
            <p>Добавить</p>
          </button>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'catalog',
  data() {
    return {
      categories: [],
      sortings: [
        {id: 1, title: 'популярности', isActive: true},
        {id: 2, title: 'цене', isActive: false},
        {id: 3, title: 'алфавиту', isActive: false}
      ],
      pizzas: [],
      types: [],
      sizes: [],
      categoryFilter: 1,
      sortFilter: 1,
      typeFilter: 1,
      sizeFilter: 1,
    }
  },
  computed: {
    filterTitle() {
      let category = this.categories.find(item => item.id === this.categoryFilter)
      return category?.title
    },
    filterSorting() {
      let sorting = this.sortings.find(item => item.id === this.sortFilter)
      return sorting?.title
    },
  },
  methods: {
    activeCategory(id) {
      for (let category in this.categories) {
        if (this.categories[category].id === id) {
          this.categories[category].isActive = true
          this.categoryFilter = id
        } else {
          this.categories[category].isActive = false
        }
      }
    },
    activeSorting(id) {
      for (let sort in this.sortings) {
        if (this.sortings[sort].id === id) {
          this.sortings[sort].isActive = true
          this.sortFilter = id
        } else {
          this.sortings[sort].isActive = false
        }
      }
    },
    activeType(id) {
      for (let type in this.types) {
        if (this.types[type].id === id) {
          this.types[type].isActive = true
          this.typeFilter = id
        } else {
          this.types[type].isActive = false
        }
      }
    },
    activeSize(id) {
      for (let size in this.sizes) {
        if (this.sizes[size].id === id) {
          this.sizes[size].isActive = true
          this.sizeFilter = id
        } else {
          this.sizes[size].isActive = false
        }
      }
    },
  },
  mounted() {
    axios.get('pizzas').then(response => {
      this.pizzas = response.data
    })
    axios.get('categories').then(response => {
      this.categories = response.data
      this.categories.map(item => {
        this.categories.indexOf(item) === 0 ? item.isActive = true : item.isActive = false
      })
    })
    axios.get('types').then(response => {
      this.types = response.data
      this.types.map(item => {
        this.types.indexOf(item) === 0 ? item.isActive = true : item.isActive = false
      })
    })
    axios.get('sizes').then(response => {
      this.sizes = response.data
      this.sizes.map(item => {
        this.sizes.indexOf(item) === 0 ? item.isActive = true : item.isActive = false
      })
    })

  }
}

</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.menu__navigation {

  &-categories {

    ul {
      padding: 0;
    }

    li {
      list-style-type: none;
      font-weight: 700;
      background-color: #F9F9F9;
      border-radius: 30px;
      padding: 12px 30px;
      margin-top: 40px;
      cursor: pointer;
    }

    li.active {
      background-color: #282828;
      color: #fff;
    }
  }

  &-sorting {
    justify-content: end;
    font-size: 14px;
    margin-top: 40px;

    p {
      font-weight: bold;
    }

    &-type {
      color: #FE5F1E;
      border-bottom: 1px dashed #FE5F1E;
    }
  }
}

.v-list-item:hover {
  background-color: rgba(254, 95, 30, 0.05);
  font-weight: 700;
  color: #FE5F1E !important;
  cursor: pointer;
}

.menu__heading {
  h1 {
    color: #000;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }
}

.menu__items {
  gap: 35px;

  .menu__item {
    padding-top: 44px;
    max-width: 280px;

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

  &:last-child {
    padding-bottom: 96px;
  }
}

.item-options__type, .item-options__size {
  cursor: pointer;
}

.item-options__type.active, .item-options__size.active {
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  margin: 7px;
  padding: 6px;
}

.menu__item-adding {
  margin-top: 27px;

  .item-adding {
    &__price {
      color: #000;
      font-size: 22px;
      font-weight: 700;
    }

    &__btn {
      color: #EB5A1E;
      font-weight: 700;
      border: 1px solid #EB5A1E;
      border-radius: 30px;
      padding: 14px 18px;

      &:hover {
        color: #fff;
        background-color: #FE5F1E;

        span {
          background: url("~@/assets/add-selected.svg");
        }
      }

      span {
        width: 12px;
        height: 12px;
        background: url("~@/assets/add.svg");
        margin-right: 7px;
      }
    }
  }
}

@media (max-width: 1236px) {
  .menu__navigation {
    flex-direction: column;

    &-sorting {
      justify-content: start;
      padding-top: 20px;
    }
  }
}

@media (max-width: 966px) {
  .menu__navigation {
    &-categories {
      ul {
        flex-wrap: wrap;

        li {
          max-width: 200px;
          text-align: center;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>