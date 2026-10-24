import api from "./axios";

export const connectGitHub = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github/connect`;
};

export const getGitHubStatus = async () => {
  const resp = await api.get("/github/status");
  return resp.data;
};

export const deactivateGitHub = async () => {
  const resp = await api.patch("/github/deactivate");
  return resp.data;
};

export const reconnectGitHub = async () => {
  const resp = await api.post("/github/reconnect");
  return resp.data;
};

// Get connected user's GitHub repositories
export const getGitHubRepositories = async () => {
  const resp = await api.get("/github/repositories");
  return resp.data;
};

export const createGitHubRepository = async (data: {name: string, description: string, visibility: "public" | "private"}) => {
  const resp = await api.post("/github/repositories", data);
  return resp.data;
};

export const getGitHubRepository = async (repositoryId: string) => {
  const resp = await api.get(`/github/repositories/${repositoryId}`);
  return resp.data;
};