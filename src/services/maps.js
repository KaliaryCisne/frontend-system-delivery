import axios from 'axios';

export const mapsApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode',
});


