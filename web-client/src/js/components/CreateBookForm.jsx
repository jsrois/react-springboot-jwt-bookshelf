import * as React from 'react'
import {useState} from "react";
import {AuthApi} from "../api/AuthApi";
import {CredentialsManager} from "../session/CredentialsManager";
import {Field, Form, Formik} from "formik";
import {BookApi} from "../api/BookApi";

export const CreateBookForm = ({onSuccess}) => {

    const bookApi = new BookApi();

    const [error, setError] = useState(false)

    return (<div className="formModal">
            <Formik
                initialValues={{
                    title: '',
                    author: ''
                }}
                onSubmit={({title, author}) => {
                    bookApi.addBook(title, author)
                        .then(response => {
                            if (response.ok) {
                                return response
                            } else {
                                throw new Error('error when trying to create a new book')
                            }
                        })
                        .then(r => r.json())
                        .then(onSuccess)
                        .catch(() => setError(true))
                }}>
                <Form className="formModalCard">
                    <h1>Login</h1>
                    <label htmlFor="title">title</label>
                    <Field name="title" id="title"/>
                    <label htmlFor="author">author</label>
                    <Field name="author" id="author"/>
                    <button type="submit">Send</button>
                    {error && <p className="errorMsg">An error occurred</p>}
                </Form>
            </Formik>

        </div>
    )
};