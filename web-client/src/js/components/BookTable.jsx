import * as React from 'react'
import {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {BookApi} from "../api/BookApi";
import {BookRow} from "./BookRow";

const bookApi = new BookApi();

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const BookTable = ({books, onDeleteSuccess, showButtons, showBookState}) => {
    const classes = useStyles();

    const deleteBookById = (id) => () => {
        bookApi.deleteBook(id)
            .then(onDeleteSuccess)
    }


    const textForReadStatus = (status) => {
        return {
            'WISHLIST': 'wishlist',
            'NOT_READ': 'not read',
            'READING': 'reading',
            'FINISHED': 'finished'
        }[status]
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Author</TableCell>
                        {showButtons && <TableCell/>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <BookRow
                            book={book}
                            showButtons={showButtons}
                            showBookState={showBookState}
                            textForReadStatus={textForReadStatus}
                            deleteBookById={deleteBookById}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};