import request from "./request";
export const refreshToken = async () => {
  const data = await request.get("/refreshToken", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
