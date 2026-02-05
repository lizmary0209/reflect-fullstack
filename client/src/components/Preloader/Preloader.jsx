import "./Preloader.css";

function Preloader({ text = "Loading..." }) {
    return (
       <section className="preloader" aria-label="Loading">
        <div className="circle-preloader"></div>
        <p className="preloader__text">{text}</p>
       </section>
    );
}

export default Preloader;