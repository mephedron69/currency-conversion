<template>
  <div class="homePage container">
    <p class="homePage-title">Курсы валют в <span>{{getCurrency}}</span></p>
    <div class="homePage__exchanges" v-if="filteredCurrencies.length">
      <div class="homePage__exchanges__item" v-for="(item) in filteredCurrencies" :key="item.id"> 
          <p>{{item.title.slice(-3)}}: <span>{{item.value}}</span></p>
      </div>
    </div>
    <div class="homePage-loader" v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from '@/components/UI/Loader.vue'
import { mapGetters } from 'vuex';
export default {
  components: {Loader},
  computed: {
    ...mapGetters(['getCurrency', 'getAllCurrencies']),
    filteredCurrencies() {
      return Object.keys(this.getAllCurrencies)
        .filter(elem => elem.startsWith(this.getCurrency.toLowerCase() + "-"))
        .map(item => ({
          title: item.toUpperCase(),
          value: this.getAllCurrencies[item]
        }));
    }
  }
}
</script>

<style lang="scss" scoped>
.homePage {
  margin-bottom: 80px;
  &-title {
    margin: 30px 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    span {
      text-transform: uppercase;
    }
  }
  &__exchanges {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    row-gap: 10px;
    border-radius: 5px;
    padding: 20px;
    background: white;
    &__item {
      text-transform: uppercase;
      border-radius: 5px;
      padding: 5px;
      box-shadow: 0px 0px 10px 0px #00000026;
      width: calc(50% - 10px);
      span {
        color: #FFC300;
        font-weight: 600;
      }
    }
  }
  &-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 2.5;
    background: white;
    border-radius: 5px;
  }
}
</style>