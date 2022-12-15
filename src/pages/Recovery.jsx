import React from "react";
import "../styles/Login.css";

export default function Recovery(){
    const [codeSent, setCodeSent] = React.useState(false);
    const [codeValidated, setCodeValidated] = React.useState(false);

    const createVerificationCode = () => {
        let email = document.getElementById("email").value;

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: '{"email": "' + email + '"}'
        };

        fetch('http://localhost:8000/api/v1/recovery', options)
            .then(response => response.json())
            .then(response => {
                sessionStorage.setItem("email", email);
                setCodeSent(true);
                alert("Code sent to your email");
            })
            .catch(err => console.error(err));
    }

    const sendVerificationCode = () => {
        let code = document.getElementById("code").value;
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password2").value;

        if (password !== password2) {
            alert("Passwords do not match");
            return;
        }

        const recovery = {
            email: sessionStorage.getItem("email"),
            code: code,
            newPassword: password
        }

        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(recovery)
        };

        fetch('http://localhost:8000/api/v1/recovery', options)
            .then(response => response.json())
            .then(response => {
                if (response.code === 200) {
                    alert("Password changed successfully");
                    setCodeValidated(true);
                    window.location.href = "/singIn";
                } else {
                    alert(response.message);
                }
            })
            .catch(err => console.error(err));

    }

    return (
        <div className="login-container">
            <h1>Get your account back!</h1>

            {
                codeSent ? (
                    <form>
                        <h4>Paste verification code and set the new password</h4>
                        <input type="text" id="code" name="code" placeholder="Verification Code here!"/><br></br><br/>

                        <input type="password" id="password" name="password"  placeholder="New Password here!"/><br></br><br/>
                        <input type="password" id="password2" name="password2"  placeholder="Confirm Password here!"/><br></br><br/>

                        <a className="login--button" onClick={sendVerificationCode}>Validate Verification Code</a><br/><br/>
                    </form>
                ) : (
                    <form>
                        <input type="text" id="email" name="email" placeholder="Email here!"/><br></br><br/>
                        <a className="login--button" onClick={createVerificationCode}>Create Verification Code</a><br/><br/>
                    </form>
                )
            }

        </div>
    );
}
