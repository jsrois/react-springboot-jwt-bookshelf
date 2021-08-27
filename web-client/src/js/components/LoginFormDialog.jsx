import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AuthApi} from "../api/AuthApi";
import {CredentialsManager} from "../session/CredentialsManager";
import {Alert} from "@material-ui/lab";

const authApi = new AuthApi()
const credentialsManager = new CredentialsManager()

const LoginFormDialog = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleLoginClick = () => {
        authApi.signIn(username, password)
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error('error when trying to sign in')
                }
            })
            .then(r => r.json())
            .then(({accessToken}) => credentialsManager.updateToken(accessToken))
            .then(props.handleSuccess)
            .catch(() => setError(true))

    }

    const to = (f) => (e) => f(e.target.value)

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    onChange={to(setUsername)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={to(setPassword)}
                    fullWidth
                />
                {error && <Alert severity="error">Login failed</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLoginClick} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>

    );
};
export default LoginFormDialog