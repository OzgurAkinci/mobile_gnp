import axios from 'axios';
import {WP_SERVER} from '../config/server.config';

export class ApiService {
  static getPosts(page) {
    return axios.get(WP_SERVER + 'posts?_embed&per_page=10&page=' + page);
  }

  static getCategories(page) {
    return axios.get(WP_SERVER + 'categories?_embed&per_page=10&page=' + page);
  }
}

export default new ApiService();
