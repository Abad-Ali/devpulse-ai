import api from "./axios";

export const getMyProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const getProfile = async (username:string) => { 
  const res = await api.get(`/users/${username}`);
  return res.data; 
};