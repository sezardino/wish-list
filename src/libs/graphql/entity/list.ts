import { g } from "garph";

export const ListPrivacyGQL = g.enumType("ListPrivacy", {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  LINK: "LINK",
});

export const ListGQL = g.type("User", {
  id: g.string(),
  name: g.string(),
  privacy: ListPrivacyGQL,
  ownerId: g.string(),
  hash: g.string(),
});
