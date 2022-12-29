import {
  hashLocationPlugin,
  ReactStateDeclaration,
  servicesPlugin,
  UIRouterReact,
} from "@uirouter/react";

export const router = new UIRouterReact();

const states: ReactStateDeclaration[] = [
  {
    url: "/",
    name: "login.**",
    lazyLoad: () => import("./screens/Authentication/LoginPage"),
  },
  {
    url: "/register",
    name: "register.**",
    lazyLoad: () => import("./screens/Authentication/Register"),
  },
  {
    url: "/reset-password",
    name: "reset-password.**",
    lazyLoad: () => import("./screens/Authentication/ResetPassword"),
  },
  {
    url: "/forget-password",
    name: "forget-password.**",
    lazyLoad: () => import("./screens/Authentication/ForgetPassword"),
  },
  {
    url: "/home",
    name: "home.**",
    lazyLoad: () => import("./Home"),
  },
  {
    url: "/image-genratetor",
    name: "image-genratetor.**",
    lazyLoad: () => import("./screens/ImageGenrator"),
  },
  {
    url: "/email",
    name: "email.**",
    lazyLoad: () => import("./screens/EmailGenrator"),
  },
  {
    url: "/seo",
    name: "seo.**",
    lazyLoad: () => import("./screens/SeoTagGenrator"),
  },
  {
    url: "/blog",
    name: "blog.**",
    lazyLoad: () => import("./screens/BlogPostGenrator"),
  },
];

states.forEach((state) => router.stateRegistry.register(state));

router.urlRouter.otherwise("/");
router.plugin(hashLocationPlugin);
router.plugin(servicesPlugin);

export const $state = router.stateService;
export const $transition = router.transitionService;
