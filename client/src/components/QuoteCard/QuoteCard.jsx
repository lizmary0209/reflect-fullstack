import "./QuoteCard.css";

function QuoteCard({ quote, author }) {
    return (
        <section className="quote-card" aria-label="Daily quote">
            <p className="quote-card__quote">"{quote}"</p>
            <p className="quote-card__author">- {author}</p>
        </section>
    );
}

export default QuoteCard;