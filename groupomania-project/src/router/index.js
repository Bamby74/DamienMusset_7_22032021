import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Publications from "../views/Publications.vue";
import Profil from "../views/Profil.vue";
import Post from "../views/Post.vue";
import Comments from "../views/Comments.vue";
import WritingComment from "../views/WritingComment.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/publications",
    name: "publications",
    component: Publications
  },
  {
    path: "/profil",
    name: "profil",
    component: Profil
  },
  {
    path: "/post",
    name: "post",
    component: Post
  },
  {
    path: "/comments",
    name: "comments",
    component: Comments
  },
  {
    path: "/writingComment",
    name: "writingComment",
    component: WritingComment
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
