// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

// Step 2: Clicking changes a counter.
// The state lives here; the display is derived from it, never the other way.
let cookies = 0;

const counter = document.createElement("p");
counter.id = "cookie-counter";
counter.textContent = "0 cookies";

function formatCookies(amount: number): string {
  return amount === 1 ? "1 cookie" : `${amount} cookies`;
}

function render(): void {
  counter.textContent = formatCookies(cookies);
}

// Step 3: Timed growth. +1 cookie per second, on top of manual clicks.
const COOKIES_PER_SECOND = 1;
setInterval(() => {
  cookies += COOKIES_PER_SECOND;
  render();
}, 1000);

// Step 1: A button you can click.
// Created in TypeScript, given an identity, wired with an event listener.
const cookieButton = document.createElement("button");
cookieButton.id = "cookie-button";
cookieButton.type = "button";
cookieButton.textContent = "Bake a cookie";

cookieButton.addEventListener("click", () => {
  cookies += 1;
  render();
});

app.append(heading, image, counter, message, cookieButton);
