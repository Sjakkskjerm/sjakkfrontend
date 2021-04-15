import { createRouter, createWebHistory } from "vue-router";
import Tournament from "../views/Tournament.vue";
import Tournaments from "../views/Tournaments.vue";
import SendMessage from "../components/admin/SendMessage.vue";

const routes = [
  {
    path: "/",
    name: "Tournaments",
    component: Tournaments
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/live",
    name: "Live",
    component: Tournament
  },
  {
    path: "/tournament/:id",
    name: "Tournament",
    props: true,
    component: Tournament
  },
  {
    path: "/admin/sendmessage",
    name: "Send Melding",
    component: SendMessage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
