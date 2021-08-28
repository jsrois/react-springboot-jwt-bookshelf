import * as React from 'react';
import {NavBar} from "./NavBar";
import LoginFormDialog from "./LoginFormDialog";
import Button from "@material-ui/core/Button";
import {useEffect, useState} from "react";
import {Box, ButtonGroup, Container, Table} from "@material-ui/core";
import AddBookFormDialog from "./AddBookFormDialog";
import {BookTable} from "./BookTable";
import {fakeBooks} from "../api/fakeData";
import {BookApi} from "../api/BookApi";
import {CredentialsManager} from "../session/CredentialsManager";
import {ReadStatusToggle} from "./ReadStatusToggle";
import Grid from "@material-ui/core/Grid";


const bookApi = new BookApi()
const credentialsManager = new CredentialsManager();

function hasToken() {
    return credentialsManager.getToken() !== null;
}

export const App = () => {

    const [books, setBooks] = useState([])
    const [bookFilter, setBookFilter] = useState('')

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

    const getBookSelection = () => {
        if (bookFilter === '') {
            return books
        }

        return books.filter(book => book.readStatus === bookFilter)
    }


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

        <Box m={3}>
            <Grid container spacing="3">
                <Grid item xs="2">
                    <Box display="flex" justifyContent="flex-end">
                        <ReadStatusToggle setBookFilter={setBookFilter}/>
                    </Box>
                </Grid>
                <Grid item xs="10">
                    <BookTable
                        books={getBookSelection()}
                        onDeleteSuccess={updateBooks}
                        showButtons={loggedIn}/>

                </Grid>
            </Grid>
        </Box>
    </div>);


}