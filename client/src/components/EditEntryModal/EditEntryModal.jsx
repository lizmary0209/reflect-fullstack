import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditEntryModal.css";

function EditEntryModal({ isOpen, onClose, onUpdateEntry, isLoading, entry }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("neutral");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (!isOpen || !entry) return;

        setTitle(entry.title || "");
        setBody(entry.body || "");
        setMood(entry.mood || "neutral");
        setTags(Array.isArray(entry.tags) ? entry.tags.join(", ") : "");
    }, [isOpen, entry]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!entry?._id) return;

        const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

        onUpdateEntry(entry._id, {
            title, 
            body, 
            mood, 
            tags: tagsArray,
        });
    };

    return (
        <ModalWithForm
         isOpen={isOpen}
          title="Edit Entry"
           onClose={onClose}
            onSubmit={handleSubmit}
            >
            <label className="auth__label">
                Title
                <input className="auth__input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update title"
                minLength="1"
                maxLength="100"
                required
                />
            </label>

            <label className="auth__label">
                Entry
                <textarea
                className="entry__textarea"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Update your entry..."
                minLength="1"
                maxLength="5000"
                required
                />
            </label>

            <label className="auth__label">
                Mood
                <select 
                className="auth__input"
                 name="mood"
                  value={mood}
                   onChange={(e) => setMood(e.target.value)}
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

            <div className="auth__actions">
            <button className="auth__button" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
            </div>
</ModalWithForm>
    );
}

export default EditEntryModal;