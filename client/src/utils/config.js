export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const ROUTES = {
    HOME: "/",
    PROFILE: "/profile",
};

export const QUOTE_ENDPOINT = "/api/quote/today";

export const AUTH_ENDPOINTS = {
    SIGNUP: "/api/signup",
    SIGNIN: "/api/signin",
    CURRENT_USER: "/api/users/me",
};

export const ENTRY_ENDPOINTS = {
    ENTRIES: "/api/entries",
};

export const UI_TEXT = {
    QUOTE_FALLBACK: "Quote unavailable right now. Please try again later.",
    ENTRIES_EMPTY: "No entries yet. Click New entry to start.",
    SIGNIN_REQUIRED: "Please sign in to view your journal.",
};

export const STORAGE_KEYS = {
    JWT: "jwt",
};

export const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE",
};