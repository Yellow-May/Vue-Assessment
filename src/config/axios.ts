import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withXSRFToken: true,
  // withCredentials: true,
});

export { instance };
