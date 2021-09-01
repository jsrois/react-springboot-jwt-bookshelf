import * as React from 'react'
import TableCell from "@material-ui/core/TableCell";
import {Badge, Box, Chip, IconButton} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import {AddCommentDialog} from "./dialogs/AddCommentDialog";
import {useState} from "react";

export const BookRow = (props) => {

    const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false)

    const onCommentIconClick = () => {
        setOpenNewCommentDialog(true)
    }

    const onCloseAddCommentDialog = () => {
        setOpenNewCommentDialog(false)
    }

    return (
        <TableRow key={props.book.name}>
            <AddCommentDialog
                book={props.book}
                open={openNewCommentDialog}
                handleClose={onCloseAddCommentDialog}
            />
            <TableCell align="left">{props.book.title}</TableCell>
            <TableCell align="left">{props.book.author}</TableCell>
            {props.showButtons && <TableCell>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                    <IconButton>
                        <Badge color="secondary" badgeContent={props.book.comments} onClick={onCommentIconClick}>
                            <CommentIcon/>
                        </Badge>
                    </IconButton>
                    {props.showBookState && <Chip
                        variant="outlined"
                        size="small"
                        label={props.textForReadStatus(props.book.readStatus)}/>}
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={props.deleteBookById(props.book.id)}/>
                    </IconButton>
                </Box>
            </TableCell>}
        </TableRow>
    );
}