import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleUserRound,
  Flower2,
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Wind,
  X,
} from "lucide-react";
import "./styles.css";

const WA_NUMBER = "27824665064";
const buildWhatsAppLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const moodOptions = [
  {
    id: "romantic",
    name: "Romantic",
    headline: "Soft florals and a lingering veil of rose.",
    description: "Pearl-soft florals and warm musk to make every entrance feel like a memory.",
  },
  {
    id: "confident",
    name: "Confident",
    headline: "Clean, polished and quietly commanding.",
    description: "A refined balance of woods, spice and amber for a polished signature.",
  },
  {
    id: "elegant",
    name: "Elegant",
    headline: "Refined notes with a luxurious finish.",
    description: "Velvet florals and amber-rich warmth for tailored evenings and chic days.",
  },
  {
    id: "mysterious",
    name: "Mysterious",
    headline: "Dark florals and a deeper, magnetic trail.",
    description: "Smoky woods, deep florals and a sensual finish with presence.",
  },
  {
    id: "fresh",
    name: "Fresh",
    headline: "Bright, airy and effortlessly clean.",
    description: "Citrus, green lift and airy florals for a crisp signature.",
  },
  {
    id: "bold",
    name: "Bold",
    headline: "Spice, oud and a long dramatic trail.",
    description: "Rich woods, amber and intensity that leave a strong impression.",
  },
];

const products = [
  { id: 1, name: "Honor & Glory", family: "Oud Collection", image: "./products/0dpXd.jpg", note: "Warm oud · vanilla · spice", tag: "Bestseller", moods: ["confident", "bold"] },
  { id: 2, name: "Intense Wayfarer", family: "Oud Collection", image: "./products/3aaME.jpg", note: "Deep woods · citrus · amber", tag: "Signature", moods: ["bold", "confident"] },
  { id: 3, name: "Champ de Rose", family: "Feminine Collection", image: "./products/Brykp.jpg", note: "Rose · soft florals · musk", tag: "New", moods: ["romantic", "elegant"] },
  { id: 4, name: "Midnight Rouge", family: "Statement Collection", image: "./products/D7t6P.jpg", note: "Dark woods · spice · florals", tag: "Statement", moods: ["mysterious", "bold"] },
  { id: 5, name: "Legend Arabia", family: "Oud Collection", image: "./products/dLY9o.jpg", note: "Oud · amber · rich woods", tag: "Popular", moods: ["bold", "confident"] },
  { id: 6, name: "Amber Élan", family: "Luxury Collection", image: "./products/Ezopn.jpg", note: "Amber · saffron · warm spice", tag: "Luxury", moods: ["elegant", "confident"] },
  { id: 7, name: "Honor & Glory", family: "Oud Collection", image: "./products/K8FGd.jpg", note: "Warm oud · vanilla · spice", tag: "Bestseller", moods: ["bold", "confident"] },
  { id: 8, name: "Black Oud", family: "Men's Collection", image: "./products/mS9mf.jpg", note: "Oud · leather · woods", tag: "Bold", moods: ["bold", "mysterious"] },
  { id: 9, name: "Amethyst Oud", family: "Luxury Collection", image: "./products/QdZJt.jpg", note: "Purple florals · oud · musk", tag: "Elegant", moods: ["elegant", "mysterious"] },
  { id: 10, name: "Soleil Femme", family: "Feminine Collection", image: "./products/usqEF.jpg", note: "Fruity notes · rose · musk", tag: "Feminine", moods: ["romantic", "fresh"] },
  { id: 11, name: "Intense Oud", family: "Oud Collection", image: "./products/UvcZi.jpg", note: "Oud · berries · white florals", tag: "Intense", moods: ["bold", "mysterious"] },
  { id: 12, name: "Noir Élégance", family: "Statement Collection", image: "./products/v9GJN.jpg", note: "Dark florals · vanilla · woods", tag: "Iconic", moods: ["mysterious", "elegant"] },
  { id: 13, name: "Now Pink", family: "Feminine Collection", image: "./products/wo4aE.jpg", note: "Citrus · florals · vanilla", tag: "Playful", moods: ["fresh", "romantic"] },
  { id: 14, name: "Oud Éclat", family: "Luxury Collection", image: "./products/X3rvN.jpg", note: "Oud · amber · cinnamon", tag: "Warm", moods: ["elegant", "confident"] },
  { id: 15, name: "Haramain Rose", family: "Feminine Collection", image: "./products/zqB8L.jpg", note: "Rose · powder · soft musk", tag: "Romantic", moods: ["romantic", "elegant"] },
];

