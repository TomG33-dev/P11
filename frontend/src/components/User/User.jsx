import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../../app/actions/user.actions.js';
import { isValidName } from "../../utils/regex.js";
import "../User/user.scss";

function User () {
    // Utilisation de useSelector pour accéder à l'état global Redux
    const token = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.firstname);
    const lastname = useSelector((state) => state.user.lastname);
    const username = useSelector((state) => state.user.username);

    // useState pour gérer l'affichage conditionnel et les entrées de l'utilisateur
    const [display, setDisplay] = useState(true);
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // useDispatch pour envoyer des actions à l'état global Redux
    const dispatch = useDispatch();

    // Gestion de la soumission du formulaire pour mettre à jour le nom d'utilisateur
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        // Validation du nom d'utilisateur
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;
        } else {
            setErrorMessage("");
        }
        try {
            // Requête PUT pour mettre à jour le nom d'utilisateur
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({userName}),
            });
            if (response.ok) {
                const data = await response.json();
                const username = data.body.userName;
                console.log(data);
                // Mise à jour de l'état global Redux avec le nouveau nom d'utilisateur
                dispatch(updateUsername(username));
                // Basculer l'affichage pour revenir à l'affichage de bienvenue
                setDisplay(!display);
            } else {
                console.log("Invalid Fields")
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="header">
            { display ? 
                <div>
                    {/* Affichage de bienvenue avec option de modification */}
                    <h2>Welcome back 
                        <br />
                        {firstname} {lastname} !
                    </h2>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    {/* Formulaire pour modifier les informations de l'utilisateur */}
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={username}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={firstname}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            {/* Boutons pour sauvegarder ou annuler les modifications */}
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {/* Affichage des messages d'erreur */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User