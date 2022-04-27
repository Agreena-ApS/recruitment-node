import { userLoader } from "../loaders/user.loader";
export = async function () {
  await userLoader.createAdminUser();
};
