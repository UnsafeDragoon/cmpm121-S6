// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import {
  advance,
  costOf,
  createGame,
  ownedOf,
  purchase,
  rateOf,
  UPGRADE_DEFS,
} from "./game.ts";

// SRP: main.ts only renders state and forwards input. All rules live in
// game.ts, so new upgrades need no new logic here.
const app = document.querySelector<HTMLElement>("#app")!;
const game = createGame();

// Step 8: The theme carries everything — title, action, resource and
// upgrade descriptions all speak the Midnight Bakery.
const heading = document.createElement("h1");
heading.textContent = "The Midnight Bakery";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A round, moonlit cookie with a cream glaze";
image.width = 96;
image.height = 96;

const counter = document.createElement("p");
counter.id = "cookie-counter";

const rateLine = document.createElement("p");
rateLine.id = "production-rate";

const cookieButton = document.createElement("button");
cookieButton.id = "cookie-button";
cookieButton.type = "button";
cookieButton.textContent = "Bake a cookie by hand";
cookieButton.addEventListener("click", () => {
  game.cookies += 1;
  render();
});

// Step 9/10: One button per upgrade, all built from the shared model —
// adding content entries never means copying button logic.
const upgradeButtons = UPGRADE_DEFS.map((def) => {
  const button = document.createElement("button");
  button.id = `upgrade-${def.id}`;
  button.type = "button";
  const info = document.createElement("p");
  info.textContent = `${def.label} — ${def.description} (${def.effect})`;
  button.addEventListener("click", () => {
    purchase(game, def);
    render();
  });
  return { def, info, button };
});

function formatCookies(amount: number): string {
  return amount === 1 ? "1 cookie" : `${amount} cookies`;
}

function rateText(): string {
  return `The bakery produces ${rateOf(game)} cookie/sec`;
}

function render(): void {
  counter.textContent = formatCookies(Math.floor(game.cookies));
  rateLine.textContent = rateText();
  for (const { def, button } of upgradeButtons) {
    const cost = costOf(game, def);
    button.textContent = `${def.label} — cost: ${cost} (owned: ${ownedOf(game, def.id)})`;
    button.disabled = game.cookies < cost;
  }
}

app.append(heading, image, counter, rateLine, cookieButton);
for (const { info, button } of upgradeButtons) {
  app.append(info, button);
}

// Step 4: Growth = rate × real elapsed seconds via animation frames, so it
// is frame-rate independent and never counted twice.
let lastTick = performance.now();
function tick(now: number): void {
  const elapsed = (now - lastTick) / 1000;
  lastTick = now;
  advance(game, elapsed);
  render();
  requestAnimationFrame(tick);
}

render();
requestAnimationFrame(tick);
