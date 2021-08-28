import * as React from 'react'

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import {useState} from "react";

export const ReadStatusToggle = ({setBookFilter, bookCount}) => {
    const [selection, setSelection] = useState("all");

    const handleChange = (event, newSelection) => {
        if (newSelection === "all") {
            setBookFilter('')
        }
        else {
            setBookFilter(newSelection)
        }
        setSelection(newSelection);
    };

    return (
        <ToggleButtonGroup orientation="vertical" size="medium" value={selection} exclusive onChange={handleChange}>
            <ToggleButton value="all">
                <LibraryBooksIcon/>
                <Typography>{`All books (${bookCount['all']})`}</Typography>
            </ToggleButton>
            <ToggleButton value="WISHLIST">
                <BookmarkBorderIcon/>
                <Typography>{`Wishlist (${bookCount['WISHLIST'] || 0})`}</Typography>
            </ToggleButton>
            <ToggleButton value="NOT_READ">
                <CheckBoxOutlineBlankIcon/>
                <Typography>{`Not read (${bookCount['NOT_READ'] || 0})`}</Typography>
            </ToggleButton>
            <ToggleButton value="READING">
                <TimelapseIcon/>
                <Typography>{`Reading (${bookCount['READING'] || 0})`}</Typography>
            </ToggleButton>
            <ToggleButton value="FINISHED">
                <CheckCircleIcon/>
                <Typography>{`Finished (${bookCount['FINISHED'] || 0})`}</Typography>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};