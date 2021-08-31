import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationBar} from "./NavigationBar";
import LoginFormDialog from "./LoginFormDialog";
import Button from "@material-ui/core/Button";
import {Box, ButtonGroup} from "@material-ui/core";
import AddBookFormDialog from "./AddBookFormDialog";
import {BookTable} from "./BookTable";
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
    const [filteredBooks, setFilteredBooks] = useState([])
    const [readStatusFilter, setReadStatusFilter] = useState('')
    const [titleFilter, setTitleFilter] = useState('')

    function reloadBooks() {
        bookApi.getBooks().then(setBooks)
    }

    useEffect(reloadBooks, [])

    useEffect(() => {

        let filters = []

        if (readStatusFilter !== '') {
            filters = [...filters, (book) => book.readStatus === readStatusFilter]
        }

        if (titleFilter !== '') {
            filters = [...filters, book =>
                book.title.toLowerCase().includes(titleFilter.toLowerCase()) ||
                book.author.toLowerCase().includes(titleFilter.toLowerCase())
            ]
        }

        const booksToShow = filters.reduce((acc, f) => acc.filter(f), books)

        setFilteredBooks(booksToShow)
    }, [books, readStatusFilter, titleFilter])

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
        reloadBooks();
    };

    const countByReadStatus = function (books) {
        const bookCountMap = books
            .map(b => b.readStatus)
            .reduce((m, n) => ({...m, [n]: -~m[n]}), {})
        return {...bookCountMap, ['all']: books.length};
    };

    const onSearchBarChange = (event) => {
        const keyword = event.target.value;
        setTitleFilter(keyword)
    }

    return (<div>
        <NavigationBar
            titleText={"📚Bookshelf"}
            loggedIn={loggedIn}
            onSearchBarChange={onSearchBarChange}
            handleClickAddBook={handleClickAddBook}
            handleClickLogout={handleClickLogout}
            handleClickOpenLoginForm={handleClickOpenLoginForm}/>

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
                        <ReadStatusToggle
                            setBookFilter={setReadStatusFilter}
                            bookCount={countByReadStatus(filteredBooks)}/>
                    </Box>
                </Grid>
                <Grid item xs="10">
                    <BookTable
                        books={filteredBooks}
                        onDeleteSuccess={reloadBooks}
                        showButtons={loggedIn}
                        showBookState={readStatusFilter === ''}/>

                </Grid>
            </Grid>
        </Box>
    </div>);


}