import axios from "../../custom-axios/axios";
import BACKEND_APP_URL from "../../constants/constants";

const STATISTICS_URL = BACKEND_APP_URL + 'api/statistics'

const getTotalNumberOfProjects = () => {
    return axios.get(STATISTICS_URL + '/projects/total')
}

const getTotalNumberOfTasks = () => {
    return axios.get(STATISTICS_URL + '/tasks/total')
}

const getTotalNumberOfWorkers = () => {
    return axios.get(STATISTICS_URL + '/workers/total')
}

const getTotalNumberOfProjectsPerManager = () => {
    return axios.get(STATISTICS_URL + '/projects/count/by/manager')
}

const getTotalNumberOfProjectsPerCategory = () => {
    return axios.get(STATISTICS_URL + '/projects/count/by/category')
}

const getCompletedTasksPerDay = () => {
    return axios.get(STATISTICS_URL + '/tasks/count/completed/by/day')
}

const getCompletedTasksPerEmployee = () => {
    return axios.get(STATISTICS_URL + '/tasks/count/completed/by/employee')
}

const getTasksStatusDistribution = () => {
    return axios.get(STATISTICS_URL + '/tasks/status')
}

const getDescriptiveStatisticsForCompletionTime = () =>{
    return axios.get(STATISTICS_URL + "/tasks/completionTime/stats")
}

const getCompletionTimePerTask = () => {
    return axios.get(STATISTICS_URL + "/tasks/completionTime")
}

export default {
    getTotalNumberOfProjects,
    getTotalNumberOfTasks,
    getTotalNumberOfProjectsPerManager,
    getTotalNumberOfProjectsPerCategory,
    getCompletedTasksPerDay,
    getCompletedTasksPerEmployee,
    getTasksStatusDistribution,
    getDescriptiveStatisticsForCompletionTime,
    getCompletionTimePerTask,
    getTotalNumberOfWorkers
}