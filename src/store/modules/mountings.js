import axios from "axios"

const state = {
  textureList:[],
  typeList:[],
  textureManageModal:false,
  typeManageModal:false
}
const getters = {

}
const mutations = {
  setTextureList(state, value){
    state.textureList = value
  },
  setTypeList(state, value){
    state.typeList = value
  },
  setTextureManageModal(state,value){
    state.textureManageModal = value
  },
  setTypeManageModal(state,value){
    state.typeManageModal = value
  }
}
const actions = {
  async setTextureList(store,list){
    store.commit('setTextureList', list)
    return
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setTextureList',data)
  },
  async setTypeList(store,list){
    store.commit('setTypeList', list)
    return 
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setTypeList',data)
  },
  async getTypeList(store){
    store.commit('setTypeList', [
      {typeName:'盆子',id:1},
      {typeName:'花朵',id:2},
      {typeName:'花枝',id:3},
    ])
    return
    let data = axios.get('/get')
    store.commit('setTypeList', data)
  },
  async getTextureList(store, list){
    store.commit('setTextureList', [
      { materialName: '塑料', id: 1 },
      { materialName: '陶瓷', id: 2 },
      { materialName: '沙子', id: 3 }
    ])
    return
    let data = axios.get('/get')
    store.commit('setTextureList', data)
  },
}
const mountings = {
  state,
  getters,
  mutations,
  actions
}
export default mountings