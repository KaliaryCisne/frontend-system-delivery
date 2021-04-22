import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend-system-delivery.herokuapp.com/api/v1/delivery',
});


