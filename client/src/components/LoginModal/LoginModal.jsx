import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, isLoading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
        <p className="modal__error">Please enter a valid email address.</p>
      </label>

      <label className="auth__label">
        Password
        <div className="password-field">
          <input
            className="auth__input auth__input_password"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength="8"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isPasswordVisible ? (
                <>
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94" />
                  <path d="M1 1l22 22" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
          <p className="modal__error">Password must be at least 8 characters.</p>
        </div>
      </label>

      {error ? <p className="modal__api-error">{error}</p> : null}

      <div className="auth__actions">
        <button className="auth__button" type="submit" disabled={isLoading}>
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
