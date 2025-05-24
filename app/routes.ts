import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),

  // Chrome DevTools route
  ...prefix(".well-known/appspecific", [
    index("common/pages/devtools-page.tsx"),
  ]),

  // Viewpoints routes
  ...prefix("viewpoints", [
    index("features/viewpoints/pages/viewpoints-page.tsx"),
    ...prefix("map", [
      index("features/viewpoints/pages/viewpoints-map-page.tsx"),
    ]),
    ...prefix("popular", [
      index("features/viewpoints/pages/viewpoints-popular-page.tsx"),
    ]),
  ]),

  // Trails routes
  ...prefix("trails", [
    index("features/trails/pages/trails-page.tsx"),
    ...prefix("difficulty", [
      index("features/trails/pages/trails-difficulty-page.tsx"),
    ]),
    ...prefix("season", [
      index("features/trails/pages/trails-season-page.tsx"),
    ]),
    ...prefix("create", [
      index("features/trails/pages/trails-create-page.tsx"),
    ]),
  ]),

  // Posts routes
  ...prefix("posts", [
    index("features/community/pages/community-page.tsx"),
    ...prefix("new", [
      index("features/community/pages/community-new-page.tsx"),
    ]),
    ...prefix("popular", [
      index("features/community/pages/community-popular-page.tsx"),
    ]),
    ...prefix("create", [
      index("features/community/pages/community-create-page.tsx"),
    ]),
  ]),

  // My Page routes
  ...prefix("mypage", [
    ...prefix("profile", [index("features/users/pages/my-profile-page.tsx")]),
    ...prefix("trails", [index("features/users/pages/my-trails-page.tsx")]),
    ...prefix("posts", [index("features/users/pages/my-posts-page.tsx")]),
    ...prefix("saved-viewpoints", [
      index("features/users/pages/my-saved-viewpoints-page.tsx"),
    ]),
  ]),

  // Auth routes
  ...prefix("auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      ...prefix("login", [index("features/auth/pages/login-page.tsx")]),
      ...prefix("join", [
        index("features/auth/pages/join-page.tsx"),
        ...prefix("/otp", [
          route("/start", "features/auth/pages/otp-start-page.tsx"),
          route("/complete", "features/auth/pages/otp-complete-page.tsx"),
        ]),
        ...prefix("/social/:provider", [
          route("/start", "features/auth/pages/social-start-page.tsx"),
          route("/complete", "features/auth/pages/social-complete-page.tsx"),
        ]),
      ]),
      ...prefix("logout", [index("features/auth/pages/logout-page.tsx")]),
    ]),
  ]),
] satisfies RouteConfig;
