import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/notes',
});

export const getNotes = () => api.get('/');
export const createNote = (note) => api.post('/', note);
export const updateNote = (id, note) => api.put(`/${id}`, note);
export const deleteNote = (id) => api.delete(`/${id}`);

export default api;
