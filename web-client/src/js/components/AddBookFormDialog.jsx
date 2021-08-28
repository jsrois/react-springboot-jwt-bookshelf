import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {BookApi} from "../api/BookApi";
import {Alert} from "@material-ui/lab";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

const bookApi = new BookApi()

const AddBookFormDialog = (props) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const [error, setError] = useState(false)
    const [readStatus, setReadStatus] = useState('WISHLIST')


    const handleAddBookClick = () => {
        bookApi.addBook(title, author, readStatus)
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error('error when trying to create a new book')
                }
            })
            .then(r => r.json())
            .then(props.handleSuccess)
            .catch(() => setError(true))
    }

    const handleStatusSelection = (e, selection) => setReadStatus(selection)

    const to = (f) => (e) => f(e.target.value)

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    onChange={to(setTitle)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="author"
                    label="Author"
                    type="text"
                    onChange={to(setAuthor)}
                    fullWidth
                />
                <FormLabel component="legend">Read Status</FormLabel>
                <RadioGroup aria-label="read-status" value={readStatus} onChange={handleStatusSelection}>
                    <FormControlLabel value="WISHLIST" control={<Radio/>} label="Wishlist"/>
                    <FormControlLabel value="NOT_READ" control={<Radio/>} label="Not read"/>
                    <FormControlLabel value="READING" control={<Radio/>} label="Reading"/>
                    <FormControlLabel value="FINISHED" control={<Radio/>} label="Finished"/>
                </RadioGroup>
                {error && <Alert severity="error">Something went wrong!</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddBookClick} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>

    );
};
export default AddBookFormDialog