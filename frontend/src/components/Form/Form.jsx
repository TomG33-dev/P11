// Importation des hooks et des fonctions nécessaires depuis React, Redux et React Router
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Importation des actions Redux pour la gestion de l'authentification
import { loginFailed, loginSuccess } from '../../app/actions/auth.actions.js';
// Importation des fonctions de validation pour l'email et le mot de passe
import { isValidEmail, isValidPassword } from '../../utils/regex.js';
// Importation du style spécifique au composant Form
import '../Form/form.scss';

function Form () {
    // Déclaration des états locaux pour gérer les entrées de formulaire et les messages d'erreur
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // Utilisation de useNavigate pour la redirection après la connexion
    const navigate = useNavigate();
    // useDispatch pour envoyer des actions à Redux
    const dispatch = useDispatch();

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire
        // Validation de l'email et du mot de passe
        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email address");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Invalid password");
            return;
        }
        try {
            // Tentative de connexion à l'API
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            
            if (response.ok) {
                // Si la connexion est réussie, stockage du token et redirection
                const data = await response.json();
                console.log(data);
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                navigate('/profile');
            } else {
                // En cas d'échec, affichage d'un message d'erreur
                const error = "Incorrect email/password";
                dispatch(loginFailed(error));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='sign-in-content'>
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                {/* Champs de saisie pour l'email et le mot de passe */}
                <div className='input-wrapper'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        id='username' 
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        id='password' 
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {/* Checkbox pour se souvenir de l'utilisateur */}
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox' 
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor='remember-me'>Remember me</label>
                </div>
                {/* Bouton de soumission du formulaire */}
                <button className="sign-in-button">
                    Sign In
                </button>
                {/* Affichage du message d'erreur si nécessaire */}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
        </section>
    )
}

export default Form