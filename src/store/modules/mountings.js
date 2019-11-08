import axios from "axios"

const state = {
  textureList:[],
  textureManageModal:false,
  typeList:[],
  typeManageModal:false,
  cartonList:[],
  cartonManageModal:false,
  paperCardList:[],
  paperCardManageModal:false
}
const getters = {

}
const mutations = {
  //配件材质
  setTextureList(state, value){
    state.textureList = value
  },
  setTextureManageModal(state, value) {
    state.textureManageModal = value
  },
  //配件类型
  setTypeList(state, value){
    state.typeList = value
  },
  setTypeManageModal(state,value){
    state.typeManageModal = value
  },
  //纸箱
  setCartonList(state, value) {
    state.cartonList = value
  },
  setCartonManageModal(state,value){
    state.cartonManageModal = value
  },
  //纸卡
  setPaperCardList(state, value) {
    state.paperCardList = value
  },
  setPaperCardManageModal(state,value){
    state.paperCardManageModal = value
  },
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
  async setPaperCardList(store,list){
    store.commit('setPaperCardList', list)
    return 
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setPaperCardList',data)
  },
  async setCartonList(store,list){
    store.commit('setCartonList', list)
    return 
    await axios.post('/set',list)
    let data = axios.get('/get')
    store.commit('setCartonList',data)
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
  async getPaperCardList(store, list){
    store.commit('setPaperCardList', [
      { paperCardName: '压线卡', id: 1 },
      { paperCardName: '平卡', id: 2 },
      { paperCardName: '一刀卡', id: 3 },
      { paperCardName: '围卡', id: 4 }
    ])
    return
    let data = axios.get('/get')
    store.commit('setPaperCardList', data)
  },
  async getCartonList(store, list){
    store.commit('setCartonList', [
      { cartonName: '大箱', id: 1 },
      { cartonName: '中箱', id: 2 },
      { cartonName: '小箱', id: 3 }
    ])
    return
    let data = axios.get('/get')
    store.commit('setCartonList', data)
  },
}
const mountings = {
  state,
  getters,
  mutations,
  actions
}
export default mountings