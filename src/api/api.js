import axios from 'axios';

let base = '';

export const fetchList = params => { return axios.get(`${ base }/list`, {params: params}); };
