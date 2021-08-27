import * as React from 'react';
import {NavBar} from "./NavBar";
import FormDialog from "./FormDialog";
import Button from "@material-ui/core/Button";

export const App = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
        <NavBar titleText="Bookshelf">
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
        </NavBar>
        <FormDialog open={open} handleClose={handleClose} />
    </div>);


}