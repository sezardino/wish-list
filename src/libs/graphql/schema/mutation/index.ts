import { createListMutationType } from "./create-list";
import { registrationMutationType } from "./registration";

export const mutations = {
  registration: registrationMutationType,
  createList: createListMutationType,
};
