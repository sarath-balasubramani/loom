import { useState } from "react";

const CATS = ["Kitchen", "Textiles", "Lighting", "Home", "Carry & Desk"];

function shade(hex, p) {
  const n = parseInt(hex.slice(1), 16);
  const f = x => Math.max(0, Math.min(255, Math.round(
    p > 0 ? x + (255 - x) * p / 100 : x + x * p / 100
  )));
  return "#" + [n >> 16, (n >> 8) & 255, n & 255]
    .map(f).map(x => x.toString(16).padStart(2, "0")).join("");
}

const SHAPES = {
  mug: (c, d, l) => `
    <ellipse cx="100" cy="170" rx="54" ry="7" fill="#000"
      opacity=".12"/>
    <path d="M143 90h8a19 19 0 0 1 0 38h-8" fill="none"
      stroke="${d}" stroke-width="9" stroke-linecap="round"/>
    <path fill="${c}" d="M56 70h88v72a22 22 0 0 1-22 22H78a22
      22 0 0 1-22-22z"/>
    <path d="M56 70h88v16H56z" fill="${l}"/>
    <ellipse cx="100" cy="70" rx="44" ry="7" fill="${d}"/>
    <path d="M68 100v40" stroke="${l}" stroke-width="5"
      stroke-linecap="round" opacity=".5"/>`,
  board: (c, d, l, bg) => `
    <ellipse cx="96" cy="172" rx="74" ry="6" fill="#000"
      opacity=".1"/>
    <rect x="26" y="70" width="112" height="84" rx="14"
      fill="${c}"/>
    <rect x="128" y="96" width="46" height="32" rx="16"
      fill="${c}"/>
    <circle cx="156" cy="112" r="6" fill="${bg}"/>
    <path d="M38 92h86M38 110h72M38 128h84M38 142h50"
      stroke="${d}" stroke-width="2" stroke-linecap="round"
      opacity=".55" fill="none"/>
    <rect x="26" y="70" width="112" height="10" rx="5"
      fill="${l}" opacity=".55"/>`,
  throw: (c, d, l) => {
    let fringe = "";
    for (let i = 0; i < 14; i++) {
      fringe += `<line x1="${37 + i * 9.6}" y1="148"
        x2="${37 + i * 9.6}" y2="164" stroke="${d}"
        stroke-width="2" stroke-linecap="round"/>`;
    }
    return `
      <rect x="30" y="46" width="140" height="102" rx="3"
        fill="${c}"/>
      <rect x="30" y="68" width="140" height="9" fill="${l}"/>
      <rect x="30" y="86" width="140" height="4" fill="${d}"/>
      <rect x="30" y="118" width="140" height="9" fill="${l}"/>
      <rect x="30" y="132" width="140" height="4" fill="${d}"/>
      <path d="M140 46h30v30z" fill="${d}" opacity=".45"/>
      ${fringe}`;
  },
  lamp: (c, d, l) => `
    <ellipse cx="68" cy="170" rx="36" ry="8" fill="#000"
      opacity=".14"/>
    <ellipse cx="68" cy="162" rx="34" ry="9" fill="${d}"/>
    <path fill="${c}" d="M34 162a34 9 0 0 1 68 0v4a34 9 0 0
      1-68 0z"/>
    <path d="M68 156V108L118 62" fill="none" stroke="${c}"
      stroke-width="8" stroke-linecap="round"
      stroke-linejoin="round"/>
    <circle cx="68" cy="108" r="7" fill="${d}"/>
    <path d="M104 56l46-18 16 40-48 14z" fill="${c}"/>
    <path d="M104 56l46-18 4 10-44 18z" fill="${l}"/>
    <circle cx="146" cy="88" r="12" fill="#FFE9A6"
      opacity=".9"/>`,
  tote: (c, d, l) => `
    <path d="M72 80C72 26 128 26 128 80" fill="none"
      stroke="${d}" stroke-width="8" stroke-linecap="round"/>
    <path d="M44 74h112l10 94H34z" fill="${c}"/>
    <path d="M44 74h112l1 10H43z" fill="${d}" opacity=".5"/>
    <rect x="72" y="112" width="56" height="38" rx="3"
      fill="${l}"/>
    <path d="M76 120h48" stroke="${d}" stroke-width="2"
      stroke-dasharray="4 3" fill="none"/>`,
  skillet: (c, d, l, bg) => `
    <ellipse cx="94" cy="172" rx="60" ry="6" fill="#000"
      opacity=".12"/>
    <rect x="140" y="98" width="52" height="15" rx="7"
      fill="${c}"/>
    <circle cx="184" cy="105" r="3.5" fill="${bg}"/>
    <circle cx="90" cy="106" r="62" fill="${c}"/>
    <circle cx="90" cy="106" r="52" fill="${d}"/>
    <path d="M50 84a46 46 0 0 1 30-26" fill="none"
      stroke="${l}" stroke-width="4" stroke-linecap="round"
      opacity=".6"/>`,
  planter: (c, d, l) => `
    <path d="M100 112C90 74 70 62 54 64c4 26 22 44 46 48z"
      fill="#4F8A5B"/>
    <path d="M100 112c10-46 30-58 50-54-4 30-24 48-50 54z"
      fill="#3E7249"/>
    <path d="M100 112c-4-32 4-58 0-76 14 20 16 48 0 76z"
      fill="#5E9D6B"/>
    <path d="M60 122h80l-9 44H69z" fill="${c}"/>
    <rect x="54" y="108" width="92" height="18" rx="4"
      fill="${l}"/>
    <path d="M62 130h76" stroke="${d}" stroke-width="3"
      opacity=".4" fill="none"/>
    <ellipse cx="100" cy="170" rx="42" ry="5" fill="#000"
      opacity=".12"/>`,
  notebook: (c, d, l) => `
    <rect x="44" y="40" width="82" height="112" rx="4"
      fill="${d}" transform="rotate(-10 85 96)"/>
    <rect x="66" y="40" width="82" height="112" rx="4"
      fill="${l}" transform="rotate(5 107 96)"/>
    <rect x="58" y="46" width="84" height="116" rx="4"
      fill="${c}"/>
    <rect x="58" y="46" width="10" height="116" fill="${d}"
      opacity=".6"/>
    <rect x="88" y="70" width="38" height="5" rx="2"
      fill="${l}"/>
    <rect x="88" y="82" width="24" height="5" rx="2"
      fill="${l}" opacity=".7"/>`,
  stool: (c, d, l) => `
    <ellipse cx="100" cy="176" rx="64" ry="6" fill="#000"
      opacity=".12"/>
    <path d="M100 100L100 174" stroke="${d}"
      stroke-width="10" stroke-linecap="round"/>
    <path d="M68 98L52 172M132 98L148 172" stroke="${c}"
      stroke-width="10" stroke-linecap="round"/>
    <path d="M40 70v16a60 16 0 0 0 120 0V70z" fill="${c}"/>
    <ellipse cx="100" cy="70" rx="60" ry="16" fill="${l}"/>
    <ellipse cx="100" cy="70" rx="48" ry="11" fill="${c}"
      opacity=".35"/>`,
  carafe: (c, d) => `
    <path fill="${c}" opacity=".6" d="M72 36h24v28c18 12 26 28
      26 52v40a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10v-40c0-24
      8-40 26-52z"/>
    <path fill="${c}" opacity=".9" d="M47 118c0 0 10-6 38-6s38
      6 38 6v38a10 10 0 0 1-10 10H57a10 10 0 0 1-10-10z"/>
    <path d="M68 36h32" stroke="${d}" stroke-width="5"
      stroke-linecap="round"/>
    <path fill="${c}" opacity=".7" d="M130 100h42l-5 66a6 6 0
      0 1-6 6h-20a6 6 0 0 1-6-6z"/>
    <path d="M130 100h42" stroke="${d}" stroke-width="3"
      opacity=".7"/>`,
  candles: (c, d, l) => {
    const tapers = [[56, 100], [92, 124], [128, 86]];
    return `<ellipse cx="100" cy="172" rx="64" ry="6"
      fill="#000" opacity=".12"/>` + tapers.map(([x, h]) => {
      const y = 170 - h;
      return `
        <rect x="${x}" y="${y}" width="18" height="${h}" rx="3"
          fill="${c}"/>
        <rect x="${x}" y="${y}" width="6" height="${h}"
          fill="${l}" opacity=".55"/>
        <line x1="${x + 9}" y1="${y}" x2="${x + 9}"
          y2="${y - 8}" stroke="#222" stroke-width="2"/>
        <path d="M${x + 9} ${y - 30}c9 10 8 18 0 22-8-4-9-12
          0-22z" fill="#F5A524"/>
        <path d="M${x + 9} ${y - 22}c4 4 3 8 0 10-3-2-4-6
          0-10z" fill="#FFE08A"/>`;
    }).join("");
  },
  towels: (c, d, l) => {
    let weave = "";
    for (let i = 0; i < 7; i++) {
      weave += `<line x1="${54 + i * 18}" y1="64"
        x2="${54 + i * 18}" y2="102" stroke="${l}"
        stroke-width="2" opacity=".6"/>`;
    }
    return `
      <ellipse cx="100" cy="164" rx="70" ry="6" fill="#000"
        opacity=".12"/>
      <rect x="32" y="104" width="136" height="52" rx="8"
        fill="${d}"/>
      <rect x="32" y="116" width="136" height="6" fill="${l}"
        opacity=".5"/>
      <rect x="40" y="58" width="128" height="50" rx="8"
        fill="${c}"/>
      ${weave}
      <rect x="40" y="90" width="128" height="6" fill="${d}"
        opacity=".5"/>`;
  }
};

