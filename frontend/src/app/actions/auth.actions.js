import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./type.actions";

// Action pour gérer le succès de la connexion
export const loginSuccess = token => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

// Action pour gérer l'échec de la connexion
export const loginFailed = error => ({
    type: LOGIN_FAIL,
    payload: error,
});

// Action pour gérer la déconnexion
export const logout = () => ({
    type: LOGOUT,
});