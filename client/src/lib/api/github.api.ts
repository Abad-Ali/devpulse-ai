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