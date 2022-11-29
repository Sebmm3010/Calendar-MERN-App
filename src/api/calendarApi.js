
import axios from 'axios';
import { getEnvVariables } from '../helpers';


const { VITE_API_URL } = getEnvVariable();


const calendarApi= axios.create({
    baseURL: VITE_API_URL
});

// Confoguracion de interceptores

export default calendarApi;