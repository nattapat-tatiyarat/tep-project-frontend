import axios from "axios";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || `http://localhost:3405`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
});
