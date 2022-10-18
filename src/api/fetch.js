import { HTTP } from "./http";

export const isLogin = async (data) => {
  const res = await HTTP.get(
    `/login?username=${data.username}&password=${data.password}`
  );
  return res;
};

export const getData = async () => {
  const res = await HTTP.get(`/sensor`);
  return res;
};

export const getByField = async (data) => {
  const res = await HTTP.get(`/graph-data/${data}`);
  return res;
};

export const getPagination = async (data) => {
  const res = await HTTP.get(
    `/sensor-pagination?page=${data.page}&limit=${data.limit}`
  );
  return res;
};

export const create = async (data) => {
  const res = await HTTP.post(`/sensor`, data);
  return res;
};

export const update = async (data) => {
  const res = await HTTP.put(`/sensor`, data);
  return res;
};
