import Config from '~/config';

import AxiosInstance from '../utils/AxiosInstance';
import { FilterListSitNGoStageType, SitNGoStageType } from '~/utils/Types';

let url: string = 'stage';

const addSitNGoStage = (data: SitNGoStageType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/create', data);
};

const updateSitNGoStage = (id: string, data: SitNGoStageType) => {
    return AxiosInstance.put(Config.apiUrl + url + `/update/${id}`, data);
};

const getListSitNGoStage = ({ page, ...data }: FilterListSitNGoStageType) => {
    return AxiosInstance.post(Config.apiUrl + url + `/getStages?page=${page}`, data);
};

const getSitNGoStage = (id: string) => {
    return AxiosInstance.get(Config.apiUrl + url + `/getStage/${id}`);
};

const publishOne = (id: any) => {
    return AxiosInstance.post(Config.apiUrl + url + '/publish', id);
};

const deleteOne = (id: string) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

export { addSitNGoStage, getListSitNGoStage, updateSitNGoStage, getSitNGoStage, publishOne, deleteOne };
