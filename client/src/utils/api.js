import {
    API_BASE_URL,
    AUTH_ENDPOINTS,
    ENTRY_ENDPOINTS,
    QUOTE_ENDPOINT,
    STORAGE_KEYS,
    HTTP_METHODS,
} from "./config";


const checkResponse = async (res) => {
    const data = await res.json().catch(() => null);

    if (res.ok) {
        return data;
    }

    const message = data?.message || data?.error || `Error: ${res.status}`;
    return Promise.reject(message);
};

const getToken = () => localStorage.getItem(STORAGE_KEYS.JWT);

export const setToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.JWT, token);
};

export const clearToken = () => {
    localStorage.removeItem(STORAGE_KEYS.JWT);
};

const getHeaders = (needsAuth = true) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (needsAuth) {
        const token = getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    return headers;
};

export const register = ({ name, email, password }) => {
    return fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.SIGNUP}`, {
        method: HTTP_METHODS.POST,
        headers: getHeaders(false),
        body: JSON.stringify({ name, email, password }),
    }).then(checkResponse);
};

export const login = ({ email, password }) => {
    return fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.SIGNIN}`, {
        method: HTTP_METHODS.POST,
        headers: getHeaders(false),
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
};

export const getCurrentUser = () => {
    return fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.CURRENT_USER}`, {
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const getEntries = () => {
    return fetch(`${API_BASE_URL}${ENTRY_ENDPOINTS.ENTRIES}`, {
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const createEntry = (data) => {
    return fetch(`${API_BASE_URL}${ENTRY_ENDPOINTS.ENTRIES}`, {
        method: HTTP_METHODS.POST,
        headers: getHeaders(true),
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export const deleteEntry = (id) => {
    return fetch(`${API_BASE_URL}${ENTRY_ENDPOINTS.ENTRIES}/${id}`, {
        method: HTTP_METHODS.DELETE,
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const updateEntry = (id, data) => {
    return fetch(`${API_BASE_URL}${ENTRY_ENDPOINTS.ENTRIES}/${id}`, {
        method: HTTP_METHODS.PATCH,
        headers: getHeaders(true),
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export const getTodayQuote = () => {
    return fetch(`${API_BASE_URL}${QUOTE_ENDPOINT}`).then(checkResponse);
};