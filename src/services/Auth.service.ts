import { NewPasswordType, UpdateProfileType } from '../utils/Types/index';
import Config from '~/config';
import { ForgotPasswordType, LoginForm, RegisterForm } from '~/utils/Types';
import AxiosInstance from '../utils/AxiosInstance';

let url: string = 'auth';

const Register = (data: RegisterForm) => {
    return AxiosInstance.post(Config.apiUrl + 'users', data);
};

const Login = (data: LoginForm) => {
    return AxiosInstance.post(Config.apiUrl + 'login', data);
};

const ForgotPassword = (data: ForgotPasswordType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/changePassword', data);
};

const NewPassword = (data: NewPasswordType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/newPassword', data);
};

const uploadImage = (data: FormData) => {
    return AxiosInstance.post(Config.apiUrl + url + '/uploadImage', data);
};

const UpdateProfile = (data: UpdateProfileType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/edit', data);
};

const getDataProfile = () => {
    return AxiosInstance.post(Config.apiUrl + url + '/getUserId');
};

const logOut = () => {
    return AxiosInstance.post(Config.apiUrl + url + '/logout');
};
const createAdmin = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url + '/create', data);
};
const getUsers = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url + '/getUsers', data);
};
const getUser = (id: string) => {
    return AxiosInstance.get(Config.apiUrl + url + `/getUser/${id}`);
};
const deteleUser = (id: string) => {
    return AxiosInstance.delete(Config.apiUrl + url + `/delete/${id}`);
};

const updateUser = (id: string, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + `/update/${id}`, data);
};

const AuthService = {
    Register,
    Login,
    uploadImage,
    ForgotPassword,
    NewPassword,
    UpdateProfile,
    getDataProfile,
    logOut,
    createAdmin,
    getUsers,
    deteleUser,
    updateUser,
    getUser,
};

export default AuthService;
