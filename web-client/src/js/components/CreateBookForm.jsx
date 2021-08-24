import * as React from 'react'

export const CreateBookForm = ({onSuccess}) => (<div className="formModal">
        <div className="formModalCard">
            <h1>Login</h1>
            <label htmlFor="title">title</label>
            <input name="title" id="title"/>
            <label htmlFor="author">author</label>
            <input name="author" id="author"/>
            <button onClick={onSuccess}>Send</button>
        </div>
    </div>
)