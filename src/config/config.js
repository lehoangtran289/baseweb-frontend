export const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://192.168.99.100:8080/api";
