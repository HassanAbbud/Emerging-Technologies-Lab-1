import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    register: (userData) => api.post('/users/register', userData),
    login: (userData) => api.post('/users/login', userData)
};

export const games = {
    getAll: () => api.get('/games'),
    getById: (id) => api.get(`/games/${id}`),
    create: (gameData) => api.post('/games', gameData),
    update: (id, gameData) => api.put(`/games/${id}`, gameData),
    delete: (id) => api.delete(`/games/${id}`)
};

export const userGames = {
    getCollection: () => api.get('/users/games'),
    addToCollection: (gameId) => api.post(`/users/games/${gameId}`),
    removeFromCollection: (gameId) => api.delete(`/users/games/${gameId}`)
};

export default api;