import axios from "../../custom-axios/axios";
import BACKEND_APP_URL from "../../constants/constants";
import BACKEND_APP_BASE_URL from "../../constants/constants";

const API_URL = BACKEND_APP_BASE_URL + 'api/users/';
const API_LOGIN_URL = BACKEND_APP_URL + 'login'


const register = (username, password, repeatPassword, role) => {
    return axios.post(API_URL + 'register', {
        "username": username,
        "password": password,
        "repeatPassword": repeatPassword,
        "role": role
    })
}

const login = (username, password) => {
    return axios
        .post(API_LOGIN_URL, {
            "username": username,
            "password": password
        })
        .then((response) => {
            // console.log("Axios response")
            // console.log(response.headers.authorization)

            localStorage.setItem("authorization", JSON.stringify(response.headers.authorization))
            localStorage.setItem("user", JSON.stringify(response.data))


        });
}

const logout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getAvailableRoles = () => {
    return axios.get(BACKEND_APP_BASE_URL + 'api/roles');
}

const isCurrentUserManager = () => {
    // if(this.getCurrentUser()["role"].includes("MANAGER") === true){
    //     return true
    // }
    // else{
    //     return false
    // }
    return getCurrentUser()["role"].includes("MANAGER");
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getAvailableRoles,
    isCurrentUserManager
};