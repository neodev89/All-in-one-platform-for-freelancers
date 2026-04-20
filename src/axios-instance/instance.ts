import axios from 'axios';


const base =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : `http://localhost:3000/api`;

const instance = axios.create({
    baseURL: base || "",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        config.headers["x-request-id"] = crypto.randomUUID();

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
  (response) => {
    // Normalizzazione opzionale
    return response;
  },
  async (error) => {
    const status = error.response?.status;

    // Logging errori
    console.log("API Error:", {
      url: error.config?.url,
      status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default instance;