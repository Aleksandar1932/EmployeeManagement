import axios from "../../custom-axios/axios";
import BACKEND_APP_URL from "../../constants/constants";

const PROJECTS_URL = BACKEND_APP_URL + 'api/projects'

const getProjects = () => {
    return axios.get(PROJECTS_URL)
}

const deleteProjectById = (id) => {
    return axios.delete(PROJECTS_URL + '/delete/' + id)
}



const addProject = (name, description, location, managerUsername, category, budget) => {
    return axios.post(PROJECTS_URL + '/add', {
        "name" : name,
        "description" : description,
        "location" : location,
        "managerUsername" : managerUsername,
        "category" : category,
        "budget" : budget
    })
}

const assignWorker = (projectId, workerUsername) => {
    return axios.get(PROJECTS_URL + /assign/ + projectId + "/" + workerUsername)
}

const unAssignWorker = (projectId, workerUsername) => {
    return axios.get(PROJECTS_URL + /un-assign/ + projectId + "/" + workerUsername)
}

const getProjectCategories = () => {
    return axios.get(PROJECTS_URL + "/categories")
}

export default {
    getProjects,
    deleteProjectById,
    addProject,
    unAssignWorker,
    getProjectCategories,
    assignWorker
}