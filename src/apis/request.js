import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

//https://api.github.com/search/users?q=anh&page=1

export default request;
