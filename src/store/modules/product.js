import * as db from '../../db'
import _ from 'lodash'

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const LOADING_PRODUCTS = 'LOADING_PRODUCTS'
export const SELECT_PRODUCT = 'SELECT_PRODUCT'

// initial state
const state = {
  loading: false,
  products: {},
  selectedProduct: undefined
}

// getters
const getters = {
  products: state => _.values(state.products),
  loading: state => state.loading,
  selectedProduct: state => state.products[state.selectedProduct]
}

// actions
const actions = {
  findAll ({ commit }) {
    commit(LOADING_PRODUCTS, true)

    db.products.get()
      .then((snapshot) => {
        let products = {}
        snapshot.forEach(doc => {
          let product = doc.data()
          product.id = doc.id
          products[product.id] = product
        })
        commit(RECEIVE_PRODUCTS, { products })
        commit(LOADING_PRODUCTS, false)
      })
  },

  selectProduct ({ commit }, selectedProduct) {
    commit(SELECT_PRODUCT, selectedProduct)
  },

  insert ({ commit, dispatch }, product) {
    return db.products.add(product)
  }

}

// mutations
const mutations = {
  [RECEIVE_PRODUCTS] (state, { products }) {
    state.products = products
  },
  [SELECT_PRODUCT] (state, selectedProduct) {
    state.selectedProduct = selectedProduct
  },
  [LOADING_PRODUCTS] (state, value) {
    state.loading = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
