import * as React from 'react';
import {BookList} from "./BookList";
import {useState} from "react";
import {LoginForm} from "./LoginForm";

export const App = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const loginSuccess = () => {
        setLoggedIn(true)
        setShowLogin(false)
    }

    return (
        <div>
            {showLogin && <LoginForm onSuccess={loginSuccess}/>}
            <nav className="navBar">
                {loggedIn || <a onClick={() => {
                    setShowLogin(true)
                }}>Login</a>}
                {loggedIn && <a onClick={() => {
                    setLoggedIn(false)
                }}>Logout</a>}
                {loggedIn && <a onClick={() => {
                }}>Add Book</a>}

            </nav>
            <BookList/>
        </div>);
}