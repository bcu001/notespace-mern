import { ENV } from "@/config/env";
import axios from "axios";

const api = axios.create({
    baseURL: `${ENV.VITE_API_URL}/api`
})

export default api;