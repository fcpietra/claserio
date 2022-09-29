import React from "react";
import "../styles/Login.css";

export default function Recovery(){
    return (
        <div className="login-container">
            <h1>Get your account back!</h1>
            <form>
                <input type="text" name="email" placeholder="Email here!"/><br></br>
                <input type="password" name="password" placeholder="Old Password here!"/><br></br>
                <input type="password" name="password" placeholder="New Password here!"/><br></br>
                <input type="password" name="password" placeholder="New Password here AGAIN!"/><br></br>
            </form>
            <br/><br/>

            <a className="login--button" href="/login">Change my password</a><br/><br/>
        </div>
    );
}
