import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://backend-system-delivery.herokuapp.com/api/v1/delivery',
});


