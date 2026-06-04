/* Renders docs/handoff.html to a printable PDF.  Run:  node make-handoff.mjs */
import puppeteer from "puppeteer";
import { join } from "path";

const src = "file://" + join(process.cwd(), "docs", "handoff.html");
const out = join(process.cwd(), "docs", "Yanelly-Fuels-Handoff-Guide.pdf");

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(src, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 500));
await page.pdf({ path: out, format: "Letter", printBackground: true });
await browser.close();
console.log("Wrote", out);
