import axios from "axios";

export default baseURL => axios.create({
  baseURL,
});
