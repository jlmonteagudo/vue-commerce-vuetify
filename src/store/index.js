import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    common
  }
})
