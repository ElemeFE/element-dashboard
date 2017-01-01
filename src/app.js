import Vue from 'vue';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import Breadcrumb from './components/breadcrumb';

import Mock from './mock';
// start mock
Mock.bootstrap();

import App from './app.vue';
import routes from './routes';
import './style.scss';

Vue.use(VueRouter);
Vue.use(ElementUI);

// register dashboard components
Vue.component('db-breadcrumb', Breadcrumb);

export const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
