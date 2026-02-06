import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NewEntryModal from "../NewEntryModal/NewEntryModal";
import EditEntryModal from "../EditEntryModal/EditEntryModal";

import {
  register,
  login,
  getCurrentUser,
  getEntries,
  createEntry,
  deleteEntry,
  updateEntry,
  setToken,
  clearToken,
} from "../../utils/api";

import { STORAGE_KEYS } from "../../utils/config";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isUpdatingEntry, setIsUpdatingEntry] = useState(false);

  
  const [selectedEntry, setSelectedEntry] = useState(null);

const [authError, setAuthError] = useState("");
const [entryError, setEntryError] = useState("");

  const openLogin = () => {
    setAuthError("");
    setEntryError("");
    setActiveModal("login");
  };


  const openRegister = () => {
    setAuthError("");
    setEntryError("");
    setActiveModal("register");
  };


  const openNewEntry = () => {
    setEntryError("");
    setActiveModal("new-entry");
  }

  const closeModal = () => {
    setActiveModal("");
    setSelectedEntry(null);
    setAuthError("");
    setEntryError("");
  };

  const fetchEntries = () => {
    setIsLoadingEntries(true);
    setEntryError("");

    return getEntries()
      .then((data) => {
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setEntries([]);
        setEntryError(String(err || "Failed to load entries."));
      })
      .finally(() => {
        setIsLoadingEntries(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.JWT);
    if (!token) return;

    Promise.all([getCurrentUser(), fetchEntries()])
      .then(([user]) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        const message = String(err || "");
        const isAuthError =
          message.includes("401") ||
          message.toLowerCase().includes("authorization") ||
          message.toLocaleLowerCase().includes(STORAGE_KEYS.JWT);

        if (isAuthError) {
          clearToken();
          setIsLoggedIn(false);
          setCurrentUser(null);
          setEntries([]);
        } else {
          setEntryError("Something went wrong while loading your account.");
        }
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEsc = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  const handleRegister = ({ name, email, password }) => {
    setIsAuthSubmitting(true);
    setAuthError("");

    register({ name, email, password })
    .then(() => {
      closeModal();
      openLogin();
    })
    .catch((err) => {
      setAuthError(String(err || "Unable to sign up. Please try again."));
    })
    .finally(() => {
      setIsAuthSubmitting(false);
    });
  };

  const handleLogin = ({ email, password }) => {
    setIsAuthSubmitting(true);
    setAuthError("");


    login({ email, password })
      .then(({ token }) => {
        setToken(token);
        setIsLoggedIn(true);
        return Promise.all([getCurrentUser(), fetchEntries()]);
      })
      .then(([user]) => {
        setCurrentUser(user);
        closeModal();
      })
      .catch((err) => {
        setAuthError(String(err || "Unable to sign in. Please try again."));
      })
      .finally(() => {
        setIsAuthSubmitting(false);
      });
  };

  const handleCreateEntry = (entryData) => {
    if (!isLoggedIn) return;

    setIsCreatingEntry(true);
    setEntryError("");

    createEntry(entryData)
      .then((newEntry) => {
        setEntries((prev) => [newEntry, ...prev]);
        closeModal();
      })
      .catch((err) => {
        setEntryError(String(err || "Unable to create entry."));
      })
      .finally(() => {
        setIsCreatingEntry(false);
      });
  };

  const handleDeleteEntry = (id) => {
    if (!isLoggedIn) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this entry? This action cannot be undone."
    );

    if (!confirmed) return;

    setEntryError("");

    deleteEntry(id).then(() => {
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    })
    .catch((err) => {
      setEntryError(String(err || "Unable to delete entry."));
    });
  };

  const handleEditEntry = (entry) => {
    setEntryError("");
    setSelectedEntry(entry);
    setActiveModal("edit-entry");
  };

  const handleUpdateEntry = (id, data) => {
    if (!isLoggedIn) return;

    setIsUpdatingEntry(true);
    setEntryError("");

    updateEntry(id, data)
      .then((updatedEntry) => {
        setEntries((prev) =>
          prev.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
          )
        );
        closeModal();
      })
      .catch((err) => {
        setEntryError(String(err || "Unable to update entry."));
      })
      .finally(() => {
        setIsUpdatingEntry(false);
      });
  };

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEntries([]);
    setActiveModal("");
    setSelectedEntry(null);
    setAuthError("");
    setEntryError("");
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onLogout={handleLogout}
      />

      <Navigation />

      <div className="app__content">
        <div className="app__container">
          {entryError ? <p className="app__error">{entryError}</p> : null}


          <Routes>
            <Route
              path="/"
              element={
                <Main
                  entries={entries}
                  isLoading={isLoadingEntries}
                  isLoggedIn={isLoggedIn}
                  onOpenNewEntry={openNewEntry}
                  onDeleteEntry={handleDeleteEntry}
                  onEditEntry={handleEditEntry}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile currentUser={currentUser} isLoggedIn={isLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onLogin={handleLogin}
        isLoading={isAuthSubmitting}
        error={authError}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onRegister={handleRegister}
        isLoading={isAuthSubmitting}
        error={authError}
      />

      <NewEntryModal
        isOpen={activeModal === "new-entry"}
        onClose={closeModal}
        onCreateEntry={handleCreateEntry}
        isLoading={isCreatingEntry}
        error={entryError}
      />

      <EditEntryModal
        isOpen={activeModal === "edit-entry"}
        onClose={closeModal}
        onUpdateEntry={handleUpdateEntry}
        isLoading={isUpdatingEntry}
        entry={selectedEntry}
        error={entryError}
      />
    </div>
  );
}

export default App;
