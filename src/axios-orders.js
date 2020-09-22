import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-1bf4d.firebaseio.com/',
});

export default instance;