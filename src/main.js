/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import firebase from 'firebase';
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyD8jOkRQ1NgqHMJHhkokRpXuTRYzG7Eh5s",
  authDomain: "vueshop-ef5e4.firebaseapp.com",
  databaseURL: "https://vueshop-ef5e4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vueshop-ef5e4",
  storageBucket: "vueshop-ef5e4.appspot.com",
  messagingSenderId: "621581324688",
  appId: "1:621581324688:web:8df21c126947f72936e315",
  measurementId: "G-SHMP1BYJQ8"
}

firebase.initializeApp(firebaseConfig);


Vue.use(Argon);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
