import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const authHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Links
export const getLinks = () =>
  axios.get(`${API_URL}/api/links`, authHeaders());

export const createLink = (data) =>
  axios.post(`${API_URL}/api/links`, data, authHeaders());

export const updateLink = (id, data) =>
  axios.put(`${API_URL}/api/links/${id}`, data, authHeaders());

export const deleteLink = (id) =>
  axios.delete(`${API_URL}/api/links/${id}`, authHeaders());

export const incrementClick = (linkId) =>
  axios.patch(`${API_URL}/api/links/${linkId}/click`);

// Profile
export const getProfile = () =>
  axios.get(`${API_URL}/api/profile/me`, authHeaders());

export const createProfile = (data) =>
  axios.post(`${API_URL}/api/profile`, data, authHeaders());

export const updateProfile = (data) =>
  axios.patch(`${API_URL}/api/profile`, data, authHeaders());

export const getPublicProfile = (username) =>
  axios.get(`${API_URL}/api/profile/${username}`);
