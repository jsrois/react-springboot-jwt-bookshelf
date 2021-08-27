import * as React from 'react';
import {NavBar} from "./NavBar";
import LoginFormDialog from "./LoginFormDialog";
import Button from "@material-ui/core/Button";
import {useState} from "react";
import {ButtonGroup} from "@material-ui/core";
import AddBookFormDialog from "./AddBookFormDialog";

export const App = () => {

    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openAddBookForm, setOpenAddBookForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

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
    </div>);


}