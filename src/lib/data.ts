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
  color: ColorFamily | null;
  collection: string;
  bytes: number;                
  width?: number | undefined;
  height?: number | undefined;
  duration?: number | undefined;
  createdAt: string;
  lastUsed: string | null;
  uses: number;
  license: "personal" | "commercial" | "cc0" | "unlicensed" | "unknown";
  hash: string | null;
  note?: string | undefined;
  favorite?: boolean | undefined;
};

export type Collection =  { id: string; name: string; icon: string; smart?: string };

export const DEFAULT_COLLECTIONS: Collection[] = [
  { id: "unfiled", name: "Unfiled", icon: "Inbox" },
  { id: "brand", name: "Brand Kit", icon: "Sparkles" },
  { id: "product-shots", name: "Product Shots", icon: "Camera" },
  { id: "motion", name: "Motion Reels", icon: "Clapperboard" },
  { id: "type", name: "Typefaces", icon: "Type" },
  { id: "3d-props", name: "3D Props", icon: "Box" },
  { id: "sfx", name: "Sound Design", icon: "AudioLines" },
];

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

export function colorHex(id: string | null) {
  return COLOR_FAMILIES.find((c) => c.id === id)?.hex ?? "#7b8794";
}

