import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:8000" });

export async function healthCheck() {
  const res = await api.get("/health");
  return res.data as { status: string; service: string };
}
