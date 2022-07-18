import { createApp } from 'vue'
import App from './App.vue'
import {createStore} from 'vuex';
import store from './store'
import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './routes'


createApp(App)
    .use(createStore(store))
    .use(createRouter({
    history: createWebHashHistory(),
    routes
})).mount('#app')

