import { ListParams, ListResponse, Work } from '~/models';
import axiosClient from './axios-client';

export const workApi = {
  // Partial<ListParams> laf optional --> có thể chỉ cần chuyền 1 trong những param đó
  getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
    return axiosClient.get('/works', { params });
  },

  get(id: String): Promise<Work> {
    return axiosClient.get(`/works/${id}`);
  },
};
