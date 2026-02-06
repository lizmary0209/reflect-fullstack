import { useEffect, useState } from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./NewEntryModal.css";

function NewEntryModal({ isOpen, onClose, onCreateEntry, isLoading, error }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("neutral");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        setTitle("");
        setBody("");
        setMood("neutral");
        setTags("");
}, [isOpen]);

if (!isOpen) return null;

const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

    onCreateEntry({
        title, 
        body, 
        mood, 
        tags: tagsArray,
    });
};

return (
    <ModalWithForm
     isOpen={isOpen}
      title="New Entry"
       onClose={onClose}
        onSubmit={handleSubmit}
        >
        <label className="auth__label">
            Title
            <input
            className="auth__input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title"
            minLength="1"
            maxLength="100"
            required
            />
            <p className="modal__error">Title is required.</p>
        </label>

        <label className="auth__label">
            Entry
            <textarea
            className="entry__textarea"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write what's on your heart..."
            minLength="1"
            maxLength="5000"
            required
            />
            <p className="modal__error">Entry is required.</p>
        </label>

        <label className="auth__label">
            Mood
            <select
             className="auth__input"
              name="mood"
               value={mood}
                onChange={(e) => setMood(e.target.value)}
                required
                >
            <option value="calm">Calm</option>
            <option value="grateful">Grateful</option>
            <option value="anxious">Anxious</option>
            <option value="joyful">Joyful</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="neutral">Neutral</option>
</select>
        </label>

        <label className="auth__label">
            Tags (Comma Separated)
            <input
            className="auth__input"
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Faith, Gratitude, Progress"
            />
     </label>

     {error ? <p className="modal__api-error">{error}</p> : null}

<div className="auth__actions">
     <button className="auth__button" type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Entry"}
     </button>
     </div>
    </ModalWithForm>
);
}

export default NewEntryModal;