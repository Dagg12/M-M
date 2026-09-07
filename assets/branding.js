(() => {
  const WA_NUMBER = "27824665064";
  const stockProducts = [
    ["Scandant Homme", "ChatGPT Image Sep 7, 2026, 02_42_22 PM.png"],
    ["Lush Cherry", "ChatGPT Image Sep 7, 2026, 03_04_00 PM.png"],
    ["Dolores Pour Femme", "ChatGPT Image Sep 7, 2026, 02_44_08 PM.png"],
    ["Dolores Pour Femme", "ChatGPT Image Sep 7, 2026, 02_44_10 PM.png"],
    ["Intense Noir", "xDvel.jpg"],
    ["Scandant", "ChatGPT Image Sep 7, 2026, 02_40_13 PM.png"],
    ["Elysia", "ChatGPT Image Sep 7, 2026, 02_59_24 PM.png"],
    ["Nomad's Land", "1NQRa.jpg"],
    ["Hibiscus Magic", "ChatGPT Image Sep 7, 2026, 02_57_06 PM.png"],
    ["Cocktail Intense", "ChatGPT Image Sep 7, 2026, 02_48_31 PM.png"],
    ["La Vida Es Bella", "ChatGPT Image Sep 7, 2026, 02_54_55 PM.png"],
    ["Forever Wanted", "ChatGPT Image Sep 7, 2026, 02_52_39 PM.png"],
    ["Jacques Yves Soleil D'Ombre", "PgJJh.jpg"],
    ["La Vida Es Bella", "xaONs.jpg"],
    ["Montera Instant Love", "tdOdk.jpg"],
    ["Intense Oud", "Eauv9.jpg"],
    ["Nomad's Land", "qmoZc.jpg"],
    ["Intense Oud", "kYkkV.jpg"],
    ["Oud Madness", "ChatGPT Image Sep 7, 2026, 03_01_31 PM.png"],
    ["Away", "ChatGPT Image Sep 7, 2026, 02_50_47 PM.png"],
    ["Tom Ford Pour Homme", "Jsubr.jpg"],
    ["Tool Box Men", "T6wwy.jpg"],
    ["Jacques Yves Soleil D'Ombre", "exoaC.jpg"]
  ];

  const imgPath = (file) => `./available-in-stock/${encodeURIComponent(file).replace(/%2F/g, "/")}`;
  const waLink = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  const replaceBrand = (value) => value
    .replace(/Nare & Philippine/gi, "M&M")
    .replace(/Nare and Philippine/gi, "M&M")
    .replace(/NARE & PHILIPPINE/gi, "M&M");

  const updateBranding = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node = walker.nextNode();
    while (node) { nodes.push(node); node = walker.nextNode(); }
    nodes.forEach((textNode) => {
      const value = replaceBrand(textNode.nodeValue);
      if (value !== textNode.nodeValue) textNode.nodeValue = value;
    });

    document.querySelectorAll("[aria-label], [alt], [href]").forEach((element) => {
      ["aria-label", "alt", "href"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        const updated = replaceBrand(value);
        if (updated !== value) element.setAttribute(attribute, updated);
      });
    });
  };

  const shareOrWhatsApp = async (product) => {
    const message = `Hello M&M Fragrance House! I would like to order ${product.name}. Please confirm availability and price.`;
    try {
      if (navigator.share && navigator.canShare) {
        const response = await fetch(product.image);
        const blob = await response.blob();
        const extension = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
        const file = new File([blob], `${product.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.${extension}`, { type: blob.type });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: product.name, text: message, files: [file] });
          return;
        }
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  const createStockSection = () => {
    if (document.getElementById("available-stock")) return;
    const collection = document.getElementById("collection");
    if (!collection) return;

    const section = document.createElement("section");
    section.className = "available-stock section-spacing";
    section.id = "available-stock";
    section.innerHTML = `
      <div class="section-head stock-head">
        <div>
          <div class="section-kicker">Available / In stock</div>
          <h2>Ready to <span>wear.</span></h2>
        </div>
        <p class="stock-intro">Explore the fragrances currently available. Select any bottle to view it larger and order directly through WhatsApp.</p>
      </div>
      <div class="stock-carousel" aria-label="Available in stock fragrances">
        <button class="stock-arrow stock-arrow-left" type="button" aria-label="Previous available fragrance">‹</button>
        <div class="stock-viewport"><div class="stock-track"></div></div>
        <button class="stock-arrow stock-arrow-right" type="button" aria-label="Next available fragrance">›</button>
      </div>
      <div class="stock-dots" aria-label="Available fragrance slides"></div>
    `;

    const track = section.querySelector(".stock-track");
    const dots = section.querySelector(".stock-dots");
    stockProducts.forEach(([name, file], index) => {
      const product = { name, image: imgPath(file) };
      const card = document.createElement("article");
      card.className = "stock-card";
      card.innerHTML = `
        <button class="stock-image-button" type="button" aria-label="View ${name}">
          <img src="${product.image}" alt="${name}" loading="lazy">
          <span class="stock-badge">In stock</span>
          <span class="stock-view">View fragrance <span>→</span></span>
        </button>
        <div class="stock-card-meta">
          <div><span>Available now</span><h3>${name}</h3></div>
          <button class="stock-order-button" type="button">◉&nbsp; Order on WhatsApp</button>
        </div>`;
      card.querySelector(".stock-image-button").addEventListener("click", () => openModal(product));
      card.querySelector(".stock-order-button").addEventListener("click", () => shareOrWhatsApp(product));
      track.appendChild(card);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show ${name}`);
      dot.addEventListener("click", () => goTo(index));
      dots.appendChild(dot);
    });

    let current = 0;
    let timer;
    const goTo = (index) => {
      current = (index + stockProducts.length) % stockProducts.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("active", i === current));
    };
    section.querySelector(".stock-arrow-left").addEventListener("click", () => { goTo(current - 1); restart(); });
    section.querySelector(".stock-arrow-right").addEventListener("click", () => { goTo(current + 1); restart(); });
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 4500);
    };
    section.addEventListener("mouseenter", () => clearInterval(timer));
    section.addEventListener("mouseleave", restart);
    goTo(0);
    restart();
    collection.parentNode.insertBefore(section, collection);
  };

  const openModal = (product) => {
    document.getElementById("stock-modal")?.remove();
    const modal = document.createElement("div");
    modal.id = "stock-modal";
    modal.className = "modal-backdrop stock-injected-modal";
    modal.innerHTML = `
      <div class="modal-panel stock-modal">
        <button class="modal-close" type="button" aria-label="Close fragrance detail">×</button>
        <div class="modal-image stock-modal-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="modal-copy">
          <span class="section-kicker">Available in stock</span>
          <h3>${product.name}</h3>
          <p>Currently available from M&M Fragrance House.</p>
          <p class="modal-description">Place your order directly through WhatsApp. On supported phones, the product picture can be shared together with your order message.</p>
          <button class="primary-button stock-modal-order" type="button">◉&nbsp; Order on WhatsApp</button>
        </div>
      </div>`;
    modal.addEventListener("click", (event) => { if (event.target === modal) modal.remove(); });
    modal.querySelector(".modal-close").addEventListener("click", () => modal.remove());
    modal.querySelector(".stock-modal-order").addEventListener("click", () => shareOrWhatsApp(product));
    document.body.appendChild(modal);
  };

  const updateLogo = () => {
    document.querySelectorAll(".brand-logo").forEach((img) => {
      img.src = "./available-in-stock/Logo image.png";
      img.alt = "M&M Fragrance House";
    });
  };

  const boot = () => {
    updateBranding();
    updateLogo();
    createStockSection();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
