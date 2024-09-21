import axios from "axios";

const employee = {
  namespaced: true,
  state: {
    balance: 1000,
    name: "ralph santolorin",
    isLogin: false
  },
  mutations: {
    increment(state, payload) {
      state.balance += payload;
    },
    changeName(state, payload) {
        state.name = payload
    },
    login(state){
        state.isLogin = true
    }
  },
  actions: {
    async getData(tae) {
      try {
        const response = await axios.get('https://65b37959770d43aba479d655.mockapi.io/foods')
        if(response) {
            console.log(response.data)
            tae.commit('increment', 999999)
        }
      } catch (error) {
        console.log(`error: ${error}`)
      }
    },
  },
  getters: {
    getThis(state) {
      return state.balance;
    },
  },
};

export default employee;
