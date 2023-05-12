import axios from 'axios';
import Config from '~/config';

const baseURL = Config.apiUrl;

const token = localStorage.getItem('access_token');

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
    timeout: 30 * 1000,
});

export default AxiosInstance;
