import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
import { useAuth } from '../../context/authContext'
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "../../compoents/Loader"
import Box from '@mui/material/Box';
import '../../styles/register.css'
import { sendEmailVerification } from 'firebase/auth';

const Login = () => {
    const { loggedIn } = useAuth()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [waitingEmailVerification, setWaitingEmailVerification] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setWaitingEmailVerification(true);

            try {
                const userCred = await doCreateUserWithEmailAndPassword(email, password);
                const user = userCred.user;

                console.log("user:", user);


                if (!user.emailVerified) {
                    alert("Verification email sent!");
                }

                setWaitingEmailVerification(true);
                setIsSigningIn(false);

            } catch (error) {
                console.error("Signup Failed:", error);
                setErrorMessage(error.message);
                setIsSigningIn(false);
                setWaitingEmailVerification(false);
            }
        }
    };


    return (
        <div>
            {loggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="login">
                <div className="login-container">
                    <div className="login-container_heading ">
                        <img className="homePageLogo" src="/code-sync.png" alt="code-sync-logo" />
                    </div>
                    {waitingEmailVerification === true ?
                        <div className='loader_register '>
                            <Loader />
                            <p>Awaiting email verification...</p>
                        </div>


                        : <form
                            onSubmit={onSubmit}
                            className="custom-form_register"
                        >

                            <label className="">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <label >
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                            />

                            {errorMessage && (
                                <span className='error-message'>{errorMessage}</span>
                            )}

                            <button
                                type="submit"
                                disabled={isSigningIn}
                                className={`button ${isSigningIn ? 'disabled' : 'enabled'}`}

                            >
                                {isSigningIn ? 'Signing Up...' : 'Sign Up'}
                            </button>

                            <div className="divider-container">
                                <div className="line line-left"></div>
                                <div className="or-text">OR</div>
                                <div className="line line-right"></div>
                            </div>

                            <p className="text-center text-sm">Already have an ID? <Link to={'/'} >Go back to Sign In!</Link></p>
                        </form>}
                </div>
            </main>
        </div>
    )
}

export default Login