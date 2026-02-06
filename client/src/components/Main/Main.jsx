import { useEffect, useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import Preloader from "../Preloader/Preloader";
import { getTodayQuote } from "../../utils/api";
import "./Main.css";

function Main({
   entries,
    isLoading,
     isLoggedIn,
      onOpenNewEntry,
       onDeleteEntry,
        onEditEntry,
       }) {
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState(false);

  useEffect(() => {
    setIsLoadingQuote(true);
    setQuoteError(false);

    getTodayQuote()
      .then((data) => {
        setQuote(data);
      })
      .catch(() => {
        setQuoteError(true);
        setQuote(null);
      })
      .finally(() => {
        setIsLoadingQuote(false);
      });
  }, []);

  const formatToday = () => {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatMood = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const formatTag = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="main">
      <div className="main__header">
        <h1 className="main__title">{formatToday()}</h1>
        <p className="main__subtitle">A quiet space to reflect and write.</p>
      </div>

      {isLoadingQuote ? (
        <Preloader text="Loading quote..." />
      ) : quoteError ? (
        <div className="quote-fallback">
          Quote unavailable right now. Please try again later.
          </div>
      ) : quote ? (
        <QuoteCard quote={quote.q} author={quote.a} />
      ) : (
        <div className="quote-fallback">
          Quote unavailable right now. Please try again later.
          </div>
      )}

      <article className="journal" aria-label="Journal">
        <div className="journal__header">
          <h2 className="journal__title">Your journal</h2>
          <button className="journal__button" type="button" onClick={onOpenNewEntry} disabled={!isLoggedIn}>
            New Entry
          </button>
        </div>

        {!isLoggedIn ? (
          <ul className="journal__list">
            <li className="journal__empty">Please sign in to view your journal.</li>
          </ul>
        ) : isLoading ? (
          <Preloader text="Loading entries..." />
        ) : entries && entries.length > 0 ? (
          <ul className="journal__list">
            {entries.map((entry) => (
              <li key={entry._id} className="journal__item">
                <div className="journal__item-header">
                  <div className="journal__item-heading">
                  <h3 className="journal__item-title">{entry.title}</h3>
                  {entry.createdAt ? (
                    <p className="journal__item-date">{formatDate(entry.createdAt)}</p>
                  ) : null}
                  </div>

                  <div className="journal__item-actions">
                    <button className="journal__action journal__action_edit" type="button" onClick={() => onEditEntry(entry)}>
                      Edit
                    </button>
                    <button className="journal__action journal__action_delete" type="button" onClick={() => onDeleteEntry(entry._id)}>
                      Delete
                    </button>
                  </div>
                </div>

                <p className="journal__item-body">{entry.body}</p>


                {(entry.mood || (entry.tags && entry.tags.length > 0)) ? (
                  <div className="journal__meta">
                    {entry.mood ? (
                    <span className="journal__chip journal__chip_mood">{formatMood(entry.mood)}</span>
                    ) : null}

                    {Array.isArray(entry.tags) && entry.tags.length > 0
                    ? entry.tags.map((tag, idx) => (
                      <span key={`${entry._id}-tag-${idx}`} className="journal__chip journal__chip_tag">
                        {formatTag(tag)}
                      </span>
                    ))
                  : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="journal__list">
            <li className="journal__empty">
              No entries yet. Click <strong>New entry</strong> to start.
            </li>
          </ul>
        )}
      </article>
    </main>
  );
}

export default Main;
