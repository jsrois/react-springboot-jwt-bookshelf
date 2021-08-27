import * as React from 'react';
import {NavBar} from "./NavBar";
import LoginFormDialog from "./LoginFormDialog";
import Button from "@material-ui/core/Button";
import {useEffect, useState} from "react";
import {ButtonGroup, Container, Table} from "@material-ui/core";
import AddBookFormDialog from "./AddBookFormDialog";
import {BookTable} from "./BookTable";
import {fakeBooks} from "../api/fakeData";
import {BookApi} from "../api/BookApi";
import {CredentialsManager} from "../session/CredentialsManager";


const bookApi = new BookApi()
const credentialsManager = new CredentialsManager();

function hasToken() {
    return credentialsManager.getToken() !== null;
}

export const App = () => {

    const [books, setBooks] = useState([])

    function updateBooks() {
        bookApi.getBooks().then(setBooks)
    }

    useEffect(updateBooks, [])

    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openAddBookForm, setOpenAddBookForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(hasToken())

    const handleClickOpenLoginForm = () => {
        setOpenLoginForm(true);
    };

    const handleCloseLoginForm = () => {
        setOpenLoginForm(false);
    };

    const handleLoginSuccess = () => {
        setOpenLoginForm(false);
        setLoggedIn(true)
    };

    const handleClickLogout = () => {
        credentialsManager.deleteCredentials()
        setLoggedIn(false)
    }

    const handleClickAddBook = () => {
        setOpenAddBookForm(true)
    }

    const handleCloseAddBookForm = () => {
        setOpenAddBookForm(false);
    };

    const handleAddBookSuccess = () => {
        setOpenAddBookForm(false);
        updateBooks();
    };

    return (<div>
        <NavBar titleText="Bookshelf">
            {loggedIn ?
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button color="inherit" onClick={handleClickAddBook}>Add Book</Button>
                    <Button color="inherit" onClick={handleClickLogout}>Logout</Button>
                </ButtonGroup> :
                <Button color="inherit" onClick={handleClickOpenLoginForm}>Login</Button>}
        </NavBar>
        <LoginFormDialog open={openLoginForm}
                         handleClose={handleCloseLoginForm}
                         handleSuccess={handleLoginSuccess}/>
        <AddBookFormDialog open={openAddBookForm}
                           handleClose={handleCloseAddBookForm}
                           handleSuccess={handleAddBookSuccess}/>

        <Container maxWidth="md">
            <BookTable
                books={books}
                onDeleteSuccess={updateBooks}
                showButtons={loggedIn}/>
        </Container>
    </div>);


}