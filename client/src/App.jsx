import { useEffect, useState } from "react";
import Account from "./Account";
import Shop, { ProductArt, ProductCard } from "./Shop";
import "./App.css";

const API = "/api";
const CATS = ["Kitchen", "Textiles", "Lighting", "Home", "Carry & Desk"];

const ICONS = {
  search: <><circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6
    4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  user: <><circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c.8-4 4-6 7.5-6s6.7 2 7.5 6" /></>,
  bag: <><path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />
};

const PAGES = {
  about: {
    title: "About Loom & Lathe",
    body: [
      ["Why runs of forty", "Small runs mean every piece is " +
        "looked at by the person who made it and again by us."],
      ["What we will not do", "Mark prices up to discount them " +
        "later, or ship in plastic fill."]
    ]
  },
  faq: {
    title: "Frequently asked questions",
    body: [
      ["How long does delivery take?", "Standard delivery takes " +
        "4 to 6 working days. Express takes 1 to 2."],
      ["Is shipping free?", "Orders above ₹2,000 ship free. " +
        "Below that, standard delivery is ₹99."],
      ["Can I return something?", "Yes. Send back unused " +
        "pieces within 14 days of delivery."]
    ]
  },
  contact: {
    title: "Contact",
    body: [
      ["Email", "hello@loomandlathe.example"],
      ["Hours", "Monday to Saturday, 10:00 to 18:00 IST"]
    ]
  }
};

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>;
}

