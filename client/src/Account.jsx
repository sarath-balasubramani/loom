import { useState } from "react";

function Account({ user, onSave, onSignOut, wishCount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const found = {};
    if (!name.trim()) {
      found.name = "Enter your name.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      found.email = "Enter a valid email address.";
    }
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSave({ name: name.trim(), email: email.trim() });
    }
  }

  if (user) {
    return (
      <section className="wrap page">
        <header className="ph">
          <h1>Hello, {user.name.split(" ")[0]}</h1>
          <p className="muted">{user.email}</p>
        </header>
        <div className="panel narrow">
          <p>Saved pieces: {wishCount}</p>
          <button className="btn ghost" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="wrap page">
      <header className="ph">
        <h1>Account</h1>
        <p className="muted">
          Create a profile to prefill checkout and keep your
          orders in one place.
        </p>
      </header>
      <form className="panel narrow" onSubmit={handleSubmit}
        noValidate>
        <div className="field">
          <label htmlFor="an">Full name</label>
          <input
            id="an"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          <span className="err">{errors.name}</span>
        </div>
        <div className="field">
          <label htmlFor="ae">Email</label>
          <input
            id="ae"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          <span className="err">{errors.email}</span>
        </div>
        <button className="btn" type="submit">
          Create profile
        </button>
        <p className="muted small">
          No password needed. Your profile is kept in this
          browser only.
        </p>
      </form>
    </section>
  );
}

export default Account;
