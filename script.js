/* ===========================================================================
   Yanelly Fuels — small bits of interactivity
   ---------------------------------------------------------------------------
   This file does three little things:
     1. Opens/closes the mobile menu
     2. Closes the menu after you tap a link
     3. Handles the email signup form (shows a thank-you for now)
     4. Fills in the current year in the footer
   You usually won't need to touch this file.
   =========================================================================== */

// ---- 1 & 2. Mobile menu ----------------------------------------------------
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Tapping any link closes the menu
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- 3. Email signup -------------------------------------------------------
// Right now this just shows a friendly confirmation. To actually collect
// emails, connect this form to a free service (Mailchimp, ConvertKit/Kit,
// or Beehiiv) — each gives you an embed snippet you can paste in place of
// the <form> in index.html.
const form = document.getElementById("signup-form");
const note = document.getElementById("signup-note");

if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.hidden = false;
    note.textContent = "Thanks for signing up! 🥑 You'll hear from me soon.";
    form.reset();
  });
}

// ---- 4. Current year in the footer ----------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
