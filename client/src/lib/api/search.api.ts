import api from "./axios";

export const searchUsers = async (query: string) => {
  const res = await api.get("/search/users", { params: {q: query} });
  return res.data;
};

export const searchPrograms = async (query: string) => {
  const res = await api.get("/search/programs", { params: {q: query} });
  return res.data;
};