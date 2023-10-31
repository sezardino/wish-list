import { createItemMutationType } from "./create-item";
import { createListMutationType } from "./create-list";
import { registrationMutationType } from "./registration";

export const mutations = {
  registration: registrationMutationType,
  createList: createListMutationType,
  createItem: createItemMutationType,
};
