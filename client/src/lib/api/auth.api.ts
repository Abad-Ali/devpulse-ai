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