const categories = ["All", "Oud Collection", "Feminine Collection", "Luxury Collection", "Statement Collection", "Men's Collection"];

const stockProducts = [
  { id: "stock-01", name: "Scandant Homme", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_42_22 PM.png" },
  { id: "stock-02", name: "Lush Cherry", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 03_04_00 PM.png" },
  { id: "stock-03", name: "Dolores Pour Femme", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_44_08 PM.png" },
  { id: "stock-04", name: "Dolores Pour Femme", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_44_10 PM.png" },
  { id: "stock-05", name: "Intense Noir", image: "./available-in-stock/xDvel.jpg" },
  { id: "stock-06", name: "Scandant", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_40_13 PM.png" },
  { id: "stock-07", name: "Elysia", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_59_24 PM.png" },
  { id: "stock-08", name: "Nomad's Land", image: "./available-in-stock/1NQRa.jpg" },
  { id: "stock-09", name: "Hibiscus Magic", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_57_06 PM.png" },
  { id: "stock-10", name: "Cocktail Intense", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_48_31 PM.png" },
  { id: "stock-11", name: "La Vida Es Bella", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_54_55 PM.png" },
  { id: "stock-12", name: "Forever Wanted", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_52_39 PM.png" },
  { id: "stock-13", name: "Jacques Yves Soleil D'Ombre", image: "./available-in-stock/PgJJh.jpg" },
  { id: "stock-14", name: "La Vida Es Bella", image: "./available-in-stock/xaONs.jpg" },
  { id: "stock-15", name: "Montera Instant Love", image: "./available-in-stock/tdOdk.jpg" },
  { id: "stock-16", name: "Intense Oud", image: "./available-in-stock/Eauv9.jpg" },
  { id: "stock-17", name: "Nomad's Land", image: "./available-in-stock/qmoZc.jpg" },
  { id: "stock-18", name: "Intense Oud", image: "./available-in-stock/kYkkV.jpg" },
  { id: "stock-19", name: "Oud Madness", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 03_01_31 PM.png" },
  { id: "stock-20", name: "Away", image: "./available-in-stock/ChatGPT Image Sep 7, 2026, 02_50_47 PM.png" },
  { id: "stock-21", name: "Tom Ford Pour Homme", image: "./available-in-stock/Jsubr.jpg" },
  { id: "stock-22", name: "Tool Box Men", image: "./available-in-stock/T6wwy.jpg" },
  { id: "stock-23", name: "Jacques Yves Soleil D'Ombre", image: "./available-in-stock/exoaC.jpg" },
];

function Logo({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#home" aria-label="M&M Fragrance House">
      <img className="brand-logo" src="./available-in-stock/Logo image.png" alt="M&M Fragrance House" />
    </a>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockSlide, setStockSlide] = useState(0);
  const [liked, setLiked] = useState([1]);
  const [activeMood, setActiveMood] = useState(moodOptions[0]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStockSlide((current) => (current + 1) % stockProducts.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (filter === "All" || product.family === filter) &&
          `${product.name} ${product.family} ${product.note}`.toLowerCase().includes(query.toLowerCase())
      ),
    [filter, query]
  );

  const recommendations = useMemo(
    () =>
      products.filter((product) => product.moods.includes(activeMood.id)).slice(0, 3),
    [activeMood.id]
  );

  const toggleLike = (id) =>
    setLiked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const handleStockOrder = async (product) => {
    const message = `Hello M&M Fragrance House! I would like to order ${product.name}. Please confirm availability and price.`;
    try {
      if (navigator.share && navigator.canShare) {
        const response = await fetch(product.image);
        const blob = await response.blob();
        const extension = blob.type.split("/")[1] || "jpg";
        const file = new File([blob], `${product.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.${extension}`, { type: blob.type });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: product.name, text: message, files: [file] });
          return;
        }
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  const openStockProduct = (product) => {
    setSelectedStock(product);
    setSelectedProduct(null);
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <div className="announcement-bar">
        <span>Curated fragrances for every signature</span>
        <a href={buildWhatsAppLink("Hello M&M Fragrance House! I would like to enquire about your fragrance collection.")}>
          Chat on WhatsApp <ArrowRight size={13} />
        </a>
      </div>

      <header className="topbar">
        <nav className="nav" aria-label="Main navigation">
          <Logo />

          <div className={`nav-links ${menu ? "open" : ""}`}>
            <a href="#home" onClick={() => setMenu(false)}>Home</a>
            <a href="#collection" onClick={() => setMenu(false)}>Collection</a>
            <a href="#story" onClick={() => setMenu(false)}>Our Story</a>
            <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
            <a className="mobile-order" href={buildWhatsAppLink("Hello M&M Fragrance House! I would like to place an order.")}>Order via WhatsApp</a>
          </div>

          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Search fragrances"
              onClick={() => document.getElementById("search")?.focus()}
            >
              <Search size={18} />
            </button>
            <a className="nav-cta" href={buildWhatsAppLink("Hello M&M Fragrance House! I would like to browse and order a fragrance.")}>
              <MessageCircle size={16} />
              <span>Order</span>
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((current) => !current)}
            >
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-sheen" />

          <div className="ambient ambient-left" />
          <div className="ambient ambient-right" />

          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} />
              The art of scent
            </div>
            <h1>
              NATURE, <span>BOTTLED.</span>
            </h1>
            <p>
              Discover a fragrance made to linger, remember and become part of your story.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#collection">
                Explore the collection
                <ArrowDown size={15} />
              </a>
              <a className="text-link" href={buildWhatsAppLink("Hello M&M Fragrance House! Help me find a fragrance that suits me.")}>
                Find my fragrance
                <ArrowRight size={15} />
              </a>
            </div>
            <div className="hero-meta">
              <span><Star size={12} fill="currentColor" /> Curated with intention</span>
              <span><Check size={12} /> WhatsApp ordering</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Featured fragrance bottles">
            <div className="hero-stage" />
            <div className="misting mist-a" />
            <div className="misting mist-b" />
            <div className="bottle bottle-one" style={{ "--bottle-rot": "-8deg" }}>
              <img src="./products/0dpXd.jpg" alt="Honor & Glory fragrance" />
            </div>
            <div className="bottle bottle-two" style={{ "--bottle-rot": "-4deg" }}>
              <img src="./products/Brykp.jpg" alt="Champ de Rose fragrance" />
            </div>
            <div className="bottle bottle-three" style={{ "--bottle-rot": "2deg" }}>
              <img src="./products/Ezopn.jpg" alt="Amber Élan fragrance" />
            </div>
            <div className="bottle bottle-four" style={{ "--bottle-rot": "6deg" }}>
              <img src="./products/QdZJt.jpg" alt="Amethyst Oud fragrance" />
            </div>
            <div className="bottle bottle-five" style={{ "--bottle-rot": "11deg" }}>
              <img src="./products/usqEF.jpg" alt="Soleil Femme fragrance" />
            </div>
            <div className="bottle bottle-six" style={{ "--bottle-rot": "-12deg" }}>
              <img src="./products/dLY9o.jpg" alt="Legend Arabia fragrance" />
            </div>
            <div className="bottle bottle-seven" style={{ "--bottle-rot": "-2deg" }}>
              <img src="./products/v9GJN.jpg" alt="Noir Élégance fragrance" />
            </div>
            <div className="bottle bottle-eight" style={{ "--bottle-rot": "9deg" }}>
              <img src="./products/X3rvN.jpg" alt="Oud Éclat fragrance" />
            </div>
            <div className="bottle bottle-nine" style={{ "--bottle-rot": "-6deg" }}>
              <img src="./products/3aaME.jpg" alt="Velvet Bloom fragrance" />
            </div>
            <div className="bottle bottle-ten" style={{ "--bottle-rot": "7deg" }}>
              <img src="./products/mS9mf.jpg" alt="Golden Ember fragrance" />
            </div>

            <div className="floating-note note-top">
              <Sparkles size={14} />
              <span>
                Signature
                <strong>Oud Edit</strong>
              </span>
            </div>
            <div className="floating-note note-bottom">
              <span>Find your</span>
              <strong>signature</strong>
            </div>
          </div>

          <div className="botanical botanical-left" aria-hidden="true" />
          <div className="botanical botanical-right" aria-hidden="true" />
        </section>

        <div className="ticker" aria-label="Brand values">
          <div>
            Long-lasting scents <span>✦</span> Beautiful presence <span>✦</span> Everyday luxury <span>✦</span> Scent with soul <span>✦</span>
          </div>
        </div>

        <section className="intro section-spacing">
          <Reveal>
            <div className="section-kicker">01 / The collection</div>
            <h2>
              Find the one that
              <span>feels like you.</span>
            </h2>
          </Reveal>
          <Reveal className="intro-copy">
            <p>
              From warm oud and rich amber to soft florals and playful feminine notes, discover fragrances chosen to match your mood, your moment and your signature.
            </p>
            <a className="text-link" href="#collection">
              Shop all scents
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </section>

        <section className="available-stock section-spacing" id="available-stock">
          <div className="section-head stock-head">
            <Reveal>
              <div className="section-kicker">Available / In stock</div>
              <h2>Ready to <span>wear.</span></h2>
            </Reveal>
            <p className="stock-intro">Explore the fragrances currently available. Select any bottle to view it larger and order directly through WhatsApp.</p>
          </div>

          <div className="stock-carousel" aria-label="Available in stock fragrances">
            <button
              className="stock-arrow stock-arrow-left"
              type="button"
              aria-label="Previous available fragrance"
              onClick={() => setStockSlide((current) => (current - 1 + stockProducts.length) % stockProducts.length)}
            >
              <ArrowRight size={18} style={{ transform: "rotate(180deg)" }} />
            </button>

            <div className="stock-viewport">
              <div
                className="stock-track"
                style={{ transform: `translateX(-${stockSlide * 100}%)` }}
              >
                {stockProducts.map((product) => (
                  <article className="stock-card" key={product.id}>
                    <button className="stock-image-button" type="button" onClick={() => openStockProduct(product)} aria-label={`View ${product.name}`}>
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="stock-badge">In stock</span>
                      <span className="stock-view">View fragrance <ArrowRight size={13} /></span>
                    </button>
                    <div className="stock-card-meta">
                      <div>
                        <span>Available now</span>
                        <h3>{product.name}</h3>
                      </div>
                      <button className="stock-order-button" type="button" onClick={() => handleStockOrder(product)}>
                        <MessageCircle size={15} />
                        Order
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              className="stock-arrow stock-arrow-right"
              type="button"
              aria-label="Next available fragrance"
              onClick={() => setStockSlide((current) => (current + 1) % stockProducts.length)}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="stock-dots" aria-label="Available fragrance slides">
            {stockProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={stockSlide === index ? "active" : ""}
                aria-label={`Show ${product.name}`}
                onClick={() => setStockSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="collection section-spacing" id="collection">
          <div className="section-head">
            <Reveal>
              <div className="section-kicker">Curated / 2026</div>
              <h2>The scent edit</h2>
            </Reveal>
            <div className="search-field" aria-label="Search fragrances">
              <Search size={15} />
              <input
                id="search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search fragrances..."
              />
            </div>
          </div>

          <div className="filter-bar" role="tablist" aria-label="Product filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Reveal key={product.id} className="product-item">
                <article className="product-card">
                  <div className="product-image" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="product-tag">{product.tag}</span>
                    <button
                      className={`fav-button ${liked.includes(product.id) ? "liked" : ""}`}
                      type="button"
                      aria-label={`Save ${product.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLike(product.id);
                      }}
                    >
                      <Heart size={16} fill={liked.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="quick-view">
                      Quick view
                      <ArrowRight size={13} />
                    </div>
                  </div>
                  <div className="product-meta">
                    <div>
                      <span>{product.family}</span>
                      <h3>{product.name}</h3>
                    </div>
                    <button type="button" className="round-button" onClick={() => setSelectedProduct(product)} aria-label={`Open ${product.name}`}>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <p className="product-notes">{product.note}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state" role="status">
              <Wind size={28} />
              <h3>No fragrance found</h3>
              <p>Try another search or collection.</p>
            </div>
          )}
        </section>

        <section className="story section-spacing" id="story">
          <Reveal className="story-visual">
            <img src="./products/QdZJt.jpg" alt="Amethyst Oud fragrance" />
          </Reveal>
          <Reveal className="story-copy">
            <div className="section-kicker">02 / Our approach</div>
            <h2>
              Fragrance is
              <span>personal.</span>
            </h2>
            <p>
              We believe the right scent becomes part of how people remember you. M&M Fragrance House is built around that feeling — a carefully selected edit of fragrances that make ordinary moments feel a little more special.
            </p>
            <div className="story-points">
              <span><Flower2 size={18} /> Thoughtfully selected</span>
              <span><Wind size={18} /> Distinctive scent profiles</span>
              <span><MessageCircle size={18} /> Personal guidance on WhatsApp</span>
            </div>
            <a className="secondary-button" href={buildWhatsAppLink("Hello M&M Fragrance House! I would love some help choosing a fragrance.")}>
              Talk to M&M Fragrance House
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </section>

        <section className="editorial-quote">
          <div className="quote-mark">“</div>
          <blockquote>A fragrance is invisible, but the impression it leaves is unforgettable.</blockquote>
          <div className="quote-line" />
          <span>M&M FRAGRANCE HOUSE</span>
        </section>

        <section className="discovery section-spacing">
          <Reveal>
            <div className="section-kicker">03 / Discover your scent</div>
            <h2>
              What mood are you
              <span>wearing today?</span>
            </h2>
          </Reveal>

          <div className="mood-selector" aria-label="Fragrance mood selector">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={activeMood.id === mood.id ? "active" : ""}
                onClick={() => setActiveMood(mood)}
              >
                {mood.name}
              </button>
            ))}
          </div>

          <div className="discover-panel">
            <div className="discover-copy">
              <div className="section-kicker">Recommended for {activeMood.name}</div>
              <h3>{activeMood.headline}</h3>
              <p>{activeMood.description}</p>
              <a
                className="primary-button accent"
                href={buildWhatsAppLink(`Hello M&M Fragrance House! I’m feeling ${activeMood.name.toLowerCase()} and would like a fragrance recommendation.`)}
              >
                Ask for a recommendation
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="recommended-grid">
              {recommendations.map((product) => (
                <article className="recommended-card" key={product.id} onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="recommended-info">
                    <span>{product.family}</span>
                    <h4>{product.name}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-callout" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <div className="section-kicker">Let’s talk scent</div>
              <h2>
                Your next signature
                <span>starts here.</span>
              </h2>
              <p>
                Browse the collection, ask for a recommendation or place your order directly through WhatsApp.
              </p>
            </div>
            <div className="contact-actions">
              <a className="primary-button light" href={buildWhatsAppLink("Hello M&M Fragrance House! I would like to order a fragrance.")}>
                <MessageCircle size={17} />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Logo light />
          <p>A fragrance house for beautiful signatures, memorable moments and everyday luxury.</p>
          <div className="footer-links" aria-label="Social and catalog links">
            <a href={buildWhatsAppLink("Hello M&M Fragrance House!")} aria-label="WhatsApp"><MessageCircle size={16} /></a>
            <a href="#collection" aria-label="Browse collection"><ShoppingBag size={16} /></a>
            <a href="#story" aria-label="Our story"><CircleUserRound size={16} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 M&M Fragrance House</span>
          <span>Curated with intention ✦</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={buildWhatsAppLink("Hello M&M Fragrance House! I would like to enquire about your fragrance collection.")}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={21} />
      </a>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close product detail" onClick={() => setSelectedProduct(null)}>
              <X size={16} />
            </button>
            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="modal-copy">
              <span className="section-kicker">{selectedProduct.family}</span>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.note}</p>
              <p className="modal-description">
                A beautiful choice for making your presence memorable. Ask us for availability, pricing and a personal recommendation.
              </p>
              <a
                className="primary-button"
                href={buildWhatsAppLink(`Hello M&M Fragrance House! I am interested in ${selectedProduct.name}. Please share more information.`)}
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedStock && (
        <div className="modal-backdrop" onClick={() => setSelectedStock(null)}>
          <div className="modal-panel stock-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close fragrance detail" onClick={() => setSelectedStock(null)}>
              <X size={16} />
            </button>
            <div className="modal-image stock-modal-image">
              <img src={selectedStock.image} alt={selectedStock.name} />
            </div>
            <div className="modal-copy">
              <span className="section-kicker">Available in stock</span>
              <h3>{selectedStock.name}</h3>
              <p>Currently available from M&M Fragrance House.</p>
              <p className="modal-description">
                Place your order directly through WhatsApp. On supported phones, the product picture can be shared together with your order message.
              </p>
              <button
                className="primary-button"
                type="button"
                onClick={() => handleStockOrder(selectedStock)}
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
