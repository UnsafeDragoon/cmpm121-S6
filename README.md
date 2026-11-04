# The Midnight Bakery

A minimal cookie-clicker game — TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

## How it plays

- **Bake a cookie by hand** — each click adds 1 cookie.
- **Upgrades** — Bigger oven, Cookie farm, Dough golem. Each purchase raises the bakery's automatic production; costs evolve as you buy.
- Production accrues per real elapsed second (frame-rate independent).

## Design notes

- `src/game.ts` — all game rules and upgrade content as data (SRP: rules only).
- `src/main.ts` — DOM rendering and input only; new upgrades need no new UI logic.

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
