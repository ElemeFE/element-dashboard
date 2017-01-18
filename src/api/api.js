import axios from 'axios';

let base = '';

export const fetchList = params => { return axios.get(`${ base }/user/list`, {params: params}); };

export const addUser = params => { return axios.post(`${ base }/user/add`, params); };

export const editUser = params => { return axios.post(`${ base }/user/edit`, params); };

export const removeUser = params => { return axios.post(`${ base }/user/remove`, params); };

export const postError = params => { return axios.get(`${ base }/error`, {params: params}); };

export const requestLogin = params => { return axios.post(`${ base }/login`, params).then(res => res.data); };

export const fetchSchoolList = params => {return axios.get(`${ base }/schools`).then(res => res.data); };

export const fetchWorkDurationOptions = params => {return axios.get(`${ base }/work_durations`).then(res => res.data); };

export const fetchAcademicOptions = params => {return axios.get(`${ base }/academics`).then(res => res.data); };

export const postResume = params => {return axios.post(`${ base }/resume`, params).then(res => res.data);};

export const createResume = params => { return axios.post(`${ base }/resume/add`).then(res => res.data); };
