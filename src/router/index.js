import { createRouter, createWebHistory } from "vue-router";
import Tournament from "../views/Tournament.vue";
import Tournaments from "../views/Tournaments.vue";
import TournamentDashboard from "../views/TournamentDashboard";
import Login from "../components/userconfig/Login";
import Profile from "../components/userconfig/Profile";
import Register from "../components/userconfig/Register";
import AdminPanel from "../components/admin/AdminPanel";
import store from "../store/index";
import CreateTournament from "@/components/tournaments/CreateTournament.vue";
import NotFoundComponent from "@/components/NotFoundComponent.vue";

const routes = [
  {
    path: "/",
    name: "Tournaments",
    component: Tournaments,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/live",
    name: "Live",
    component: Tournament,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/tournament/:id",
    name: "Tournament",
    props: true,
    component: Tournament,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/profil",
    component: Profile,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/admin/panel",
    component: AdminPanel,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/dashboard/:id",
    name: "TournamentDashboard",
    props: true,
    component: TournamentDashboard,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/createtournament",
    name: "Create tournaments",
    component: CreateTournament,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundComponent,
    name: "NotFound",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.getters["auth/getAuthData"].token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      const data = {
        access_token: access_token,
        refresh_token: refresh_token,
      };
      store.commit("auth/saveTokenData", data);
    }
  }

  const auth = store.getters["auth/isTokenActive"];

  if (to.fullPath == "/") {
    return next();
  } else if (to.fullPath == "/login" && auth) {
    return next({ path: "/profil" });
  } else if (to.fullPath == "/register" && auth) {
    return next({ path: "/profil" });
  } else if (!auth && to.meta.requiredAuth) {
    localStorage.clear();
    return next({ path: "/login" });
  }

  return next();
});

export default router;
