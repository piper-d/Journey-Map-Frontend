import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const signInWithPassword = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <>
      <h1>Journey Map</h1>
      <div>
        <label htmlFor="email">email</label>
        <input onChange={emailChanged} value={email} id="email" type="email" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input onChange={passwordChanged} value={password} id="password" type="text" />
      </div>

      <button onClick={signInWithPassword}>Sign in with email and password</button>
    </>
  );
}

export default App;
