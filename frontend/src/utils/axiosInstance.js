import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL: 'https://task-izxe.onrender.com'
    }
)

export default axiosInstance
