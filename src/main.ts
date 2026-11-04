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

// Step 1: A button you can click.
// Created in TypeScript, given an identity, wired with an event listener.
const cookieButton = document.createElement("button");
cookieButton.id = "cookie-button";
cookieButton.type = "button";
cookieButton.textContent = "Click me";

let clickCount = 0;
cookieButton.addEventListener("click", () => {
  clickCount += 1;
  message.textContent = `The handler runs! Clicks: ${clickCount}`;
});

app.append(heading, image, message, cookieButton);
