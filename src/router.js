import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import UserHeader from "./layout/UserHeader";
import Components from "./views/Components.vue";

import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Starter from "./views/Starter.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
   
    {
      path: "/home",
      name: "starter",
      components: {
        header: UserHeader,
        default: Starter,
        footer: AppFooter
      }
    },
    
    
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: UserHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/Logout",
      name: "Logout",
      components: {
        header: UserHeader,
        default: Logout,
        footer: AppFooter
      }
    }
  ],
  
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
