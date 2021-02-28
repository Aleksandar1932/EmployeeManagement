import axios from "axios";
import authHeader from "../services/authentication/auth-header";

const instance = axios.create({
    // baseURL: 'http://localhost:9090/api',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Authorization',
        ...(authHeader().Authorization !== undefined) && {'Authorization': authHeader().Authorization},

    }
})

export default instance;