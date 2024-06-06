import axios from 'axios';

const slideFusionApi = axios.create({
    baseURL: 'https://localhost:5001/api',    
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default slideFusionApi;
