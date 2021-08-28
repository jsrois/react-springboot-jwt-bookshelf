import * as React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Chip, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"
import {BookApi} from "../api/BookApi";

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
                        <TableRow key={book.name}>
                            <TableCell align="left">{book.title}</TableCell>
                            <TableCell align="left">{book.author}</TableCell>
                            {showButtons && <TableCell>
                                {showBookState && <Chip
                                    variant="outlined"
                                    size="small"
                                    label={textForReadStatus(book.readStatus)}/>}
                                <IconButton aria-label="delete" className={classes.margin}>
                                    <DeleteIcon onClick={deleteBookById(book.id)}/>
                                </IconButton>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};