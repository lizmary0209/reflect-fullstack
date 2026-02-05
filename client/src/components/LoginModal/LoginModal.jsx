import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };


    return (
        <ModalWithForm
         isOpen={isOpen}
          title="Sign in"
           onClose={onClose}
            onSubmit={handleSubmit}
            >
            <label className="auth__label">
                Email
                <input
                 className="auth__input"
                 type="email"
                  name="email"
                   value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     placeholder="you@example.com"
                     required
                      />
            </label>

            <label className="auth__label">
                Password
                <input
                 className="auth__input"
                  type="password"
                   name="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"
                   required
                    />
            </label>

            <button className="auth__button" type="submit">
                Sign in
            </button>
        </ModalWithForm>
    );
}

export default LoginModal;