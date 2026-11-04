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

// Step 6: Multiple upgrades. Each has its own cost curve and effect;
// production is derived from what's owned so feedback can't drift from state.
const UPGRADES = [
  {
    id: "oven",
    label: "Bigger oven",
    effect: "+1 cookie/sec",
    baseCost: 10,
    costGrowth: 2,
    rateBonus: 1,
    owned: 0,
  },
  {
    id: "farm",
    label: "Cookie farm",
    effect: "+5 cookie/sec",
    baseCost: 100,
    costGrowth: 3,
    rateBonus: 5,
    owned: 0,
  },
];

function upgradeCost(u: (typeof UPGRADES)[number]): number {
  return u.baseCost * u.costGrowth ** u.owned;
}

function rateOf(): number {
  return UPGRADES.reduce((total, u) => total + u.owned * u.rateBonus, 1);
}

function rateText(): string {
  return `Production: ${rateOf()} cookie/sec`;
}

// Step 4: Elapsed-time animation. Growth = rate × real elapsed seconds,
// measured via requestAnimationFrame, so it's frame-rate independent.
let lastTick = performance.now();

function tick(now: number): void {
  const elapsed = (now - lastTick) / 1000;
  lastTick = now;
  if (elapsed > 0) {
    cookies += rateOf() * elapsed;
    render();
  }
  requestAnimationFrame(tick);
}

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

function render(): void {
  counter.textContent = formatCookies(Math.floor(cookies));
  rateLine.textContent = rateText();
  for (const u of upgradeButtons) {
    const cost = upgradeCost(u.upgrade);
    u.button.textContent =
      `${u.upgrade.label} — ${u.upgrade.effect} — cost: ${cost} (owned: ${u.upgrade.owned})`;
    u.button.disabled = cookies < cost;
  }
}

const rateLine = document.createElement("p");
rateLine.id = "production-rate";
rateLine.textContent = rateText();

// One button per upgrade, each wired to purchase its own upgrade.
const upgradeButtons = UPGRADES.map((u) => {
  const button = document.createElement("button");
  button.id = `upgrade-${u.id}`;
  button.type = "button";
  button.addEventListener("click", () => {
    const cost = upgradeCost(u);
    if (cookies < cost) return;
    cookies -= cost;
    u.owned += 1;
    render();
  });
  return { upgrade: u, button };
});

app.append(heading, image, counter, rateLine, message, cookieButton);
for (const { button } of upgradeButtons) {
  app.append(button);
}
render();
requestAnimationFrame(tick);
