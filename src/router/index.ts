import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
import { cookie_keys } from "@/constants";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "app-layout",
      component: () => import("@/components/layout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/products.all.vue"),
        },
        {
          path: "products",
          children: [
            {
              path: "create",
              name: "products.create",
              component: () => import("@/views/products.create.vue"),
            },
            {
              path: ":id/edit",
              name: "products.edit",
              component: () => import("@/views/products.edit.vue"),
            },
            {
              path: ":id",
              name: "products.show",
              component: () => import("@/views/products.show.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth/login",
      name: "auth.login",
      component: () => import("@/views/auth.login.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/not-found.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const { cookies } = useCookies();
  const isAuthenticated = cookies.get(cookie_keys.AUTH_TOKEN_KEY);
  if (to.name !== "auth.login" && !isAuthenticated) {
    next({ name: "auth.login" });
  } else if (to.name === "auth.login" && isAuthenticated) {
    next({ name: "home" });
  } else next();
});

export default router;
