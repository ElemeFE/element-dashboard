import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './app.vue';
import routes from './routes';
import './style.scss';

Vue.use(VueRouter);
Vue.use(ElementUI);

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
