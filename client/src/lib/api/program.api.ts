import api from "./axios";

export interface Program {
  id: string;
  userId: string;
  title: string;
  description: string;
  language: string;
  code: string;
  visibility: "private" | "public";
  lastRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyProgramsResponse {
  success: boolean;
  message: string;
  data: Program[];
}

export const getMyPrograms = async (): Promise<GetMyProgramsResponse> => {
  const res = await api.get("/programs");
  return res.data;
};

export const updateProgramService = async ( programId: string, data: { title: string; description: string; visibility: "public" | "private" }) => {
  const res = await api.patch(`/programs/${programId}`, data);
  return res.data;
};

export const deleteProgramService = async (programId: string) => {
  const res = await api.delete(`/programs/${programId}`);
  return res.data;
};

export const createProgram = async ( data: { title: string; description: string; language: string; visibility: "public" | "private" }) => {
  const res = await api.post(`/programs`, data);
  return res.data;
};

export const getMyProgram = async ( programId: string) => {
  const res = await api.get(`/programs/${programId}`);
  return res.data;
};

export const updateProgramCode = async ( programId: string, code : string) => {
  const res = await api.patch(`/programs/${programId}/code`, {code});
  return res.data;
};

export const getProgramById = async (programId: string) => {
  const res = await api.get(`/programs/view/${programId}`);
  return res.data;
};