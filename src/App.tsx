import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Tasks from './components/Tasks';
import './App.css';

function App() {

  const auth = getAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authorizedUser, setAuthorizedUser] = useState<any>(false || sessionStorage.getItem("accessToken"))

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
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
      <h1>Journey Map</h1>

      {authorizedUser ? (
        <>
          <p>Authorized user</p>
          <h3>Tasks</h3>
          <Tasks token={sessionStorage.getItem("accessToken")} />
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ) :

        <>
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
      }
    </>

  );
}

export default App;
