export const SHOW_MESSAGE = 'SHOW_MESSAGE'

// initial state
const state = {
  message: {
    visible: false,
    text: '',
    icon: '',
    color: ''
  }
}

// getters
const getters = {
  message: state => state.message
}

// actions
const actions = {
  showMessage ({ commit }, message) {
    commit(SHOW_MESSAGE, message)
  }
}

// mutations
const mutations = {
  [SHOW_MESSAGE] (state, message) {
    message.visible = true
    state.message = message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
