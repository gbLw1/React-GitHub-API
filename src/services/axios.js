import axios from 'axios';

const baseURL = "https://api.github.com";

const AxiosClient = axios.create({
  baseURL,
});

export default AxiosClient;