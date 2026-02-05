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

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isUpdatingEntry, setIsUpdatingEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const openNewEntry = () => setActiveModal("new-entry");

  const closeModal = () => {
    setActiveModal("");
    setSelectedEntry(null);
  };

  const fetchEntries = () => {
    setIsLoadingEntries(true);

    return getEntries()
      .then((data) => {
        setEntries(data);
      })
      .finally(() => {
        setIsLoadingEntries(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
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
          message.toLowerCase().includes("authorization");

        if (isAuthError) {
          clearToken();
          setIsLoggedIn(false);
          setCurrentUser(null);
          setEntries([]);
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
    register({ name, email, password }).then(() => {
      closeModal();
      openLogin();
    });
  };

  const handleLogin = ({ email, password }) => {
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
      .catch(() => {});
  };

  const handleCreateEntry = (entryData) => {
    if (!isLoggedIn) return;

    setIsCreatingEntry(true);

    createEntry(entryData)
      .then((newEntry) => {
        setEntries((prev) => [newEntry, ...prev]);
        closeModal();
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

    deleteEntry(id).then(() => {
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    });
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setActiveModal("edit-entry");
  };

  const handleUpdateEntry = (id, data) => {
    if (!isLoggedIn) return;

    setIsUpdatingEntry(true);

    updateEntry(id, data)
      .then((updatedEntry) => {
        setEntries((prev) =>
          prev.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
          )
        );
        closeModal();
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
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onRegister={handleRegister}
      />

      <NewEntryModal
        isOpen={activeModal === "new-entry"}
        onClose={closeModal}
        onCreateEntry={handleCreateEntry}
        isLoading={isCreatingEntry}
      />

      <EditEntryModal
        isOpen={activeModal === "edit-entry"}
        onClose={closeModal}
        onUpdateEntry={handleUpdateEntry}
        isLoading={isUpdatingEntry}
        entry={selectedEntry}
      />
    </div>
  );
}

export default App;