function Header({ to, wishCount }) {
  const [open, setOpen] = useState(false);
  const nav = (page) => e => {
    setOpen(false);
    to(page)(e);
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          Free shipping across India on orders above ₹2,000
        </div>
      </div>
      <header className="site">
        <div className="wrap bar">
          <a className="logo" href="#home" onClick={nav("home")}>
            Loom<span>&amp;</span>Lathe
          </a>
          <nav className={"nav" + (open ? " open" : "")}>
            <a href="#shop" onClick={nav("shop")}>Shop</a>
            <a href="#about" onClick={nav("about")}>About</a>
            <a href="#faq" onClick={nav("faq")}>FAQ</a>
            <a href="#contact" onClick={nav("contact")}>Contact</a>
          </nav>
          <div className="tools">
            <button className="ib" aria-label="Search products"
              onClick={nav("shop")}>
              <Icon name="search" />
            </button>
            <button className="ib" aria-label="Wishlist"
              onClick={nav("wishlist")}>
              <Icon name="heart" />
              {wishCount > 0 && (
                <span className="badge">{wishCount}</span>
              )}
            </button>
            <button className="ib" aria-label="Account"
              onClick={nav("account")}>
              <Icon name="user" />
            </button>
            <button className="ib" aria-label="Cart">
              <Icon name="bag" />
            </button>
            <button className="ib menu-btn" aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function HeroTile({ product, to, className }) {
  return (
    <a className={className} href="#shop" onClick={to("shop")}>
      <div className="tile"><ProductArt product={product} /></div>
      <div className="cap">
        <span>{product.batch}</span>
        <span>{product.name}</span>
      </div>
    </a>
  );
}

function Home({ products, to, wish, onToggle }) {
  const pick = batch => products.find(p => p.batch === batch);
  const featured = products.filter(p => p.feat);
  const trust = [
    ["Free shipping over ₹2,000", "Flat ₹99 below that."],
    ["14-day returns", "Unused pieces, no questions."],
    ["Batch card in every box", "Who made it, and when."],
    ["Two-year repair service", "Chips, wobbles and loose fringe."]
  ];
  const steps = [
    ["The workshop makes a batch", "Potters, weavers and joiners " +
      "work in runs of 20 to 200, never more."],
    ["Each piece is checked and numbered", "Flaws are set aside. " +
      "The rest get a number on the batch card."],
    ["It ships to you in plain packaging", "Paper, card and " +
      "cotton wrap. No plastic fill, nothing to sort afterwards."]
  ];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Small-batch home goods</p>
            <h1>Objects for daily use, made in runs of forty.</h1>
            <p className="lede">
              Stoneware, linen, brass and oak from workshops we
              visit in person. Every piece ships with a batch
              card that tells you when and where it was made.
            </p>
            <div className="row">
              <a className="btn" href="#shop" onClick={to("shop")}>
                Shop all pieces
              </a>
              <a className="btn ghost" href="#about"
                onClick={to("about")}>
                Our workshops
              </a>
            </div>
          </div>
          <div className="hero-art">
            <HeroTile className="big" to={to}
              product={pick("LL-0377")} />
            <HeroTile to={to} product={pick("LL-0431")} />
            <HeroTile to={to} product={pick("LL-0412")} />
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="wrap trust-g">
          {trust.map(([title, text]) => (
            <div key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-h">
            <h2>New on the bench</h2>
            <a className="link" href="#shop" onClick={to("shop")}>
              View all pieces
            </a>
          </div>
          <div className="grid">
            {featured.map(p => (
              <ProductCard key={p._id} product={p}
                saved={wish.includes(p._id)}
                onToggle={onToggle} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec flush">
        <div className="wrap">
          <div className="sec-h"><h2>Shop by room and use</h2></div>
          <div className="cats">
            {CATS.map(c => (
              <a key={c} className="cat" href="#shop"
                onClick={to("shop", c)}>
                <div className="tile">
                  <ProductArt
                    product={products.find(p => p.cat === c)} />
                </div>
                <b>{c}</b>
                <span className="mono muted">
                  {products.filter(p => p.cat === c).length} pieces
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="story sec">
        <div className="wrap story-g">
          <div>
            <p className="eyebrow">How a batch works</p>
            <h2>Forty pieces, checked one at a time.</h2>
            <p className="muted story-p">
              We keep runs small so each piece gets looked at.
              If a mug has a pinhole or a throw has a pulled
              thread, it never leaves the workshop.
            </p>
            <div className="row">
              <a className="btn ghost" href="#about"
                onClick={to("about")}>
                Read our story
              </a>
            </div>
          </div>
          <ol className="steps">
            {steps.map(([title, text], i) => (
              <li key={title}>
                <span className="mono">STEP {i + 1}</span>
                <div><b>{title}</b><span>{text}</span></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function Info({ page }) {
  const { title, body } = PAGES[page];
  return (
    <section className="wrap page">
      <header className="ph"><h1>{title}</h1></header>
      <div className="prose">
        {body.map(([heading, text]) => (
          <div key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ to }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function subscribe(e) {
    e.preventDefault();
    try {
      const res = await fetch(API + "/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMsg(data.message);
      if (res.ok) setEmail("");
    } catch (err) {
      setMsg("Unable to connect to server");
    }
  }

  return (
    <>
      <section className="deep">
        <div className="wrap news-in">
          <div>
            <h2>Batch notes</h2>
            <p>
              A short email when a new batch is poured, woven or
              turned. Twice a month at most.
            </p>
          </div>
          <form onSubmit={subscribe}>
            <div className="inline">
              <label className="sr" htmlFor="ne">Email address</label>
              <input id="ne" type="email" value={email}
                placeholder="you@example.com" required
                onChange={e => setEmail(e.target.value)} />
              <button className="btn" type="submit">Subscribe</button>
            </div>
            <span className="err">{msg}</span>
          </form>
        </div>
      </section>
      <footer className="deep foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#home" onClick={to("home")}>
                Loom<span>&amp;</span>Lathe
              </a>
              <p>
                Household objects from small workshops, made in
                runs of forty and shipped with a batch card.
              </p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>
                {CATS.map(c => (
                  <li key={c}>
                    <a href="#shop" onClick={to("shop", c)}>{c}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li><a href="#faq" onClick={to("faq")}>FAQ</a></li>
                <li>
                  <a href="#contact" onClick={to("contact")}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#about" onClick={to("about")}>About</a>
                </li>
                <li>
                  <a href="#account" onClick={to("account")}>
                    Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot-end">
            <span>
              © 2026 Loom &amp; Lathe. Prices in INR, inclusive of GST.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState("All");
  const [products, setProducts] = useState([]);
  const [failed, setFailed] = useState(false);
  const [wish, setWish] = useState(() =>
    JSON.parse(localStorage.getItem("llWish") || "[]")
  );
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("llUser") || "null")
  );

  useEffect(() => {
    fetch(API + "/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    localStorage.setItem("llWish", JSON.stringify(wish));
  }, [wish]);

  useEffect(() => {
    localStorage.setItem("llUser", JSON.stringify(user));
  }, [user]);

  const to = (next, c = "All") => e => {
    e.preventDefault();
    setCat(c);
    setPage(next);
    window.scrollTo(0, 0);
  };

  const toggleWish = id => setWish(
    wish.includes(id) ? wish.filter(w => w !== id) : [...wish, id]
  );

  const needsData = ["home", "shop", "wishlist"].includes(page);
  const ready = products.length > 0;

  return (
    <div className="app">
      <Header to={to} wishCount={wish.length} />
      <main>
        {needsData && failed && (
          <p className="wrap page">
            Unable to load the catalogue. Start the server and
            refresh.
          </p>
        )}
        {needsData && !failed && !ready && (
          <p className="wrap page">Loading...</p>
        )}
        {page === "home" && ready && (
          <Home products={products} to={to} wish={wish}
            onToggle={toggleWish} />
        )}
        {["shop", "wishlist"].includes(page) && ready && (
          <Shop products={products} cat={cat} setCat={setCat}
            wish={wish} onToggle={toggleWish}
            savedOnly={page === "wishlist"} />
        )}
        {page === "account" && (
          <Account user={user} wishCount={wish.length}
            onSave={setUser} onSignOut={() => setUser(null)} />
        )}
        {PAGES[page] && <Info page={page} />}
      </main>
      <Footer to={to} />
    </div>
  );
}

export default App;
