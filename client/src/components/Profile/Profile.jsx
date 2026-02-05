import "./Profile.css";

function Profile({ currentUser, isLoggedIn }) {
    if (!isLoggedIn || !currentUser) {
    return (
        <main className="profile">
            <p className="profile__empty">Please sign in to view your profile.</p>
        </main>
    );
}

return (
    <main className="profile">
        <section className="profile__card">
            <h1 className="profile__title">Your profile</h1>

            <div className="profile__field">
                <span className="profile__label">Name</span>
                <span className="profile__value">{currentUser.name}</span>
            </div>

            <div className="profile__field">
                <span className="profile__label">Email</span>
                <span className="profile__value">{currentUser.email}</span>
                </div>
        </section>
    </main>
);
}


export default Profile;