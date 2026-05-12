import { products } from "./data/products.js";
import "./styles.css";

const STORE_PHONE = "6281234567890";
const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const state = {
  filter: "Semua",
  search: "",
  cart: loadCart(),
  notes: ""
};

const app = document.querySelector("#app");

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("toko-kue-cart")) ?? {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("toko-kue-cart", JSON.stringify(state.cart));
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function cartItems() {
  return Object.entries(state.cart)
    .map(([id, quantity]) => ({ product: productById(id), quantity }))
    .filter((item) => item.product && item.quantity > 0);
}

function subtotal() {
  return cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function filteredProducts() {
  return products.filter((product) => {
    const byFilter = state.filter === "Semua" || product.category === state.filter;
    const query = state.search.trim().toLowerCase();
    const bySearch =
      query.length === 0 ||
      [product.name, product.category, product.occasion, product.description]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return byFilter && bySearch;
  });
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] ?? 0) + 1;
  saveCart();
  render();
  announce(`${productById(id).name} masuk keranjang.`);
}

function updateQuantity(id, quantity) {
  if (quantity <= 0) {
    delete state.cart[id];
  } else {
    state.cart[id] = quantity;
  }

  saveCart();
  render();
}

function checkoutUrl() {
  const items = cartItems();
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.product.name} x${item.quantity} - ${currency.format(
        item.product.price * item.quantity
      )}`
  );
  const noteLine = state.notes.trim() ? `\nCatatan: ${state.notes.trim()}` : "";
  const text = [
    "Halo Toko Kue Manis Rasa, saya ingin pesan:",
    ...lines,
    `Subtotal: ${currency.format(subtotal())}`,
    noteLine,
    "\nMohon info opsi pickup/delivery dan pembayaran. Terima kasih."
  ].join("\n");

  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(text)}`;
}

function announce(message) {
  const live = document.querySelector("[data-live]");
  if (live) {
    live.textContent = message;
  }
}

function render() {
  const categories = ["Semua", ...new Set(products.map((product) => product.category))];
  const items = cartItems();
  const activeProducts = filteredProducts();

  app.innerHTML = `
    <a class="skip-link" href="#catalog">Lewati ke katalog</a>
    <div class="site-shell">
      <header class="hero">
        <nav class="topbar" aria-label="Navigasi utama">
          <a class="brand" href="#" aria-label="Toko Kue Manis Rasa">
            <span class="brand-mark" aria-hidden="true">MR</span>
            <span>
              <strong>Manis Rasa</strong>
              <small>Toko kue harian</small>
            </span>
          </a>
          <a class="topbar-order" href="#cart">Pesan sekarang</a>
        </nav>

        <div class="hero-grid">
          <section class="hero-copy" aria-labelledby="hero-title">
            <p class="eyebrow">Fresh batch dari rak pagi ini</p>
            <h1 id="hero-title">Kue siap pesan untuk momen yang tidak bisa ditunda.</h1>
            <p class="hero-text">
              Pilih cake ulang tahun, slice, hampers, dan mini tart. Keranjang langsung dirapikan
              menjadi pesan WhatsApp supaya order cepat dikonfirmasi.
            </p>
            <div class="hero-actions">
              <a class="button primary" href="#catalog">Lihat katalog</a>
              <a class="button secondary" href="#cart">Cek keranjang</a>
            </div>
          </section>

          <aside class="fresh-panel" aria-label="Sorotan kue hari ini">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80"
              alt="Black forest cake dengan lapisan cokelat dan krim"
            />
            <div class="fresh-ticket">
              <span>Jam ambil tercepat</span>
              <strong>15.30 WIB</strong>
            </div>
          </aside>
        </div>
      </header>

      <main class="store-layout">
        <section class="catalog-section" id="catalog" aria-labelledby="catalog-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Katalog tray</p>
              <h2 id="catalog-title">Pilih dari rak hari ini</h2>
            </div>
            <label class="search-box">
              <span>Cari kue</span>
              <input
                type="search"
                value="${escapeHtml(state.search)}"
                placeholder="Contoh: pandan, ulang tahun"
                data-search
              />
            </label>
          </div>

          <div class="filter-row" aria-label="Filter kategori">
            ${categories
              .map(
                (category) => `
                  <button class="filter-chip ${
                    state.filter === category ? "is-active" : ""
                  }" type="button" data-filter="${category}" aria-pressed="${
                  state.filter === category
                }">
                    ${category}
                  </button>
                `
              )
              .join("")}
          </div>

          <div class="product-rail">
            ${
              activeProducts.length
                ? activeProducts.map(productTemplate).join("")
                : `<div class="empty-state">
                    <strong>Kue tidak ditemukan.</strong>
                    <p>Coba hapus filter atau cari kategori lain.</p>
                    <button class="button secondary" type="button" data-reset-filter>Reset filter</button>
                  </div>`
            }
          </div>
        </section>

        <aside class="cart-panel" id="cart" aria-labelledby="cart-title">
          <div class="cart-sticky">
            <div class="section-heading compact">
              <div>
                <p class="eyebrow">Order tray</p>
                <h2 id="cart-title">Keranjang</h2>
              </div>
              <span class="cart-count">${items.length} item</span>
            </div>

            <div class="cart-items">
              ${
                items.length
                  ? items.map(cartItemTemplate).join("")
                  : `<div class="empty-state small">
                      <strong>Keranjang masih kosong.</strong>
                      <p>Pilih kue dari katalog untuk mulai order.</p>
                    </div>`
              }
            </div>

            <label class="notes-box">
              <span>Catatan order</span>
              <textarea data-notes rows="4" placeholder="Contoh: tulisan nama, ambil jam 5 sore">${escapeHtml(
                state.notes
              )}</textarea>
            </label>

            <div class="total-line">
              <span>Subtotal</span>
              <strong>${currency.format(subtotal())}</strong>
            </div>

            <a class="button checkout ${items.length ? "" : "is-disabled"}"
              href="${items.length ? checkoutUrl() : "#catalog"}"
              target="${items.length ? "_blank" : "_self"}"
              rel="noreferrer"
              aria-disabled="${items.length ? "false" : "true"}"
              data-checkout>
              Checkout WhatsApp
            </a>
          </div>
        </aside>
      </main>
    </div>
    <div class="mobile-cart-bar" aria-label="Ringkasan keranjang mobile">
      <span>${items.length} item - ${currency.format(subtotal())}</span>
      <a class="button primary ${items.length ? "" : "is-disabled"}" href="#cart">Keranjang</a>
    </div>
    <p class="sr-only" aria-live="polite" data-live></p>
  `;

  bindEvents();
}

