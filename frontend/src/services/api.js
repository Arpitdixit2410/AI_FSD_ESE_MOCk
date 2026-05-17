import axios from 'axios';

// When deployed to production, it's served from the same root domain
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getCandidates = () => api.get('/candidates');
export const addCandidate = (data) => api.post('/candidates', data);
export const matchCandidates = (data) => api.post('/match', data);
export const shortlistAI = (data) => api.post('/ai/shortlist', data);

export default api;
