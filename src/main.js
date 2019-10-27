import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios.config'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './index.stylus';
import global from './globalConfig';

import MyModal from './components/myModal.vue';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.component('my-modal',MyModal);
Vue.prototype.$global = global;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
