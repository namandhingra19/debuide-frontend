import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const reserveRoom = (type: string) =>
  api.post("/api/rooms/reserve", { type });

export const getRooms = () => api.get("/api/rooms");
export const reAllocateDefaultData = () =>
  api.post("/api/rooms/reAllocateDefaultData", {});
