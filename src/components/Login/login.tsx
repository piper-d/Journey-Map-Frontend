import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import Tasks from '../../components/Tasks';
import db from "../../config/firebase.config"
import '../../App.css';

const Login: React.FC<{}> = () => {

    const auth = getAuth()

    const [emailr, setEmailr] = useState("eminmammadzada.b@gmail.com")
    const [passwordr, setPasswordr] = useState("admin123")
    const [username, setUsername] = useState("emin")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken"))

    const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const emailRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailr(event.target.value)
    }

    const passwordRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordr(event.target.value)
    }

    const usernameRegisterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }


    const signInWithPassword = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    user.getIdToken().then((tkn) => {
                        // set access token in session storage
                        sessionStorage.setItem("accessToken", tkn);

                        setAuthorizedUser(true);
                        setEmail('')
                        setPassword('')
                    })
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    const signUpWithPassword = async () => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailr, passwordr)
            const user = userCredential.user;

            if (user) {
                let tkn = await user.getIdToken()
                // set access token in session storage
                sessionStorage.setItem("accessToken", tkn);
                setAuthorizedUser(true);
                console.log(user)
                await setDoc(doc(db, "Users", user.uid), { username: username, email: emailr, Trips: [] })
            }
        } catch (error) {
            console.log(error)
        }
    }



    function logoutUser() {
        signOut(auth).then(() => {
            // clear session storage
            sessionStorage.clear();
            setAuthorizedUser(false);
            // window.location.replace("/");
            alert('Logged Out Successfully');
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }

    return (
        <>

            {authorizedUser ? (
                <>
                    <p>Authorized user</p>
                    <h3>Tasks</h3>
                    <Tasks token={sessionStorage.getItem("accessToken")} />
                    <button onClick={logoutUser}>Logout Button</button>
                </>
            ) :
                <>
                   <form>
                    <TextField 
                        label="Email"
                        onChange={emailChanged}
                        value={email}
                        id='email'
                        type="email"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        onChange={passwordChanged}
                        value={password}
                        id='password'
                        type="password"
                        variant="outlined"
                        fullWidth
                    />

                    <Button variant="contained" color="primary" onClick={signInWithPassword}>
                        Login
                    </Button>
                   </form>
                    {/* <div>
                        <label htmlFor="email">email</label>
                        <input onChange={emailChanged} value={email} id="email" type="email" />
                    </div>

                    <div>
                        <label htmlFor="password">password</label>
                        <input onChange={passwordChanged} value={password} id="password" type="text" />
                    </div>

                    <button onClick={signInWithPassword}>Sign in with email and password</button> */}

                    {/* Register part */}
                    <hr />
                    <hr />

                    <form>
                        <TextField
                            label="Username"
                            onChange={usernameRegisterChanged}
                            value={username}
                            id='username'
                            type="username"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            onChange={emailRegisterChanged}
                            value={emailr}
                            id='emailr'
                            type="email"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            onChange={passwordRegisterChanged}
                            value={passwordr}
                            id='passwordr'
                            type="text"
                            variant="outlined"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={signUpWithPassword}>
                            Login
                        </Button>
                    </form>

                    {/* <div>
                        <label htmlFor="username">username Register</label>
                        <input onChange={usernameRegisterChanged} value={username} id="username" type="email" />
                    </div>

                    <div>
                        <label htmlFor="emailr">email Register</label>
                        <input onChange={emailRegisterChanged} value={emailr} id="emailr" type="email" />
                    </div>

                    <div>
                        <label htmlFor="passwordr">password Register</label>
                        <input onChange={passwordRegisterChanged} value={passwordr} id="passwordr" type="text" />
                    </div>

                    <button onClick={signUpWithPassword}>Sign up with email and password</button> */}

                </>
            }
        </>
    );
}

export default Login