import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id',
});

export default instance;