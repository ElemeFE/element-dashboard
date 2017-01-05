import axios from 'axios';

let base = '';

export const fetchList = params => { return axios.get(`${ base }/list`, {params: params}); };

export const postSuccess = params => { return axios.get(`${ base }/success`, {params: params}); };

export const postError = params => { return axios.get(`${ base }/error`, {params: params}); };
