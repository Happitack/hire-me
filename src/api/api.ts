import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchChildren = async (accessToken: string, groupId: string, institutionId: string) => {
  const response = await api.get('/daycare/tablet/group', {
    params: {
      accessToken,
      groupId,
      institutionId,
    },
  });
  return response.data;
};

export const checkInChild = async (accessToken: string, childId: string, pickupTime: string) => {
  const response = await api.post(`/v2/children/${childId}/checkins`, {
    accessToken,
    pickupTime,
  });
  return response.data;
};

export const checkOutChild = async (accessToken: string, childId: string) => {
  const response = await api.post(`/v2/children/${childId}/checkout`, {
    accessToken,
  });
  return response.data;
};