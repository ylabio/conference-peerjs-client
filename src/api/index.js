import axios from 'axios';

const http = axios.create({
  baseURL: '',
  headers: {},
});

http.configure = function ({ baseURL, tokenHeader }) {
  if (typeof baseURL !== 'undefined') {
    http.defaults.baseURL = baseURL;
  }
  if (typeof tokenHeader !== 'undefined') {
    http.defaults.tokenHeader = tokenHeader;
  }
};

http.setToken = function (token) {
  if (http.defaults.tokenHeader) {
    if (token) {
      console.log('SET TOKEN', token);
      this.defaults.headers[http.defaults.tokenHeader] = token;
    } else {
      delete this.defaults.headers[http.defaults.tokenHeader];
    }
  }
};

export default http;

/**
 * Reexport API modules
 */
import Common from '@api/common';

export const users = new Common(http, 'users');
export const rooms = new Common(http, 'rooms');
