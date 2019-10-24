/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
//

window.Vue = require('vue');

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './views/Home';
import request from './services/request';
window.axios = request;

const routes = [
  {
    path: '', component: Home, name: 'Home',
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

new Vue({
    el: '#app',
    components: {},
    router,
});
