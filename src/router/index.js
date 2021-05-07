import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SavedCalc from "../views/SavedCalc.vue";
import SingleCalc from "../views/SingleCalc.vue";
import Profile from "../views/Profile.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/SavedCalc",
    name: "SavedCalc",
    component: SavedCalc,
  },
  {
    path: "/SingleCalc/:timeStamp",
    name: "SingleCalc",
    component: SingleCalc,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
