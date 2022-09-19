import React from "react";
import "../styles/Login.css";

export default function Login(){
    return (
        <div className="login-container">
            <h1>Log in now!</h1>
            <form>
                <input type="text" name="email" placeholder="Email here!"/><br></br>
                <input type="password" name="password" placeholder="Password here!"/><br></br>
            </form>

            <br/>

            <a className="login--button" href="#">Log in</a><br/><br/>
            <a href="#">I forgot my password</a>
        </div>
    );
}
