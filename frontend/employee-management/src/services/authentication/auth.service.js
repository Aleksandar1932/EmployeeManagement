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
            console.log("Axios response")
            console.log(response.headers.authorization)

            localStorage.setItem("authorization", JSON.stringify(response.headers.authorization))


        });
}

const logout = () => {
    localStorage.removeItem("authorization");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("authorization"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};