import React, {useState} from "react";
import "../styles/Login.css";
import {useCookies} from "react-cookie";

export default function ResetPassword(){
    const [cookies, setCookie] = useCookies(['token']);
    const [passwordChanged, setPasswordChanged] = useState(false);

    function resetPassword() {
        const newPassword = {
            newPassword: document.getElementById("newPassword").value,
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: cookies.token
            },
            body: JSON.stringify(newPassword)
        };

        const oldPassword = document.getElementById("oldPassword").value;

        if (sessionStorage.getItem("role") === "student"){
            fetch('http://localhost:8000/api/v1/students/password/' + oldPassword , options)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200){
                        alert("Password changed successfully");
                    } else {
                        alert(response.message);
                    }
                })
                .catch(err => console.error(err));
        }else{
            fetch('http://localhost:8000/api/v1/teachers/password/' + oldPassword , options)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200){
                        setPasswordChanged(true);
                        alert("Password changed successfully");


                    } else {
                        return alert(response.message);
                    }
                })
                .catch(err => console.error(err));
        }
        console.log(passwordChanged);
    }

    return (
        <div className="login-container">
            <h1>Reset your password</h1>

            <form>
                <h4>Enter your password here!</h4>
                <input type="email" id="email" name="email" placeholder="Email here!"/><br></br><br/>

                <input type="password" id="oldPassword" name="oldPassword"  placeholder="Old Password here!"/><br></br><br/>
                <input type="password" id="newPassword" name="newPassword"  placeholder="New Password here!"/><br></br><br/><br/>
                <a className="login--button" onClick={resetPassword} >Change Password</a><br/><br/>
            </form>

            {passwordChanged ? window.location.href = "/login" : null}
        </div>
    );
}
