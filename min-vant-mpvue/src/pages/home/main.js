import Vue from 'vue'
import App from './index'

Vue.config.errorHandler = function (error) {
  console.log(error)
}

const app = new Vue(App)
app.$mount()
