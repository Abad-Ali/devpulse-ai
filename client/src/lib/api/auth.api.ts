import api from "./axios";

export const signup = async ( data: {
    name: string;
    username: string;
    email: string;
    password: string;
}) => {
    const res = await api.post("/auth/register", data);

    return res.data;
}

export const oauthLogin = (provider: "google" | "github") => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  window.location.href = `${apiUrl}/auth/${provider}`;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);

  return res.data;
};