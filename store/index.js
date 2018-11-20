import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = () => new Vuex.Store({

  state: {
    userid:'',
    password:'',
    loginstate:true
  },
  mutations: {
    
  }
})

export default store