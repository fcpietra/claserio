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

            <a className="login--button" href="home">Log in</a><br/><br/><br/>
            <a href="/recovery">I forgot my password</a><br/><br/>
            <a href="/register/user">I don't have an account</a>
        </div>
    );
}
