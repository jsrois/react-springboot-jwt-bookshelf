import * as React from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Alert} from "@material-ui/lab";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useEffect, useState} from "react";
import {CommentApi} from "../../api/CommentApi";
import {Card, CardContent} from "@material-ui/core";


export const AddCommentDialog = (props) => {

    const [error, setError] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const reloadComments = () => {
        new CommentApi().getComments(props.book.id)
            .then(setComments)
    }

    useEffect(reloadComments, [])

    const onClickSave = async () => {
        const commentApi = new CommentApi()
        commentApi.createComment(props.book.id, newComment)
            .then(reloadComments)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Comments</DialogTitle>
            {comments.map(comment =>
                <Card>
                    <CardContent>{comment.comment}</CardContent>
                </Card>
            )}
            <DialogContent>
                <TextField
                    multiline
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comment"
                    type="text"
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                />
                {error && <Alert severity="error">Something went wrong!</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={onClickSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}