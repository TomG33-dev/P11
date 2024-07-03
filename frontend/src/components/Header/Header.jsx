import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/argentBankLogo.png';
import { logout } from '../../app/actions/auth.actions.js';
import '../Header/header.scss';

function Header () {
    // Utilisation de useSelector pour accéder à l'état global Redux et récupérer le token et le prénom de l'utilisateur
    const isConnected = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.firstname);

    // useDispatch pour envoyer des actions à l'état global Redux
    const dispatch = useDispatch();
    // useNavigate pour rediriger l'utilisateur après certaines actions
    const navigate = useNavigate();
    
    // Fonction pour gérer la déconnexion
    const logoutHandler = () => {
        dispatch(logout()); // Dispatch l'action de déconnexion
        sessionStorage.clear(); // Efface la session storage
        localStorage.clear(); // Efface le local storage
        navigate('/'); // Redirige l'utilisateur vers la page d'accueil
    }
    return (
        <header>
            <h1 className='sr-only'>Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link> 
                {isConnected ? (
                    // Affiche les options de l'utilisateur connecté
                    <div className='connected'>
                        <Link to='/profile'>
                            <i className='fa-solid fa-2x fa-circle-user' />
                            <p>{firstname}</p>
                        </Link>
                        <Link to='/' onClick={logoutHandler}>
                            <i className='fa-solid fa-arrow-right-from-bracket' />
                            <p> Sign out </p>
                        </Link>
                    </div>
                ) : (
                    // Affiche l'option de connexion si l'utilisateur n'est pas connecté
                    <div className='not-connected'>
                        <Link to='/login' >
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In</p>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    ) 
}

export default Header