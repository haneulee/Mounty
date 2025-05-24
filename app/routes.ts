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
    route(
      "/:viewpointId",
      "features/viewpoints/pages/viewpoints-detail-page.tsx"
    ),
    route("new", "features/viewpoints/pages/submit-viewpoint-page.tsx"),
  ]),

  // Trails routes
  ...prefix("trails", [
    index("features/trails/pages/trails-page.tsx"),
    route("/:trailId", "features/trails/pages/trails-detail-page.tsx"),
    route("new", "features/trails/pages/trails-create-page.tsx"),
  ]),

  // Posts routes
  ...prefix("posts", [
    index("features/community/pages/community-page.tsx"),
    route("/:postId", "features/community/pages/post-page.tsx"),
    route("/new", "features/community/pages/submit-post-page.tsx"),
  ]),

  // My Page routes
  ...prefix("mypage", [
    ...prefix("profile", [index("features/users/pages/my-profile-page.tsx")]),
    ...prefix("favorite", [index("features/users/pages/my-favorite-page.tsx")]),
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
