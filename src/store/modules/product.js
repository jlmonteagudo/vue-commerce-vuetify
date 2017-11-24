import * as db from '../../db'
import _ from 'lodash'

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const LOADING_PRODUCTS = 'LOADING_PRODUCTS'
export const SELECT_PRODUCT = 'SELECT_PRODUCT'
export const SET_TOTAL_NUMBER_OF_PRODUCTS = 'SET_TOTAL_NUMBER_OF_PRODUCTS'
export const SET_PAGINATION_FIRST_PRODUCT = 'SET_PAGINATION_FIRST_PRODUCT'
export const SET_PAGINATION_LAST_PRODUCT = 'SET_PAGINATION_LAST_PRODUCT'
export const UPDATE_PAGINATION_DATA = 'UPDATE_PAGINATION_DATA'

// initial state
const state = {
  loading: false,
  products: {},
  totalNumberOfProducts: 0,
  selectedProduct: undefined,
  pagination: {
    rowsPerPage: 5,
    page: 1,
    lastProduct: undefined,
    firstProduct: undefined
  }
}

// getters
const getters = {
  products: state => _.values(state.products),
  totalNumberOfProducts: state => state.totalNumberOfProducts,
  loading: state => state.loading,
  selectedProduct: state => state.products[state.selectedProduct]
}

// actions
const actions = {

  find (context) {
    let productsQuery = db.products.orderBy('title').limit(context.state.pagination.rowsPerPage)
    findProducts(context, productsQuery)
  },

  findNext (context) {
    let productsQuery = db.products.orderBy('title').limit(context.state.pagination.rowsPerPage).startAfter(context.state.pagination.lastProduct)
    findProducts(context, productsQuery)
  },

  findPrevious (context) {
    let productsQuery = db.products.orderBy('title').limit(context.state.pagination.rowsPerPage).endBefore(context.state.pagination.firstProduct)
    // let productsQuery = db.products.orderBy('title').limit(context.state.pagination.rowsPerPage).endAt(context.state.pagination.lastProduct)
    findProducts(context, productsQuery)
  },

  selectProduct ({ commit }, selectedProduct) {
    commit(SELECT_PRODUCT, selectedProduct)
  },

  insert ({ commit, dispatch }, product) {
    return db.products.add(product)
  },

  update ({ commit, dispatch }, product) {
    return db.products.doc(product.id).update({
      title: product.title,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price
    })
  },

  delete ({ commit, dispatch }, product) {
    return db.products.doc(product.id).delete()
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
  },
  [SET_TOTAL_NUMBER_OF_PRODUCTS] (state, value) {
    state.totalNumberOfProducts = value
  },
  [SET_PAGINATION_FIRST_PRODUCT] (state, value) {
    state.pagination.firstProduct = value
  },
  [SET_PAGINATION_LAST_PRODUCT] (state, value) {
    state.pagination.lastProduct = value
  },
  [UPDATE_PAGINATION_DATA] (state, {rowsPerPage, page}) {
    state.pagination.rowsPerPage = rowsPerPage
    state.pagination.page = page
  }
}

// private helper functions
function getProductsFromSnapshot (snapshot) {
  let products = {}
  snapshot.forEach(doc => {
    let product = doc.data()
    product.id = doc.id
    products[product.id] = product
  })

  return products
}

function findProducts (context, productsQuery) {
  let statsQuery = db.stats.doc('products')

  context.commit(LOADING_PRODUCTS, true)

  Promise.all([productsQuery.get(), statsQuery.get()]).then(values => {
    let snapshotProducts = values[0]
    let snapshotNumberOfProducts = values[1]
    let products = getProductsFromSnapshot(snapshotProducts)
    setupPagination(context, snapshotProducts, snapshotNumberOfProducts)
    context.commit(RECEIVE_PRODUCTS, { products })
    context.commit(LOADING_PRODUCTS, false)
  })
}

function setupPagination (context, snapshotProducts, snapshotNumberOfProducts) {
  context.commit(SET_PAGINATION_FIRST_PRODUCT, snapshotProducts.docs[0])
  context.commit(SET_PAGINATION_LAST_PRODUCT, snapshotProducts.docs[snapshotProducts.docs.length - 1])
  context.commit(SET_TOTAL_NUMBER_OF_PRODUCTS, snapshotNumberOfProducts.data().count)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
