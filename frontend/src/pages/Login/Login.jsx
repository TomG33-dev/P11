import React from 'react';
import Form from '../../components/Form/Form.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import "../Login/login.scss";

function Login () {
    return (
        <div className='signin-page'>
            <main className='bg-dark'>
                < Form />
            </main>
            < Footer />
        </div>
        
    )
}

export default Login;