function productTemplate(product) {
  return `
    <article class="product-tray">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-copy">
        <div class="product-title-row">
          <div>
            <p class="product-category">${product.category} / ${product.occasion}</p>
            <h3>${product.name}</h3>
          </div>
          <span class="status ${product.status.toLowerCase().replace("-", "")}">${product.status}</span>
        </div>
        <p>${product.description}</p>
        <div class="product-meta">
          <span>${product.size}</span>
          <strong>${currency.format(product.price)}</strong>
        </div>
        <button class="button tray-action" type="button" data-add="${product.id}">
          Tambah
        </button>
      </div>
    </article>
  `;
}

function cartItemTemplate(item) {
  return `
    <div class="cart-item">
      <div>
        <strong>${item.product.name}</strong>
        <span>${currency.format(item.product.price)}</span>
      </div>
      <div class="stepper" aria-label="Jumlah ${item.product.name}">
        <button type="button" data-qty="${item.product.id}" data-next="${item.quantity - 1}" aria-label="Kurangi ${
    item.product.name
  }">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-qty="${item.product.id}" data-next="${item.quantity + 1}" aria-label="Tambah ${
    item.product.name
  }">+</button>
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.add));
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      render();
    });
  });

  document.querySelectorAll("[data-qty]").forEach((button) => {
    button.addEventListener("click", () => {
      updateQuantity(button.dataset.qty, Number(button.dataset.next));
    });
  });

  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
    document.querySelector("[data-search]")?.focus();
  });

  document.querySelector("[data-notes]")?.addEventListener("input", (event) => {
    state.notes = event.target.value;
  });

  document.querySelector("[data-reset-filter]")?.addEventListener("click", () => {
    state.filter = "Semua";
    state.search = "";
    render();
  });

  document.querySelector("[data-checkout]")?.addEventListener("click", (event) => {
    if (cartItems().length === 0) {
      event.preventDefault();
      announce("Keranjang masih kosong.");
      return;
    }

    event.preventDefault();
    window.open(checkoutUrl(), "_blank", "noreferrer");
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render();
