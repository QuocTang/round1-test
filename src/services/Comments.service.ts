import Config from '~/config';
import AxiosInstance from '../utils/AxiosInstance';
import { UpdateArticleType } from '~/utils/Types';

let url: string = 'articles';
let url2: string = 'comments';

const getComments = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + `${url}/${slug}/${url2}`);
};

const deleteComment = (slug: string, id: number) => {
    return AxiosInstance.delete(Config.apiUrl + `${url}/${slug}/${url2}/${id}`);
};

export { getComments, deleteComment };
