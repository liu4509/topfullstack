import HomeView from "@/views/HomeView.vue";
import Main from "@/views/Main.vue";
// import CourseList from "@/views/courses/CourseList.vue";
// import CourseEdit from "@/views/courses/CourseEdit.vue";
import ResourceCRUD from "@/views/ResourceCRUD.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Main,
    children: [
      { name: "home", path: "/", component: HomeView },
      {
        name: "courses-CRUD",
        path: "/:resource/list",
        component: ResourceCRUD,
        props: true,
      },
      // { name: "courses-list", path: "/courses/list", component: CourseList },
      // { name: "courses-Edit", path: "/courses/edit/:id", component: CourseEdit, props: true },
      // { name: "courses-create", path: "/courses/create", component: CourseEdit },
    ],
  },
];
// CourseCRUD
const router = new VueRouter({
  routes,
});

export default router;
