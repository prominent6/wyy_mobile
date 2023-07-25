//路由管理
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/itemMusic",
    name: "ItemMusic",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Search.vue"),
  },
  {
    path: "/rank",
    name: "Rank",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rank.vue"),
  },
  {
    path: "/comment/simi",
    name: "Comment",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Comment.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
