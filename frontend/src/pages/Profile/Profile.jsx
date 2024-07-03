import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../../app/actions/user.actions.js';
import User from '../../components/User/User.jsx';
import Account from '../../components/Account/Account.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function UserProfile () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        const firstname = data.body.firstName;
                        const lastname = data.body.lastName;
                        const username = data.body.userName;
                        dispatch(userProfile(firstname, lastname, username));
                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]);

    const accountData = [
        {
            "id": "1",
            "title": "Argent Bank Checking (x8349)",
            "amount": "$2,082.79",
            "description": "Available Balance"
        },
        {
            "id": "2",
            "title": "Argent Bank Savings (x6712)",
            "amount": "$10,928.42",
            "description": "Available Balance"
        },
        {
            "id": "3",
            "title": "Argent Bank Credit Card (x8349)",
            "amount": "$184.30",
            "description": "Current Balance"
        }
    ];

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                <User />
                {accountData.map((data) => (
                    <Account 
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
            <Footer />
        </div>
    )
}

export default UserProfile