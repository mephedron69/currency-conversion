import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    currency: localStorage.getItem('currency') || "rub",
    allCurrencies: ""
  },
  getters: {
    getCurrency: (state) => state.currency,
    getAllCurrencies: (state) => state.allCurrencies,
  },
  mutations: {
    UPDATE_CURRENCY(state, currency) {
      state.currency = currency
      localStorage.setItem("currency", currency);
    },
    async GET_API_CURRENCIES(state) {
      await axios.get(`https://status.neuralgeneration.com/api/currency`)
      .then(res => {
        state.allCurrencies = res.data;
      })
      .catch(err => {
        state.allCurrencies = "";
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
