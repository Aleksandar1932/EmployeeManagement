import axios from "../custom-axios/axios";

const API_URL = "http://localhost:9090/api/users/";
const API_LOGIN_URL = "http://localhost:9090/login";

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
            console.log(response.headers)
        });
}

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};