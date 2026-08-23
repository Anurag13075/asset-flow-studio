export type Kind = "image" | "video" | "3d" | "font" | "vector" | "audio";

export const KINDS: Kind[] = ["image", "video", "3d", "font", "vector", "audio"];

export const COLOR_FAMILIES = [
  { id: "amber", label: "Amber", hex: "#e0a63a" },
  { id: "crimson", label: "Crimson", hex: "#d3524f" },
  { id: "violet", label: "Violet", hex: "#8b7ae0" },
  { id: "teal", label: "Teal", hex: "#3fb6a8" },
  { id: "lime", label: "Lime", hex: "#93c94f" },
  { id: "slate", label: "Slate", hex: "#7b8794" },
  { id: "ink", label: "Ink", hex: "#2f3236" },
] as const;

export type ColorFamily = (typeof COLOR_FAMILIES)[number]["id"];

export type Asset = {
  id: string;
  name: string;
  kind: Kind;
  ext: string;
  tags: string[];
  color: ColorFamily;
  collection: string;
  bytes: number;
  width?: number | undefined;
  height?: number | undefined;
  duration?: number | undefined;
  createdAt: string;
  lastUsed: string | null;
  uses: number;
  license: "personal" | "commercial" | "cc0" | "unlicensed";
  hash: string;
  note?: string | undefined;
  favorite?: boolean | undefined;
};

export type Collection = { id: string; name: string; icon: string; smart?: string };

export const DEFAULT_COLLECTIONS: Collection[] = [
  { id: "brand", name: "Brand Kit", icon: "Sparkles" },
  { id: "product-shots", name: "Product Shots", icon: "Camera" },
  { id: "motion", name: "Motion Reels", icon: "Clapperboard" },
  { id: "type", name: "Typefaces", icon: "Type" },
  { id: "3d-props", name: "3D Props", icon: "Box" },
  { id: "sfx", name: "Sound Design", icon: "AudioLines" },
];

const NOUNS = [
  "aurora", "granite", "helio", "monolith", "cobalt", "vellum", "atlas", "signal",
  "harbor", "quartz", "lumen", "drift", "ember", "vector", "prism", "cinder",
  "orbit", "lattice", "onyx", "meridian", "halcyon", "tundra", "solstice", "basalt",
];
const MODS = ["v1", "v2", "final", "master", "alt", "hero", "loop", "wide", "mono", "dark"];

const TAG_POOL = [
  "hero", "dark-mode", "client-work", "approved", "wip", "editorial", "3d-render",
  "hand-drawn", "grain", "loop", "isometric", "brand", "packaging", "ui-kit",
  "cinematic", "type-specimen", "mockup", "texture", "icon-set", "archived",
];

const EXT: Record<Kind, string[]> = {
  image: ["png", "jpg", "webp", "tiff"],
  video: ["mp4", "mov", "prores"],
  "3d": ["glb", "fbx", "blend", "usdz"],
  font: ["otf", "ttf", "woff2"],
  vector: ["svg", "ai", "eps"],
  audio: ["wav", "aiff", "mp3"],
};

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeed(count = 96): Asset[] {
  const rnd = mulberry(42);
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rnd() * arr.length)] as T;
  const now = Date.now();
  const out: Asset[] = [];

  for (let i = 0; i < count; i++) {
    const kind = pick(KINDS);
    const ext = pick(EXT[kind]);
    const tags = Array.from(
      new Set([pick(TAG_POOL), pick(TAG_POOL), ...(rnd() > 0.6 ? [pick(TAG_POOL)] : [])]),
    );
    const created = now - Math.floor(rnd() * 1000 * 60 * 60 * 24 * 420);
    const uses = rnd() > 0.35 ? Math.floor(rnd() * 24) : 0;
    out.push({
      id: `a_${i.toString(36)}${Math.floor(rnd() * 1e6).toString(36)}`,
      name: `${pick(NOUNS)}-${pick(NOUNS)}-${pick(MODS)}`,
      kind,
      ext,
      tags,
      color: pick(COLOR_FAMILIES).id,
      collection: pick(DEFAULT_COLLECTIONS).id,
      bytes: Math.floor((rnd() * (kind === "video" ? 2.4e9 : 6e7)) + 4e5),
      width: kind === "image" || kind === "vector" || kind === "video" ? pick([1080, 1920, 2560, 3840]) : undefined,
      height: kind === "image" || kind === "vector" || kind === "video" ? pick([1080, 1350, 1440, 2160]) : undefined,
      duration: kind === "video" || kind === "audio" ? Math.floor(rnd() * 240) + 4 : undefined,
      createdAt: new Date(created).toISOString(),
      lastUsed: uses ? new Date(created + rnd() * (now - created)).toISOString() : null,
      uses,
      license: pick(["personal", "commercial", "cc0", "unlicensed"] as const),
      hash: Math.floor(rnd() * 1e12).toString(16).padStart(12, "0"),
    });
  }

  // deliberate near-duplicates so the duplicate radar has something to find
  for (let i = 0; i < 6; i++) {
    const src = out[Math.floor(rnd() * out.length)] as Asset;
    out.push({
      ...src,
      id: `a_dup${i}`,
      name: `${src.name}-copy`,
      bytes: Math.round(src.bytes * (0.97 + rnd() * 0.06)),
      createdAt: new Date(Date.parse(src.createdAt) + 864e5 * 3).toISOString(),
      uses: 0,
      lastUsed: null,
    });
  }

  return out;
}

export function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  const u = ["KB", "MB", "GB", "TB"];
  let i = -1;
  let n = b;
  do {
    n /= 1024;
    i++;
  } while (n >= 1024 && i < u.length - 1);
  return `${n.toFixed(n < 10 ? 1 : 0)} ${u[i]}`;
}

export function relTime(iso: string | null) {
  if (!iso) return "never";
  const diff = Date.now() - Date.parse(iso);
  const d = Math.floor(diff / 864e5);
  if (d < 1) return "today";
  if (d < 30) return `${d}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

export function colorHex(id: string) {
  return COLOR_FAMILIES.find((c) => c.id === id)?.hex ?? "#7b8794";
}
