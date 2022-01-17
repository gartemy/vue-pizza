<template>
  <v-main class="menu">
    <v-container>
      <v-row class="menu__navigation justify-space-between align-center">
        <v-col class="menu__navigation-categories">
          <ul class="d-flex">
            <li v-for="category in categories" :key="category.category_id"
                :class="{'active' : category.category_id === activeCategory}"
                @click="activeCategory = category.category_id" class="me-2">{{ category.title }}
            </li>
          </ul>
        </v-col>

        <v-col xl="3" class="d-flex align-center flex-wrap menu__navigation-sorting">
          <svg :class="{'rotated' : menu }" class="me-2" width="10" height="6" viewBox="0 0 10 6" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"></path>
          </svg>
          <p class="me-2">Сортировка по: </p>
          <v-menu offset-y v-model="menu">
            <template v-slot:activator="{on, attrs}">
              <span class="menu__navigation-sorting-type" v-bind="attrs" v-on="on">{{ filterSorting }}</span>
            </template>
            <v-list>
              <v-list-item v-for="sorting in sortings" :key="sorting.sorting_id">
                <v-list-item-title @click="activeSorting = sorting.sorting_id">{{
                    sorting.title
                  }}
                </v-list-item-title>
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

      <v-row class="menu__items justify-center">
        <pizza v-for="pizza in sortedPizzas"
               :key="pizza.id"
               :pizza="pizza">
        </pizza>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'
import pizza from './Pizza'

export default {
  name: 'catalog',
  components: {pizza},
  data() {
    return {
      categories: [],
      sortings: [],
      activeCategory: 1,
      activeSorting: 1,
      menu: false
    }
  },
  computed: {
    filterTitle() {
      let category = this.categories.find(item => item.category_id === this.activeCategory)
      return category?.title
    },
    filterSorting() {
      let sorting = this.sortings.find(item => item.sorting_id === this.activeSorting)
      return sorting?.title
    },
    sortedPizzas() {
      let pizzasArray = this.$store.getters.pizzas

      if (this.activeCategory !== 1) {
        pizzasArray = pizzasArray.filter(item => item.category_id === this.activeCategory)
      }

      if (this.activeSorting === 1) {
        pizzasArray.sort((a, b) => b.rating - a.rating)
      } else if (this.activeSorting === 2) {
        pizzasArray.sort((a, b) => a.prices[1] - b.prices[1])
      } else {
        pizzasArray.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
        })
      }

      return pizzasArray
    },
  },
  mounted() {
    if (!this.$store.getters.pizzas.length) {
      this.$store.dispatch('setPizzas')
    }
    axios.get('categories').then(response => {
      this.categories = response.data
    })
    axios.get('sortings').then(response => {
      this.sortings = response.data
    })
  }
}
</script>

<style lang="scss" scoped>

svg {
  transform: rotate(180deg);
}

svg.rotated {
  transform: rotate(0)
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

  &:last-child {
    padding-bottom: 96px;
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