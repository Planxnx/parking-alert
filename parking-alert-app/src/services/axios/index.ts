import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL || "https://parking-alert-api.planxnx.dev/api/v1",
  timeout: 10000,
});
