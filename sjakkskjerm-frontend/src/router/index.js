import { createRouter, createWebHistory } from "vue-router";
import Tournament from "../views/Tournament.vue";
import Tournaments from "../views/Tournaments.vue";
import SendMessage from "../components/admin/SendMessage.vue";
import Login from "../components/userconfig/Login";
import Dashboard from "../components/userconfig/Dashboard";
import Register from "../components/userconfig/Register";
import store from "../store/index"

const routes = [
  {
    path: "/",
    name: "Tournaments",
    component: Tournaments,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiredAuth: false
    }
  },
  {
    path: "/live",
    name: "Live",
    component: Tournament,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: "/tournament/:id",
    name: "Tournament",
    props: true,
    component: Tournament,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: "/admin/sendmessage",
    name: "Send Melding",
    component: SendMessage,
    meta: {
      requiredAuth: true
    }
  }, 
  {
    path: "/login",
    component: Login,
    meta: {
      requiredAuth: false
    }
  }, 
  {
    path: "/profil",
    component: Dashboard,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      requiredAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/*
router.beforeEach((to,from, next) => {
  if(to.meta.requiredAuth){
      const auth = store.getters["auth/isTokenActive"];
      if(!auth){
         return next({path: '/login'});
      }
  }
  return next();
});*/

router.beforeEach((to, from, next) => {
  //console.log(store.getters["auth/getAuthData"].token);
  if(!store.getters["auth/getAuthData"].token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if(access_token) {
      const data = {
        access_token:access_token,
        refresh_token:refresh_token
      };
      store.commit('auth/saveTokenData', data);
    }
  }

  const auth = store.getters["auth/isTokenActive"];

  if(to.fullPath == "/") {
    return next();
  }

  else if(to.fullPath == "/login" && auth) {
    return next({path: '/profil'})
  }

  else if(to.fullPath == "/register" && auth) {
    return next({path: '/profil'})
  }

  else if(!auth && to.meta.requiredAuth) {
    return next({path: '/login'});
  }

  return next();
});

export default router;
