import Axios from "axios";

const baseURL = "https://api.thecatapi.com/v1";

const axios = Axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-Client-Platform": "Web",
    "x-api-key": import.meta.env.VITE_REACT_APP_CAT_API_KEY,
  },
  timeout: 60000,
});

export default axios;
