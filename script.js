/* Beach Getaway — script.js (plain JavaScript, no libraries) */

var RENTALS = [
  { id: "seaglass-villa", name: "Shangri-La Mactan", type: "villa", location: "Mactan", sleeps: 10, bedrooms: 5, toBeach: "On the sand", nightly: `11,000`, image: "images/shangrila.jpg", blurb: "A luxurious beachfront resort in Mactan known for its white-sand beach, tropical gardens, and beautiful ocean views." },
  { id: "driftwood-house", name: "Basdaku White Beach", type: "villa", location: "Moalboal, Cebu", sleeps: 8, bedrooms: 4, toBeach: "1 min walk", nightly: `350`, image: "images/basdaku.webp", blurb: "A well-known beach in Moalboal with white sand, seaside cottages, and a laid-back atmosphere." },
  { id: "tidepool-cottage", name: "Santiago Bay Garden and Resort", type: "cottage", location: "Camotes", sleeps: 6, bedrooms: 3, toBeach: "2 min walk", nightly: `2,000`, image: "images/santiago-bay-garden-resort.jpg", blurb: "A seaside resort in Camotes featuring beautiful bay views, sandy shores, and comfortable accommodations." },
  { id: "sandpiper-cottage", name: "Marcosas Cottages Resort", type: "cottage", location: "Moalboal, Cebu", sleeps: 5, bedrooms: 2, toBeach: "3 min walk", nightly: `2,300`, image: "images/marcosas.jpg", blurb: "A tropical cottage-style resort surrounded by greenery, offering a peaceful and relaxing accommodation experience." },
  { id: "coral-hideaway", name: "Busay Cave", type: "cove", location: "Moalboal, Cebu", sleeps: 4, bedrooms: 2, toBeach: "Cave", nightly: `30`, image: "images/busay cave.jpg", blurb: "A small natural cave in Moalboal known for its rock formations and nearby cold spring." },
  { id: "lagoon-lodge", name: "Ogtong Cave Resort", type: "cove", location: "Bantayan Island", sleeps: 7, bedrooms: 3, toBeach: "Cave", nightly: `3,500`, image: "images/Ogtong-Cave-Bantayan-Island-9.jpg", blurb: "A unique seaside resort in Bantayan Island known for its natural limestone cave and freshwater pool." }
];
var TYPE_LABELS = { villa: "Beachfront Villas", cottage: "Family Cottages", cove: "Hidden Coves" };