export function ProductArt({ product, index = 0 }) {
  const c = product.colors[index];
  const svg = `<rect width="200" height="200"
    fill="${product.tile}"/>` + SHAPES[product.shape](
    c, shade(c, -22), shade(c, 18), product.tile
  );
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={product.name}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export function ProductCard({ product, saved, onToggle }) {
  const { name, price, mrp, tag, colors } = product;
  return (
    <article className="card">
      <div className="tile">
        <ProductArt product={product} />
        {tag && <span className="tag">{tag}</span>}
      </div>
      <button
        className={"heart" + (saved ? " on" : "")}
        onClick={() => onToggle(product._id)}
        aria-pressed={saved}
        aria-label={`Save ${name} to wishlist`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6
            4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
        </svg>
      </button>
      <div className="card-b">
        <span className="nm">{name}</span>
        <div className="pr">
          <span>₹{price.toLocaleString("en-IN")}</span>
          {mrp && <s>₹{mrp.toLocaleString("en-IN")}</s>}
        </div>
        {colors.length > 1 && (
          <div className="dots">
            {colors.map(c => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

const SORTERS = {
  featured: () => 0,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name)
};

function Shop({ products, cat, setCat, wish, onToggle, savedOnly }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const pool = savedOnly
    ? products.filter(p => wish.includes(p._id))
    : products;
  const text = q.trim().toLowerCase();
  const list = pool
    .filter(p => cat === "All" || p.cat === cat)
    .filter(p => !text || (p.name + " " + p.cat)
      .toLowerCase().includes(text))
    .sort(SORTERS[sort]);

  function reset() {
    setCat("All");
    setQ("");
  }

  return (
    <section className="wrap page">
      <header className="ph">
        <h1>{savedOnly ? "Wishlist" : "Shop"}</h1>
        <p className="muted">
          {list.length} of {pool.length} pieces
        </p>
      </header>
      <div className="toolbar">
        <div className="field">
          <label htmlFor="q">Search</label>
          <input
            id="q"
            type="search"
            placeholder="Mug, linen, brass, oak"
            value={q}
            onChange={e => setQ(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="field s">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="chips" role="group">
        {["All", ...CATS].map(c => (
          <button
            key={c}
            className="chip"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
            <span className="mono muted">
              {c === "All"
                ? pool.length
                : pool.filter(p => p.cat === c).length}
            </span>
          </button>
        ))}
      </div>
      <div className="grid">
        {list.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            saved={wish.includes(p._id)}
            onToggle={onToggle}
          />
        ))}
        {list.length === 0 && (
          <div className="empty">
            <h2>No matches</h2>
            <p>Nothing fits that search. Try another word.</p>
            <button className="btn ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Shop;
