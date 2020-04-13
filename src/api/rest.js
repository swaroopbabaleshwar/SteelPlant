import axios from 'axios';

const rest = (params) => {
    let res = axios(params);
    return res;
}

export default rest;