/* Everything the site search can find */
var SEARCH_INDEX = [
  { group: "Pages", title: "Home", url: "index.html", text: "ocean view rentals for family vacations" },
  { group: "Pages", title: "About", url: "about.html", text: "who we are our story standards safety" },
  { group: "Pages", title: "Rentals", url: "rentals.html", text: "compare homes villas cottages coves prices" },
  { group: "Pages", title: "Experiences", url: "experiences.html", text: "surf snorkel snorkeling kayak tide pool sandcastle activities" },
  { group: "Pages", title: "Blog", url: "blog.html", text: "articles planning tips" },
  { group: "Pages", title: "FAQ", url: "faq.html", text: "questions answers booking pets baby gear check-in rates minimum stay weather" },
  { group: "Pages", title: "Contact", url: "contact.html", text: "phone email address hours booking request" },
  { group: "Pages", title: "Site Map", url: "sitemap.html", text: "all pages list" },
  { group: "Pages", title: "Privacy & Disclaimer", url: "privacy.html", text: "privacy data disclaimer terms" },
  { group: "Articles", title: "A Packing List for Family Beach Trips", url: "article-packing.html", text: "packing sunscreen towels crib kids" },
  { group: "Articles", title: "How to Choose the Right Ocean View Rental", url: "article-choosing.html", text: "beachfront walk to beach hidden cove snorkeling" },
  { group: "Articles", title: "Beach Safety Basics for Kids", url: "article-safety.html", text: "flags rip currents sun safety" }
].concat(RENTALS.map(function (r) {
  return { group: "Homes", title: r.name, url: "rentals.html#" + r.id, text: r.location + " " + r.type + " " + r.blurb };
})).concat([
  { group: "Questions", title: "How do I book a home?", url: "faq.html#how-do-i-book-a-home", text: "Send your dates, group size and the home you like from the contact page, or call our office. We reply within one business day with availability." },
  { group: "Questions", title: "Are the rates per night?", url: "faq.html#are-the-rates-per-night", text: "Yes. The price shown on each home is per night. Rates and availability change with the season, so the quote we send when you book is the one we honor." },
  { group: "Questions", title: "How many nights do I have to book?", url: "faq.html#how-many-nights-do-i-have-to-book", text: "Three nights minimum in peak season (June to August) and two nights the rest of the year. Longer stays get a discount — ask when you send your dates." },
  { group: "Questions", title: "Can we add guests after booking?", url: "faq.html#can-we-add-guests-after-booking", text: "Yes, up to the sleeps number listed for the home. Extra guests add a per-night fee, so tell us before arrival and we update your quote." },
  { group: "Questions", title: "What is included in every rental?", url: "faq.html#what-is-included-in-every-rental", text: "Towels, beach chairs, an umbrella and a cooler are waiting in every home. You only need to pack clothes, sunscreen and food." },
  { group: "Questions", title: "Do you provide baby gear?", url: "faq.html#do-you-provide-baby-gear", text: "Yes. Ask for a crib, high chair or baby gate when you book and we set it up before you arrive at no extra cost." },
  { group: "Questions", title: "Can I bring my dog?", url: "faq.html#can-i-bring-my-dog", text: "Two of our homes welcome one well-behaved dog. Tell us which pet you are bringing when you send your dates so we can match you to the right home." },
  { group: "Questions", title: "What are check-in and check-out times?", url: "faq.html#what-are-check-in-and-check-out-times", text: "Check-in is from 4:00 PM and check-out is by 10:00 AM. Tell us your arrival time and we leave the key box open for late arrivals." },
  { group: "Questions", title: "How far is the beach?", url: "faq.html#how-far-is-the-beach", text: "Each home lists its own distance: some are on the sand, others are a one to three minute walk. Hidden cove homes have private beach access." },
  { group: "Questions", title: "What if the weather turns bad?", url: "faq.html#what-if-the-weather-turns-bad", text: "If a storm makes the beach unusable for your whole stay, we move your dates once at no charge. Tell us before your second day." }
]);

function $(sel, root) { return (root || document).querySelector(sel); }
function params() { return new URLSearchParams(window.location.search); }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

/* Mobile menu */
function initMenu() {
  var btn = $(".menu-toggle"), nav = $(".mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* Home hero search -> rentals page */
function initHeroSearch() {
  var form = $("#hero-search");
  if (!form) return;
  var dates = $("#hero-dates");
  dates.addEventListener("focus", function () { dates.type = "date"; });
  dates.addEventListener("blur", function () { if (!dates.value) dates.type = "text"; });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var p = new URLSearchParams();
    var q = $("#hero-q").value.trim(), g = $("#hero-guests").value;
    if (q) p.set("q", q);
    if (g) p.set("guests", g);
    window.location.href = "rentals.html" + (p.toString() ? "?" + p.toString() : "");
  });
}

/* Rentals page: filter, table and cards */
function filterRentals(f) {
  var q = (f.q || "").trim().toLowerCase();
  return RENTALS.filter(function (r) {
    return (!q || r.name.toLowerCase().indexOf(q) > -1 || r.location.toLowerCase().indexOf(q) > -1) &&
      (!f.type || r.type === f.type) &&
      (!f.guests || r.sleeps >= f.guests);
  });
}

