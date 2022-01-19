<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header__items d-flex justify-space-between">
            <h3 class="mb-2">Куда доставить?</h3>
            <div class="modal-header__close" @click="hideOrder"></div>
          </div>
        </div>

        <div class="modal-body">
          <div class="tabs">
            <ul class="tab">
              <li v-for="tab in tabs" :key="tab.id" class="tab__item" :class="{active: tab.id === activeTab}">
                <button type="button" class="tab__link" @click="activeTab = tab.id">
                  <span>{{ tab.title }}</span>
                </button>
              </li>
            </ul>
          </div>

          <div v-if="activeTab === 1" class="modal-body__order">
            <div class="modal-body__order-info d-flex">
              <input type="text" v-model="homeAddress.street" placeholder="Улица" @keypress="isNumber">
              <input v-if="homeAddress.street === ''" type="text" :value="''" placeholder="Дом" :disabled="!homeAddress.street">
              <input v-else type="text" v-model=" homeAddress.house" placeholder="Дом">
              <input type="text" v-model="homeAddress.flat" placeholder="Квартира" @keypress="isNotNumber">
              <input type="text" v-model="homeAddress.door" placeholder="Подъезд" maxlength="2" @keypress="isNotNumber">
              <input type="text" v-model="homeAddress.stage" placeholder="Этаж" maxlength="2" @keypress="isNotNumber">
              <textarea rows="3" v-model="homeAddress.comment" placeholder="Комментарий к заказу" maxlength="140"></textarea>
            </div>
            <button class="pay-btn confirm-btn" @click="makeOrder"
                    :disabled="!homeAddress.street || !homeAddress.house">Подтвердить заказ
            </button>
          </div>

          <div v-else class="modal-body__order">
            <div class="modal-body__order-info d-flex">
              <input type="text" v-model.lazy="workAddress.street" placeholder="Улица" @keypress="isNumber">
              <input type="text" v-model="workAddress.house" placeholder="Здание" :disabled="!workAddress.street">
              <textarea rows="3" v-model="workAddress.comment" placeholder="Комментарий к заказу" maxlength="140"></textarea>
            </div>
            <button class="pay-btn confirm-btn" @click="makeOrder"
                    :disabled="!workAddress.street || !workAddress.house">Подтвердить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Order",
  data() {
    return {
      activeTab: 1,
      tabs: [
        {id: 1, title: 'Дом', isActive: true},
        {id: 2, title: 'Работа', isActive: false}
      ],
      homeAddress: {
        street: '',
        house: '',
        flat: '',
        door: '',
        stage: '',
        comment: ''
      },
      workAddress: {
        street: '',
        house: '',
        comment: ''
      }
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
    hideOrder() {
      this.$emit('hideOrder')
    },
    async makeOrder() {
      try {
        if (this.activeTab === 1) {
          await axios.post('orders', {
            orderInfo: this.homeAddress,
            totalPrice: this.$store.getters.totalPrice,
            cartItems: this.$store.getters.cartItems
          }, {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}
          })
        } else if (this.activeTab === 2) {
          await axios.post('orders', {
            orderInfo: this.workAddress,
            totalPrice: this.$store.getters.totalPrice,
            cartItems: this.$store.getters.cartItems
          }, {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}
          })
        }
        this.$store.commit('CLEAR_CART')
        this.$store.commit('RESET_PIZZAS')
        this.hideOrder()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {

  &-container {
    width: 880px;
    padding: 40px 50px;
  }

  &-header {

    &__items {
      align-items: center;
    }

    h3 {
      max-width: 400px;
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
    margin: 30px 0;

    .tabs {
      margin: 17px 0 5px;

      .tab {
        margin: 0;
        padding-left: 0;
        list-style: none;
        border-bottom: 1px solid rgb(223, 219, 216);

        &__item {
          margin-bottom: -1px;
          position: relative;
          display: inline-block;
          height: 40px;

          &.active:first-child {
            margin-left: 0;
          }

          &.active .tab__link {
            color: rgb(255, 105, 0);
            cursor: default;
            border-top: none;
            border-right: none;
            border-left: none;
            border-image: initial;
            border-bottom: 4px solid rgb(255, 105, 0);
            padding: 4px 0px;
            top: 3px;
            background: none;
          }

          &.active .tab__link span {
            top: -3px;
            position: relative;
          }

          &:first-child {
            margin-left: -10px;
          }
        }

        &__link {
          position: relative;
          display: block;
          padding: 4px 10px;
          height: 40px;
          margin-right: 22px;
          line-height: 1.42857;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px 8px 0px 0px;
          color: rgb(0, 0, 0);
          text-decoration: none;
          font-size: 21px;
        }
      }
    }

    &__order {

      &-info {
        padding-top: 30px;
        flex-wrap: wrap;
        gap: 10px;

        p {
          color: rgb(92, 99, 112);
          font-size: 14px;
          font-weight: 400;
        }

        input {
          height: 48px;
          padding: 14px 16px;
          border-radius: 12px;
          width: calc(25% - 10px);
          border: 1px solid rgb(226, 226, 233);
          background-color: #FFFFFF;
          resize: none;

          &:disabled {
            background-color: rgb(243, 243, 247);
            cursor: not-allowed;
          }

          &:first-child {
            width: calc(75% - 10px);
          }

          &:focus {
            border-color: rgb(255, 105, 0);
            outline: none;
          }
        }

        textarea {
          margin: 20px 0;
          width: calc(100% - 10px);
          min-height: 48px;
          height: auto;
          border: 1px solid rgb(226, 226, 233);
          background-color: rgb(255, 255, 255);
          border-radius: 12px;
          padding: 14px 16px;
          resize: none;

          &:focus {
            border-color: rgb(255, 105, 0);
            outline: none;
          }
        }
      }
    }
  }
}

.confirm-btn {
  margin-top: 10px;
  font-size: 16px;
  width: 210px;
  border-radius: 30px;
  padding: 16px;
  transition: all .15s ease-in-out;

  &:disabled {
    background-color: rgb(226, 226, 233);
    color: rgb(171, 173, 186) !important;
    cursor: not-allowed;

    &:hover {
      background-color: rgb(226, 226, 233) !important;
    }
  }
}

*::placeholder {
  font-weight: 500;
}

@media (max-width: 900px) {
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

@media (max-width: 700px) {
  .modal-body {

    &__order-info {
      flex-wrap: nowrap;
      flex-direction: column;

      input {
        width: 50%;
      }

      input:first-child {
        width: 100%;
      }

      textarea {
        width: 100%;
      }
    }
  }
}

@media (max-width: 425px) {
  .modal-container {
    padding: 40px 25px;
  }
  .modal-header {
    align-items: flex-start;
  }
  .modal-body {
    input {
      width: 100%;
    }

    button {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>