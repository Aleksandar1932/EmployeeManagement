import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:9090/api',
    headers: {
        'Access-Control-Allow-Origin' : 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Authorization'
    }
})

export default instance;