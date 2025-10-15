/**
 * Application constants
 */

// Load C00KED names from environment variables to keep them secret
const getC00kedNames = (): readonly string[] => {
  const envNames = import.meta.env.VITE_C00KED_NAMES;

  if (!envNames) {
    console.warn("VITE_C00KED_NAMES not found in environment variables");
    return [];
  }
  console.log(`
██     ███████ ███████ ███████     ██    ██  ██████  ██    ██ 
██     ██      ██      ██           ██  ██  ██    ██ ██    ██ 
██     ███████ █████   █████         ████   ██    ██ ██    ██ 
██          ██ ██      ██             ██    ██    ██ ██    ██ 
██     ███████ ███████ ███████        ██     ██████   ██████
`);
  return envNames.split(",").map((name: string) => name.trim().toLowerCase());
};

export const C00KED_NAMES = getC00kedNames();

export const MESSAGES = {
  SUCCESS: "😎 you are good, for now",
  C00KED: "C00KED",
  TITLE: "am i c00ked?",
  PLACEHOLDER: "Type your situation... be honest 👀",
} as const;

export const facts = [
  "🦦 Sea otters hold hands when they sleep so they don’t drift apart.",
  "🌌 There are more stars in the universe than grains of sand on Earth.",
  "🐧 Penguins propose with pebbles.",
  "🦋 Some butterflies taste with their feet.",
  "☕ Coffee beans are actually seeds.",
  "🌱 Bananas are berries, but strawberries aren’t.",
  "🌕 The moon has moonquakes.",
  "🐙 An octopus has three hearts.",
  "🔥 Hot water freezes faster than cold water — it’s called the Mpemba effect.",
  "🎵 A day on Venus is longer than a year on Venus.",
  "🦒 Giraffes have the same number of neck bones as humans: seven.",
  "🐘 Elephants can recognize themselves in a mirror.",
  "🌊 The ocean produces over half of the world’s oxygen.",
  "🦜 Parrots name their babies with unique calls.",
  "🌲 Trees can communicate through underground fungi networks — the ‘wood wide web’.",
  "💤 You can’t actually dream of a face you’ve never seen.",
  "🐢 Some turtles can breathe through their butts during hibernation.",
  "🥑 Avocados are poisonous to almost every animal except humans.",
  "🦈 Sharks existed before trees did.",
  "🌋 There’s enough gold in Earth’s core to cover the planet in a 1.5-foot layer.",
  "🐝 Bees can recognize human faces.",
  "🐼 Pandas fake pregnancies to get more food and attention from zookeepers.",
  "🎈 The Eiffel Tower grows about 15 cm taller in summer due to heat expansion.",
  "🕊️ The heart of a blue whale is as big as a small car.",
  "❄️ Snow isn’t actually white — it’s translucent.",
  "🍌 Humans share about 60% of their DNA with bananas.",
  "🧊 Ice is slippery because it creates a thin layer of water under pressure.",
  "🦋 Caterpillars completely liquefy inside their cocoons before becoming butterflies.",
  "🎭 The shortest war in history lasted 38 minutes.",
  "🌈 You can’t hum while holding your nose closed (try it).",
];
