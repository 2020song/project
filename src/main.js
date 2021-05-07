import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router'

//路由守卫
import './permission' // permission control

//引入store
import store from './store'

//ui框架
import Vant from 'vant';
import 'vant/lib/index.css';

//引入公共css
import "./css/base.scss"

// //引入高德地图
// import VueAMap from 'vue-amap';

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'f7b8415ab125c479274519072eed2bdb',
//   plugin: ['AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4',
//   uiVersion: '1.0.11' // 版本号
// });

window.addEventListener('popstate', function (e) {
  router.isBack = true
},false)

Vue.use(Vant);
import { Lazyload } from 'vant';

Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
