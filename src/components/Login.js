import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import '../css/style.css'
import Lottie from 'react-lottie';
import * as animationWorld from '../img/world.json';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            navigate("/homepage");
        }
        });
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/homepage");
        })
        .catch((err) => alert(err.message));
    };

    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
        alert("Please confirm that email are the same.");
        return;
        } else if (
        registerInformation.password !== registerInformation.confirmPassword
        ) {
        alert("Please confirm that password are the same.");
        return;
        }
        createUserWithEmailAndPassword(
        auth,
        registerInformation.email,
        registerInformation.password
        )
        .then(() => {
            navigate("/homepage");
        })
        .catch((err) => alert(err.message));
    };

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationWorld,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className="login">
            <h1 className="login__title">TravelBrain</h1>
            <div>
                {isRegistering ? (
                    <Lottie 
                    options={defaultOptions}
                    height={250}
                    width={250}/>
                ):
                <Lottie 
                    options={defaultOptions}
                    height={300}
                    width={300}/>
                }
            </div>
            <div className="login__content">
                {isRegistering ? (
                <>
                    <InputGroup className="mb-3 login__content-input">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Email"
                            aria-label="Email"
                            type="email"
                            aria-describedby="basic-addon1"
                            value={registerInformation.email}
                            onChange={(e) =>
                                setRegisterInformation({
                                ...registerInformation,
                                email: e.target.value
                                })
                            }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 login__content-input">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Potvrdi Email"
                            aria-label="Potvrdi Email"
                            type="email"
                            aria-describedby="basic-addon1"
                            value={registerInformation.confirmEmail}
                            onChange={(e) =>
                                setRegisterInformation({
                                ...registerInformation,
                                confirmEmail: e.target.value
                                })
                            }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 login__content-input">
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Lozinka"
                            aria-label="Lozinka"
                            type="password"
                            onChange={(e) =>
                                setRegisterInformation({
                                ...registerInformation,
                                password: e.target.value
                                })
                            }
                            value={registerInformation.password}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 login__content-input">
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Potvrdi lozinku"
                            aria-label="Potvrdi lozinku"
                            type="password"
                            onChange={(e) =>
                                setRegisterInformation({
                                ...registerInformation,
                                confirmPassword: e.target.value
                                })
                            }
                            value={registerInformation.confirmPassword}
                        />
                    </InputGroup>
                    
                    <Button variant="light" className="login__content-button" onClick={handleRegister}>Registracija</Button>
                    <Button variant="secondary" onClick={() => setIsRegistering(false)}>Nazad</Button>
                </>
                ) : (
                <>
                    <InputGroup className="mb-3 login__content-input">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Email"
                            aria-label="Email"
                            type="email"
                            aria-describedby="basic-addon1"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 login__content-input">
                        <Form.Control
                            className="login__content-input-field"
                            placeholder="Lozinka"
                            aria-label="Lozinka"
                            type="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </InputGroup>
                    <Button variant="light" className="login__content-button" onClick={handleSignIn}>
                    Prijava
                    </Button>
                    <Button
                    variant="secondary"
                    onClick={() => setIsRegistering(true)}
                    >
                    Kreiraj račun
                    </Button>
                </>
                )}
            </div>
        </div>
    );
}

export default Login;