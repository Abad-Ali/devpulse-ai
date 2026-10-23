import api from "./axios";

export const getMyExecutions = async () => {
  const resp = await api.get("/executions");
  return resp.data;
};

export const getMyExecution = async (executionId: string) => {
  const resp = await api.get(`/executions/${executionId}`);
  return resp.data;
};