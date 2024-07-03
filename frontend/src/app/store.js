import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth.reducer.js';
import { userReducer } from './reducers/user.reducer.js';

// Combinaison des réducteurs en un seul réducteur racine
const rootReducer = combineReducers({
   // Association du réducteur d'authentification au state 'auth'
   auth: authReducer,
   // Association du réducteur utilisateur au state 'user'
   user: userReducer
})

// Configuration du store Redux avec le réducteur racine
const store = configureStore({
    reducer: rootReducer,
    devTools: true // Active les outils de développement Redux dans les navigateurs qui les prennent en charge
})

export default store