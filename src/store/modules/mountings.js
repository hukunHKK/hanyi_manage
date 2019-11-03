import axios from "axios"

const state = {
  textureList:[],
  typeList:[1,2]
}
const getters = {

}
const mutations = {
  setTextureList(state, value){
    state.textureList = value
  },
  setTypeList(state, value){
    state.textureList = value
  }
}
const actions = {
  async getTextureList(store,list){
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setTextureList',data)
  },
  async getTypeList(store,list){
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setTypeList',data)
  }
}
const mountings = {
  state,
  getters,
  mutations,
  actions
}
export default mountings