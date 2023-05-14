import Config from '~/config';
import AxiosInstance from '../utils/AxiosInstance';
import { UserType } from '~/utils/Types';

let url: string = 'user';

const getUsers = () => {
    return AxiosInstance.get(Config.apiUrl + `${url}s`);
};

const updateUser = (data: UserType) => {
    return AxiosInstance.put(Config.apiUrl + `${url}`, data);
};

const deleteUser = ({ email }: Pick<UserType, 'email'>) => {
    return AxiosInstance.delete(Config.apiUrl + `${url}s/${email}`);
};

export { getUsers, updateUser, deleteUser };
