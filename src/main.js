import Vue from "vue"
import App from "./App"
import router from "./router"
import firebase from "firebase"
import "./components/firebaseset"

Vue.config.productionTip = false
Vue.config.devtools = true

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      components: { App },
      template: "<App/>"
    })
  }
})
