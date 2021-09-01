import * as React from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Alert} from "@material-ui/lab";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useState} from "react";
import {CommentApi} from "../../api/CommentApi";


export const AddCommentDialog = (props) => {

    const [error, setError] = useState(false)
    const [comment, setComment] = useState("")

    const onClickSave = async () => {
        const commentApi = new CommentApi()
        commentApi.createComment(props.book.id, comment)
            .then(props.handleClose)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
            <DialogContent>
                <TextField
                    multiline
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comment"
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                />
                {error && <Alert severity="error">Something went wrong!</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClickSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}