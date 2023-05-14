import Config from '~/config';
import AxiosInstance from '../utils/AxiosInstance';
import { UpdateArticleType } from '~/utils/Types';

let url: string = 'articles';

const getArticles = () => {
    return AxiosInstance.get(Config.apiUrl + `${url}`);
};

const getOneArticle = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + `${url}/${slug}`);
};

const deleteArticle = (slug: string) => {
    return AxiosInstance.delete(Config.apiUrl + `${url}/${slug}`);
};

const updateArticle = (slug: string, data: UpdateArticleType) => {
    return AxiosInstance.put(Config.apiUrl + `${url}/${slug}`, data);
};

export { getArticles, getOneArticle, updateArticle, deleteArticle };
