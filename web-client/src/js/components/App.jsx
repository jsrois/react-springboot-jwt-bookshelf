import * as React from 'react';
import {BookList} from "./BookList";
import {useEffect, useState} from "react";
import {LoginForm} from "./LoginForm";
import {CreateBookForm} from "./CreateBookForm";
import {BookApi} from "../api/BookApi";

export const App = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [showCreateBook, setShowCreateBook] = useState(false)

    const [books, setBooks] = useState([])

    const bookApi = new BookApi()

    useEffect(() => {
        bookApi.getBooks().then(setBooks)
    }, [])

    const loginSuccess = () => {
        setLoggedIn(true)
        setShowLogin(false)
    }

    const creationSuccess = () => {
        setShowCreateBook(false)
        bookApi.getBooks().then(setBooks)
    }

    return (
        <div>
            {showLogin && <LoginForm onSuccess={loginSuccess}/>}
            {showCreateBook && <CreateBookForm onSuccess={creationSuccess}/>}
            <nav className="navBar">
                {loggedIn && <a className="navBar__link" onClick={() => {
                    setShowCreateBook(true)
                }}>Add Book</a>}

                {loggedIn ? <a className="navBar__link" onClick={() => {
                        setLoggedIn(false)
                    }}>Logout</a> :
                    <a className="navBar__link" onClick={() =>
                        setShowLogin(true)
                    }>Login</a>
                }
            </nav>
            <BookList books={books}/>
        </div>);
}