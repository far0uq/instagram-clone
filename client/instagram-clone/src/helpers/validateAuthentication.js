import { handleTokenValidation } from "../api/userAPI";

export const validateAuthentication = async () => {
  const data = await handleTokenValidation();
  if (data.status === 200) return true;
  return false;
};
