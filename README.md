# Yanelly Fuels 🥑🍓

A simple, fast landing page to help people simplify nutrition — built so that
**Yanelly can keep growing it herself using Claude.**

🔗 **Live site:** _(add the link here once GitHub Pages is on — see below)_

---

## What's in this project

Just a handful of plain files — no complicated setup, nothing to install.

| File | What it is |
|------|-----------|
| `index.html` | **All the text and sections** of the page. This is the one you'll edit most. |
| `styles.css` | The colors, fonts, and layout. Brand colors live at the very top. |
| `script.js` | A little interactivity (mobile menu, email form). Rarely needs editing. |
| `images/` | Photos. Drop Yanelly's picture here as `yanelly.jpg`. |
| `.github/workflows/deploy.yml` | Auto-publishes the site when you push changes. |

---

## ✏️ How to edit it (the easy way — with Claude)

You don't need to know how to code. Open this project in Claude and just ask
for what you want in plain English. For example:

- _"Change the headline to 'Fuel your goals'."_
- _"Add a new recipe card for protein pancakes in the Recipes section."_
- _"Add a fourth free guide called 'Meal Prep 101'."_
- _"Make the main green color a little brighter."_
- _"Add a TikTok link in the Connect section."_

Claude will make the change. Then you (or Claude) **save and push** it, and the
live site updates on its own within a minute or two.

> 💡 Tip: ask Claude to "show me what it looks like" or to describe the change
> before pushing, so you can confirm it's what you wanted.

### Editing by hand (optional)
If you ever want to tweak text yourself, open `index.html` and look for the
words on the page — they're surrounded by comments like
`<!-- 4. RECIPES -->` so you can find the right spot. Change the words between
the tags and save.

---

## 🚀 Putting it online (one-time setup)

This site is free to host on **GitHub Pages**:

1. Push this code to GitHub (on the `main` branch).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Done. Every push to `main` now auto-publishes. Your link will look like
   `https://<username>.github.io/yanelly-fit/`.

**Custom domain later** (e.g. `yanellyfuels.com`): buy one (~$12/yr from
Namecheap/Cloudflare), then add it under Settings → Pages → Custom domain.

---

## 📸 Adding the real photo
Save Yanelly's photo into the `images/` folder named exactly `yanelly.jpg`.
A portrait (taller than wide) photo looks best. Until then, the page shows a
soft placeholder — nothing breaks.

---

## 📥 Making the free guides downloadable
1. Create a folder named `guides/`.
2. Put the PDF in it, e.g. `guides/balanced-plate.pdf`.
3. In `index.html`, find the guide and change `href="#"` to
   `href="guides/balanced-plate.pdf"`, and change the button text from
   "Coming soon" to "Download".

(Or just ask Claude: _"make the Balanced Plate guide link to guides/balanced-plate.pdf"_.)

---

## ✉️ Collecting emails (when ready)
The signup form currently just shows a thank-you message. To actually build an
email list, connect it to a free tool like **Kit (ConvertKit)**, **Mailchimp**,
or **Beehiiv** — each gives you a snippet to paste in. Ask Claude to help wire
it up when you're ready.

---

## 💰 Ways to monetize later (roadmap)
The site is free now; here's the typical path creators take:

1. **Free guides → email list.** The list is your most valuable asset.
2. **Paid digital products** — premium meal plans, recipe ebooks, grocery
   guides ($5–30 each) via **Gumroad** or **Stripe**. No coding needed.
3. **1:1 coaching / services** once credentialed — add a "Work with me" page
   plus a booking link (e.g. **Calendly**).
4. **Affiliate links** — supplements, kitchen tools, grocery staples.
5. **Brand deals / sponsorships** — a real site makes you look legit to brands.

---

Made with 🥑 — educational content only, not individualized medical advice.
