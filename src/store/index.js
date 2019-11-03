import Vue from 'vue'
import Vuex from 'vuex'
import mountings from './modules/mountings'

Vue.use(Vuex)

const state = {
  myModalShow:false
}
const mutations = {
  setMyModalShow(state, flag){
    state.myModalShow = flag
  }
}
const actions = {

}
export default new Vuex.Store({
  modules:{
    mountings
  },
  state,
  mutations,
  actions
})

