import axios from "axios"
import conf from './main'

import config from "../../config"

export const axData = {
  jwt: null
}
   
const ax = axios.create({
    baseURL: config.serverUrlPrefix,
    withCredentials: true,
})

ax.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(axData.jwt && config.url != conf.loginEndpoint){
    config.headers['Authorization'] = `Bearer ${axData.jwt}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default ax;