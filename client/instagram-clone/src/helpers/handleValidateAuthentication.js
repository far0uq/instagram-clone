import { handleTokenValidation } from "../api/userAPI";

export const handleValidateAuthentication = async () => {
  console.log("In handler");
  const data = await handleTokenValidation();
  console.log(
    "🚀 ~ file: handleValidateAuthentication.js:6 ~ handleValidateAuthentication ~ data:",
    data
  );
  if (data.status === 200) return true;
  if (data.status === 401) return false;
};
