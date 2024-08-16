import  axios from "axios";

const axiosinstance = axios.create ({
    baseURL: '/api'
})

export default axiosinstance;