import * as React from 'react'

export const LoginForm = ({onSuccess}) => (<div className="loginForm">
        <div className="loginFormCard">
            <h1>Login</h1>
            <label htmlFor="username">username</label>
            <input name="username" id="username"/>
            <label htmlFor="password">password</label>
            <input name="password" id="password"/>
            <button onClick={onSuccess}>Send</button>
        </div>
    </div>
)