import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL: 'https://awdiz-react-backend.onrender.com/api/v1',
    headers: {'Authorization': `Bearer ${token}`}
})

export default api;