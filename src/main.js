import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './axios.config'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './index.stylus';
import global from './globalConfig';
import './filter';

import MyModal from './components/myModal.vue';
import ImgUpload from './components/imgUpload.vue';
import SingleInputManage from './components/singleInputManage.vue';
import CheckInput from './components/checkInput.vue';
import Upload from './components/upload.vue';
import TypeInput from './components/typeInput.vue';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.component('my-modal',MyModal);
Vue.component('img-upload',ImgUpload);
Vue.component('single-input-manage', SingleInputManage);
Vue.component('check-input', CheckInput);
Vue.component('upload', Upload);
Vue.component('type-input', TypeInput);
Vue.prototype.$global = global;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
