import axios from "axios";

//Base Url
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default api;
