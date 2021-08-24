import * as React from 'react'
import {Formik, Form, Field} from 'formik'
import {AuthApi} from "../api/AuthApi";

export const LoginForm = ({onSuccess}) => {
    const authApi = new AuthApi()

    return (<div className="formModal">
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={({username, password}) => {
                    authApi.signIn(username, password)
                        .then(r => r.json())
                        .then(onSuccess)
                }}>
                <Form className="formModalCard">
                    <h1>Login</h1>
                    <label htmlFor="username">username</label>
                    <Field name="username" id="username"/>
                    <label htmlFor="password">password</label>
                    <Field type="password" name="password" id="password"/>
                    <button type="submit">Send</button>
                </Form>
            </Formik>

        </div>
    );
}