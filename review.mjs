/* ===========================================================================
   review.mjs — visual self-review for the site
   ---------------------------------------------------------------------------
   Renders index.html in a real (headless) browser, captures any console/JS
   errors, checks for common layout problems, and saves screenshots so the
   page can be inspected visually.

   Run with:  node review.mjs
   Output:    review/desktop.png, review/mobile.png  + a printed report
   =========================================================================== */
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = "file://" + join(__dirname, "index.html");
mkdirSync(join(__dirname, "review"), { recursive: true });

const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let problems = [];

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

  // Collect console errors + uncaught exceptions
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${vp.name}] console error: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${vp.name}] page error: ${e.message}`));

  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  // Disable smooth scrolling for the whole review so every programmatic scroll
  // is instant (otherwise screenshots can capture mid-animation).
  await page.addStyleTag({ content: "html, *, *::before, *::after { scroll-behavior: auto !important; }" });
  await new Promise((r) => setTimeout(r, 600)); // let fonts/animations settle

  // Scroll through the whole page like a real visitor so scroll-triggered
  // animations fire, THEN return to the top. This makes the screenshot reflect
  // what a person actually sees (not the un-revealed initial state).
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const step = window.innerHeight * 0.85;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
          clearInterval(timer);
          resolve();
        }
      }, 110);
    });
  });
  await new Promise((r) => setTimeout(r, 500));
  // Above-the-fold screenshot from the very top (smooth scroll already off).
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log(`  fold scrollY:   ${scrollY} (should be 0)`);
  await page.screenshot({ path: join(__dirname, "review", `${vp.name}-fold.png`) });

  // Layout checks --------------------------------------------------------
  const checks = await page.evaluate(() => {
    const out = {};
    const de = document.documentElement;
    out.horizontalOverflow = de.scrollWidth - de.clientWidth; // >1px = sideways scroll
    out.bodyBg = getComputedStyle(document.body).backgroundColor;
    // Find any element wider than the viewport (a common "broken" cause)
    const overflowers = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 2 && r.height > 4) {
        overflowers.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} (${Math.round(r.width)}px)`);
      }
    });
    out.overflowers = [...new Set(overflowers)].slice(0, 8);
    // Did the custom display font load? (Fraunces)
    out.fraunces = document.fonts.check("16px Fraunces");
    // Sanity: is the hero headline visible & non-zero size?
    const h1 = document.querySelector("h1");
    out.h1 = h1 ? getComputedStyle(h1).fontSize + " / " + getComputedStyle(h1).fontFamily : "MISSING";
    return out;
  });

  if (checks.horizontalOverflow > 2)
    problems.push(`[${vp.name}] horizontal overflow: ${checks.horizontalOverflow}px (causes sideways scroll). Offenders: ${checks.overflowers.join(", ") || "n/a"}`);

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
  console.log(`  body bg:        ${checks.bodyBg}`);
  console.log(`  h1:             ${checks.h1}`);
  console.log(`  Fraunces loaded:${checks.fraunces}`);
  console.log(`  h-overflow:     ${checks.horizontalOverflow}px`);
  if (checks.overflowers.length) console.log(`  wide elements:  ${checks.overflowers.join(", ")}`);

  await page.screenshot({ path: join(__dirname, "review", `${vp.name}.png`), fullPage: true });
  console.log(`  screenshot ->   review/${vp.name}.png`);
  await page.close();
}

await browser.close();

console.log("\n========== REPORT ==========");
if (problems.length === 0) console.log("✅ No console errors or layout overflow detected.");
else problems.forEach((p) => console.log("⚠️  " + p));
console.log("============================\n");
