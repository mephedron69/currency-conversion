<template>
  <div class="convertPage container">
    <p class="convertPage-title">Конвертер валют</p>
    <div class="convertPage__content">
      <div class="convertPage__content__input">
        <input type="number" v-model="firstValue.number" @input="ifChangedConversation('first')"/>
        <div class="convertPage__content__input__box" v-click-outside="closeFirst">
          <div class="convertPage__content__input__box-main" @click="firstValue.opener = !firstValue.opener">
            <p>{{ firstValue.selected }}</p>
            <img src="@/assets/icons/dropdown.svg" :style="firstValue.opener ? 'rotate: 180deg;' : 'rotate: 0deg;'"/>
          </div>
          <transition name="openSelect">
            <div class="convertPage__content__input__box__data" v-if="firstValue.opener">
              <div :class="{'active': item == firstValue.selected}" v-for="(item) in filteredAllCurrencies" :key="item" >
                <p  v-if="item !== secondValue.selected" @click="selectCurrency('first', item)">{{ item }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="convertPage__content-change" @click="swapCurrencies()">
        <img src="@/assets/icons/change.svg"/>
      </div>

      <div class="convertPage__content__input">
        <input type="number" v-model="secondValue.number"/>
        <div class="convertPage__content__input__box"  v-click-outside="closeSecond">
          <div class="convertPage__content__input__box-main" @click="secondValue.opener = !firstValue.opener">
            <p>{{ secondValue.selected }}</p>
            <img src="@/assets/icons/dropdown.svg" :style="secondValue.opener ? 'rotate: 180deg;' : 'rotate: 0deg;'"/>
          </div>
          <transition name="openSelect">
            <div class="convertPage__content__input__box__data"  v-if="secondValue.opener">
              <div :class="{'active': item == secondValue.selected}" v-for="(item) in filteredAllCurrencies" :key="item">
                <p v-if="item !== firstValue.selected" @click="selectCurrency('second', item)">{{ item }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      firstValue: {
        number: 0,
        selected: 'rub'
      },
      secondValue: {
        number: 0,
        selected: 'usd'
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrency', 'getAllCurrencies']),
    filteredAllCurrencies() {
      const currencyAPI = Object.keys(this.getAllCurrencies);
      const currenciesNew = new Set();

      currencyAPI.forEach(item => {
        item.split('-').forEach(elem => currenciesNew.add(elem));
      });

      return Array.from(currenciesNew);
    }
  },
  methods: {
    ifChangedConversation(type) {
      const fromCurrency = (type === 'first' ? this.firstValue.selected : this.secondValue.selected);
      const toCurrency = (type === 'first' ? this.secondValue.selected : this.firstValue.selected);
      const amount = (type === 'first' ? this.firstValue.number : this.secondValue.number);

      this.convertCurrency(fromCurrency, toCurrency, amount, type);
    },
    convertCurrency(from, to, amount, type) {
      const conversionKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
      const rate = this.getAllCurrencies[conversionKey];
      const convertedAmount = (amount * rate).toFixed(2);

      if (type === 'first') {
        this.secondValue.number = convertedAmount;
      } 
      else {
        this.firstValue.number = convertedAmount;
      }
    },
    selectCurrency(type, value) {
      if (type === 'first') {
        this.firstValue.selected = value;
      } else {
        this.secondValue.selected = value;
      }
      this.ifChangedConversation(type);
    },
    swapCurrencies() {
      [this.firstValue.selected, this.secondValue.selected] = [this.secondValue.selected, this.firstValue.selected];
      this.ifChangedConversation('first');
    },
    closeSecond() {
      this.secondValue.opener = false;
    },
    closeFirst() {
      this.firstValue.opener = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.convertPage {
  margin-top: 30px;
  margin-bottom: 80px;
  &-title {
    margin: 30px 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    span {
      text-transform: uppercase;
    }
  }
  &__content {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    &__input {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #e0e0e0;
      background: white;
      border-radius: 5px;
      input {
        width: 100%;
        padding: 8px 12px;
        outline: none;
        border-color: transparent;
      }
      &__box {
        cursor: pointer;
        width: 20%;
        position: relative;
        text-transform: uppercase;
        &-main {  
          min-height: 43px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: #FFC300;
          color: white;
          font-size: 14px;
          padding: 12px;
          border-radius: 0 4px 4px 0;
          p {
            overflow: initial;
          }
          img {
            transition: all 0.3s ease;
            width: 12px;
            filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(182deg) brightness(103%) contrast(103%);
          }
        }
        &__data {
          position: absolute;
          min-width: 100%;
          z-index: 1;
          display: flex;
          flex-direction: column;
          top: 105%;
          background: white;
          box-shadow: 0px 0px 10px 0px #00000026;
          border-radius: 0 0 5px 5px;
          overflow: hidden;
          p {
            font-size: 14px;
            padding: 4px 12px;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            &:hover {
              background: #FFC300;
              color: white;
            }
          }
          .active {
            background: #FFC300;
            color: white;
          }
        }
      }
    }

    &-change {
      cursor: pointer;
      width: 35px;
    }
  }
}
</style>