import axios from 'axios';

let base = '';

export const fetchList = params => { return axios.get(`${ base }/list`, {params: params}); };

export const postSuccess = params => { return axios.get(`${ base }/success`, {params: params}); };

export const postError = params => { return axios.get(`${ base }/error`, {params: params}); };

export const requestLogin = params => { return axios.post(`${ base }/login`, params).then(res => res.data); };

export const fetchSchoolList = params => {return axios.get(`${ base }/schools`).then(res => res.data); };

export const fetchWorkDurationOptions = params => {return axios.get(`${ base }/work_durations`).then(res => res.data); };

export const fetchAcademicOptions = params => {return axios.get(`${ base }/academics`).then(res => res.data); };

export const postResume = params => {return axios.post(`${base}/resume`, params).then(res => res.data);};
