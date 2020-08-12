import axios from 'axios';

const instance = axios.create({
    baseURL:"https://api.raisely.com/v3/"
});

export default instance;