function initRentals() {
  var tableBody = $("#rentals-table tbody");
  if (!tableBody) return;
  var p = params();
  var state = { q: p.get("q") || "", type: p.get("type") || "", guests: Number(p.get("guests")) || 0 };
  $("#filter-q").value = state.q;
  $("#filter-guests").value = state.guests || "";

  function render() {
    var list = filterRentals(state);
    document.querySelectorAll(".pill").forEach(function (b) {
      b.classList.toggle("active", b.dataset.type === state.type);
    });
    var summary = "Showing " + list.length + " of " + RENTALS.length + " homes";
    if (state.q) summary += " matching “" + esc(state.q) + "”";
    if (state.guests) summary += " for " + state.guests + "+ guests";
    $("#rentals-count").innerHTML = summary + ".";
    tableBody.innerHTML = list.map(function (r) {
      return "<tr><td><a class='text-link' href='#" + r.id + "'>" + r.name + "</a></td><td class='muted'>" + r.location +
        "</td><td>" + r.sleeps + "</td><td>" + r.bedrooms + "</td><td class='muted'>" + r.toBeach + "</td><td><strong>₱" + r.nightly + "</strong></td></tr>";
    }).join("") || "<tr><td colspan='6'>No homes match these filters. <a class='text-link' href='rentals.html'>Clear filters</a></td></tr>";
    $("#rentals-cards").innerHTML = list.map(function (r) {
      return "<article class='card' id='" + r.id + "'><img src='" + r.image + "' alt='" + r.name + "' loading='lazy'>" +
        "<div class='body'><p class='eyebrow'>" + TYPE_LABELS[r.type] + " · " + r.location + "</p><h3>" + r.name + "</h3><p class='muted'>" + r.blurb + "</p>" +
        "<div class='row'><p><span class='price'>₱" + r.nightly + "</span> <span class='muted'>/ night</span></p>" +
        "<a class='btn btn-aqua' href='contact.html?home=" + encodeURIComponent(r.name) + "'>Book</a></div></div></article>";
    }).join("");
    var url = new URLSearchParams();
    if (state.q) url.set("q", state.q);
    if (state.type) url.set("type", state.type);
    if (state.guests) url.set("guests", state.guests);
    history.replaceState(null, "", "rentals.html" + (url.toString() ? "?" + url.toString() : "") + window.location.hash);
  }

  document.querySelectorAll(".pill").forEach(function (b) {
    b.addEventListener("click", function () { state.type = b.dataset.type; render(); });
  });
  $("#filter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    state.q = $("#filter-q").value.trim();
    state.guests = Number($("#filter-guests").value) || 0;
    render();
  });
  render();
}

/* Site search */
function initSearch() {
  var out = $("#search-results");
  if (!out) return;
  var q = (params().get("q") || "").trim();
  $("#site-q").value = q;
  if (!q) return;
  var term = q.toLowerCase();
  var hits = SEARCH_INDEX.filter(function (i) { return (i.title + " " + i.text).toLowerCase().indexOf(term) > -1; });
  var html = "<p class='muted' aria-live='polite'>" + hits.length + " result" + (hits.length === 1 ? "" : "s") + " for “" + esc(q) + "”</p>";
  ["Pages", "Homes", "Articles", "Questions"].forEach(function (g) {
    var items = hits.filter(function (h) { return h.group === g; });
    if (!items.length) return;
    html += "<div class='result-group'><h2>" + g + "</h2><ul>" + items.map(function (h) {
      return "<li><a class='text-link' href='" + h.url + "'>" + h.title + "</a></li>";
    }).join("") + "</ul></div>";
  });
  if (!hits.length) html += "<p style='margin-top:20px'>Nothing found. Try another word or browse the <a class='text-link' href='sitemap.html'>site map</a>.</p>";
  out.innerHTML = html;
}

/* Contact form -> opens the visitor's email app */
function initContact() {
  var form = $("#contact-form");
  if (!form) return;
  var home = params().get("home");
  if (home) form.elements.home.value = home;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var body = "Name: " + f.name.value + "\nEmail: " + f.email.value + "\nHome: " + (f.home.value || "Any") +
      "\nDates: " + f.checkin.value + " to " + f.checkout.value + "\nGuests: " + f.guests.value + "\n\n" + f.message.value;
    window.location.href = "mailto:hello@beachgetaway.com?subject=" + encodeURIComponent("Booking request") + "&body=" + encodeURIComponent(body);
    $("#contact-status").textContent = "Your email app should open with the request filled in. If not, email us at hello@beachgetaway.com.";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  initHeroSearch();
  initRentals();
  initSearch();
  initContact();
});
