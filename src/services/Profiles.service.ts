import Config from '~/config';
import AxiosInstance from '../utils/AxiosInstance';

let url: string = 'profiles';

const getProfile = (username: string) => {
    return AxiosInstance.get(Config.apiUrl + `${url}/${username}`);
};

export { getProfile };
