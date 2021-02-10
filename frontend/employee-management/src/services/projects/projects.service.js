import axios from "../../custom-axios/axios";
import BACKEND_APP_URL from "../../constants/constants";

const PROJECTS_URL = BACKEND_APP_URL + 'api/projects'

const getProjects = () => {
    return axios.get(PROJECTS_URL)
}

const deleteProjectById = (id) => {
    return axios.delete(PROJECTS_URL + '/delete/' + id)
}

export default {
    getProjects,
    deleteProjectById
}