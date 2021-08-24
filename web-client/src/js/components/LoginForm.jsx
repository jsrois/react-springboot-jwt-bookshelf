import * as React from 'react'
import {Formik, Form, Field} from 'formik'
import {AuthApi} from "../api/AuthApi";
import {CredentialsManager} from "../session/CredentialsManager";
import {useState} from "react";

export const LoginForm = ({onSuccess}) => {

    const [error, setError] = useState(false)

    const authApi = new AuthApi()
    const credentialsManager = new CredentialsManager()

    return (<div className="formModal">
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={({username, password}) => {
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
                        .then(onSuccess)
                        .catch(() => setError(true))
                }}>
                <Form className="formModalCard">
                    <h1>Login</h1>
                    <label htmlFor="username">username</label>
                    <Field name="username" id="username"/>
                    <label htmlFor="password">password</label>
                    <Field type="password" name="password" id="password"/>
                    <button type="submit">Send</button>
                    { error && <p className="errorMsg">Login failed</p>}
                </Form>
            </Formik>

        </div>
    );
}