export const ProjectPageUrls = {
  login: "/auth",
  registration: "/auth/registration",
  logout: "/auth/logout",
  dashboard: "/dashboard",
  home: "/",
} as const;

export type ProjectPageUrls =
  (typeof ProjectPageUrls)[keyof typeof ProjectPageUrls];
