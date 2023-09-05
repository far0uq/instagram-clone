// TODO: also have to make logout func soon so the localStorage is emptied out, so this may work properly.

import { handleTokenValidation } from "../api/userAPI";

export const validateAuthentication = async () => {
  const token = localStorage.getItem("token");
  const data = await handleTokenValidation(token);
  if (data.status === 200) return true;
  return false;
};
