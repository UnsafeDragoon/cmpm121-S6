// Step 9: Data-driven design. All upgrade content lives here as data;
// purchase rules, costs and rates are one shared implementation (SRP:
// this module owns game rules, the UI module only renders them).
export interface UpgradeDef {
  id: string;
  label: string;
  description: string;
  effect: string;
  baseCost: number;
  costGrowth: number;
  rateBonus: number;
}

// Step 8: A coherent theme — "The Midnight Bakery": you bake by hand at
// first, then hire helpers and build machines that bake for you.
export const UPGRADE_DEFS: UpgradeDef[] = [
  {
    id: "oven",
    label: "Bigger oven",
    description: "A wider hearth burns hotter, baking more with every second.",
    effect: "+1 cookie/sec",
    baseCost: 10,
    costGrowth: 2,
    rateBonus: 1,
  },
  {
    id: "farm",
    label: "Cookie farm",
    description: "Rows of dough-fruit ripen under the bakery's lanterns.",
    effect: "+5 cookie/sec",
    baseCost: 100,
    costGrowth: 3,
    rateBonus: 5,
  },
  {
    id: "golem",
    label: "Dough golem",
    description: "A faithful helper kneads the night away and never sleeps.",
    effect: "+25 cookie/sec",
    baseCost: 1000,
    costGrowth: 4,
    rateBonus: 25,
  },
];

export interface GameState {
  cookies: number;
  owned: Record<string, number>;
}

export function createGame(): GameState {
  return { cookies: 0, owned: {} };
}

export function ownedOf(game: GameState, id: string): number {
  return game.owned[id] ?? 0;
}

// Step 7: Costs evolve — each purchase makes the next one more expensive,
// so early buys shape which upgrade is worth saving for next.
export function costOf(game: GameState, def: UpgradeDef): number {
  return def.baseCost * def.costGrowth ** ownedOf(game, def.id);
}

export function rateOf(game: GameState): number {
  return UPGRADE_DEFS.reduce(
    (total, def) => total + ownedOf(game, def.id) * def.rateBonus,
    1,
  );
}

export function purchase(game: GameState, def: UpgradeDef): boolean {
  const cost = costOf(game, def);
  if (game.cookies < cost) return false;
  game.cookies -= cost;
  game.owned[def.id] = ownedOf(game, def.id) + 1;
  return true;
}

export function advance(game: GameState, seconds: number): void {
  if (seconds > 0) game.cookies += rateOf(game) * seconds;
}
