export const ProjectPageUrls = {
  login: "/auth",
  registration: "/auth/registration",
  myLists: "/my-lists",
  home: "/",
  about: "/about",
} as const;

export type ProjectPageUrls =
  (typeof ProjectPageUrls)[keyof typeof ProjectPageUrls];
