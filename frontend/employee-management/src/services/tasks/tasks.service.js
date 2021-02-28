import axios from "../../custom-axios/axios";
import BACKEND_APP_URL from "../../constants/constants";

const TASKS_URL = BACKEND_APP_URL + 'api/tasks'

const getTasks = (username) => {
    if (username === undefined) {
        return axios.get(TASKS_URL + "/all")
    }
    else {
        return axios.get(TASKS_URL + "/all?username="+username)
    }
}

const addTask = (projectId, description, createdByUsername) => {
    axios.post(TASKS_URL + "/add", {
        "projectId" : projectId,
        "description" : description,
        "createdByUsername" : createdByUsername
    })
}

const deleteTaskById = (taskId) => {
    axios.delete(TASKS_URL + "/delete/" + taskId).then(r => console.log("Delete"));
}

const completeTask = (taskId, workerUsername) => {
    axios.get(TASKS_URL + "/complete/" + taskId + "/" + workerUsername).then(r => console.log("Done"));
}

// const deleteProjectById = (id) => {
//     return axios.delete(PROJECTS_URL + '/delete/' + id)
// }
//
//
//
// const addProject = (name, description, location, managerUsername, category, budget) => {
//     return axios.post(PROJECTS_URL + '/add', {
//         "name" : name,
//         "description" : description,
//         "location" : location,
//         "managerUsername" : managerUsername,
//         "category" : category,
//         "budget" : budget
//     })
// }
//
// const assignWorker = (projectId, workerUsername) => {
//     return axios.get(PROJECTS_URL + /assign/ + projectId + "/" + workerUsername)
// }
//
// const unAssignWorker = (projectId, workerUsername) => {
//     return axios.get(PROJECTS_URL + /un-assign/ + projectId + "/" + workerUsername)
// }
//
// const getProjectCategories = () => {
//     return axios.get(PROJECTS_URL + "/categories")
// }

export default {
    getTasks,
    deleteTaskById,
    completeTask,
    addTask
}