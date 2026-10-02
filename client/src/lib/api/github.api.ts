import api from "./axios";

export const connectGitHub = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github/connect`;
};
