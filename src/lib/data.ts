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

export type LicenseType = "commercial" | "personal" | "cc0" | "editorial" | "unlicensed" | "unknown";

export type LicenseDetails = {
  type: LicenseType;
  expiryDate?: string | null;
  attributionRequired?: boolean;
  attributionText?: string;
  commercialCovered: boolean;
  notes?: string;
};

export type FontMetadata = {
  family: string;
  subfamily?: string;
  foundry: string;
  version: string;
  metricsHash: string; // Used to detect subtle metric differences causing text reflow
  unitsPerEm?: number;
};

export type EmbeddedMetadata = {
  layerCount?: number;
  colorProfile?: string;
  sampleRate?: number; // Audio: Hz
  channels?: number;
  bitDepth?: number;
  vertexCount?: number; // 3D: count
  polygonCount?: number;
  cameraModel?: string;
  iso?: number;
  focalLength?: string;
  aperture?: string;
  resolution?: string;
};

export type DriveInfo = {
  driveId: string;
  driveName: string;
  mountPath: string;
  relativePath: string;
};

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
  license: LicenseType;
  licenseDetails?: LicenseDetails;
  fontMetadata?: FontMetadata;
  embeddedMetadata?: EmbeddedMetadata;
  driveInfo: DriveInfo;
  dependencies?: string[]; // IDs of linked assets (e.g., smart objects, textures, fonts used in PSD/3D scene)
  hash: string | null;
  note?: string | undefined;
  favorite?: boolean | undefined;
  deletedAt?: string | null; // Versioned trash timestamp
};

export type Drive = {
  id: string;
  name: string;
  mountPath: string;
  isOnline: boolean;
  totalSpace: number; // bytes
  freeSpace: number; // bytes
};

export type Collection = { id: string; name: string; icon: string; smart?: string };

export const DEFAULT_DRIVES: Drive[] = [
  { id: "drive_internal", name: "Macintosh HD", mountPath: "/Volumes/Macintosh HD", isOnline: true, totalSpace: 1000000000000, freeSpace: 340000000000 },
  { id: "drive_ext_1", name: "SanDisk Extreme (Archive)", mountPath: "/Volumes/SanDisk_Extreme", isOnline: true, totalSpace: 2000000000000, freeSpace: 850000000000 },
  { id: "drive_ext_2", name: "LaCie Rugged 4TB", mountPath: "/Volumes/LaCie_Studio", isOnline: false, totalSpace: 4000000000000, freeSpace: 120000000000 },
];

export const DEFAULT_COLLECTIONS: Collection[] = [
  { id: "unfiled", name: "Unfiled", icon: "Inbox" },
  { id: "brand", name: "Brand Kit", icon: "Sparkles" },
  { id: "product-shots", name: "Product Shots", icon: "Camera" },
  { id: "motion", name: "Motion Reels", icon: "Clapperboard" },
  { id: "type", name: "Typefaces", icon: "Type" },
  { id: "3d-props", name: "3D Props", icon: "Box" },
  { id: "sfx", name: "Sound Design", icon: "AudioLines" },
];

export const INITIAL_ASSETS: Asset[] = [
  {
    id: "ast_01_psd",
    name: "hero_campaign_master",
    kind: "image",
    ext: "psd",
    tags: ["hero", "brand", "campaign", "layered"],
    color: "amber",
    collection: "brand",
    bytes: 184500000,
    width: 3840,
    height: 2160,
    createdAt: new Date(Date.now() - 5 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 1 * 864e5).toISOString(),
    uses: 14,
    license: "commercial",
    licenseDetails: {
      type: "commercial",
      commercialCovered: true,
      attributionRequired: false,
    },
    embeddedMetadata: {
      layerCount: 48,
      colorProfile: "Display P3",
      resolution: "300 DPI",
    },
    driveInfo: {
      driveId: "drive_internal",
      driveName: "Macintosh HD",
      mountPath: "/Volumes/Macintosh HD",
      relativePath: "Projects/2025/BrandCampaign/hero_campaign_master.psd",
    },
    dependencies: ["ast_02_logo", "ast_05_font_inter_monotype", "ast_07_stock_photo"],
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    note: "Main campaign poster PSD with smart objects and font links",
    favorite: true,
  },
  {
    id: "ast_02_logo",
    name: "vaultgrid_mark_vector",
    kind: "vector",
    ext: "svg",
    tags: ["logo", "vector", "identity"],
    color: "amber",
    collection: "brand",
    bytes: 42000,
    width: 512,
    height: 512,
    createdAt: new Date(Date.now() - 20 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 2 * 864e5).toISOString(),
    uses: 42,
    license: "cc0",
    licenseDetails: {
      type: "cc0",
      commercialCovered: true,
      attributionRequired: false,
    },
    embeddedMetadata: {
      colorProfile: "sRGB",
    },
    driveInfo: {
      driveId: "drive_internal",
      driveName: "Macintosh HD",
      mountPath: "/Volumes/Macintosh HD",
      relativePath: "BrandAssets/Logos/vaultgrid_mark_vector.svg",
    },
    dependencies: [],
    hash: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
  },
  {
    id: "ast_03_glb",
    name: "studio_chair_rig",
    kind: "3d",
    ext: "glb",
    tags: ["3d", "furniture", "turntable", "mesh"],
    color: "teal",
    collection: "3d-props",
    bytes: 34200000,
    createdAt: new Date(Date.now() - 12 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 4 * 864e5).toISOString(),
    uses: 8,
    license: "commercial",
    licenseDetails: {
      type: "commercial",
      commercialCovered: true,
      expiryDate: "2026-12-31",
      attributionRequired: true,
      attributionText: "3D Asset by StudioNord",
    },
    embeddedMetadata: {
      vertexCount: 142800,
      polygonCount: 280400,
      colorProfile: "Linear sRGB",
    },
    driveInfo: {
      driveId: "drive_ext_1",
      driveName: "SanDisk Extreme (Archive)",
      mountPath: "/Volumes/SanDisk_Extreme",
      relativePath: "3D_Library/Furniture/studio_chair_rig.glb",
    },
    dependencies: ["ast_04_texture_wood"],
    hash: "8f4e2c1b9a8d7e6f5c4b3a210987654321fedcba",
  },
  {
    id: "ast_04_texture_wood",
    name: "oak_wood_4k_pbr",
    kind: "image",
    ext: "png",
    tags: ["texture", "pbr", "4k", "wood"],
    color: "amber",
    collection: "3d-props",
    bytes: 18900000,
    width: 4096,
    height: 4096,
    createdAt: new Date(Date.now() - 15 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 4 * 864e5).toISOString(),
    uses: 12,
    license: "cc0",
    licenseDetails: {
      type: "cc0",
      commercialCovered: true,
      attributionRequired: false,
    },
    embeddedMetadata: {
      colorProfile: "sRGB",
      resolution: "72 DPI",
    },
    driveInfo: {
      driveId: "drive_ext_1",
      driveName: "SanDisk Extreme (Archive)",
      mountPath: "/Volumes/SanDisk_Extreme",
      relativePath: "3D_Library/Textures/oak_wood_4k_pbr.png",
    },
    hash: "6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
  },
  {
    id: "ast_05_font_inter_monotype",
    name: "InterTight-Medium (Monotype)",
    kind: "font",
    ext: "otf",
    tags: ["font", "inter", "sans", "typography"],
    color: "slate",
    collection: "type",
    bytes: 284000,
    createdAt: new Date(Date.now() - 30 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 1 * 864e5).toISOString(),
    uses: 56,
    license: "commercial",
    licenseDetails: {
      type: "commercial",
      commercialCovered: true,
    },
    fontMetadata: {
      family: "Inter Tight",
      subfamily: "Medium",
      foundry: "Monotype Imaging",
      version: "Version 2.004;2023",
      metricsHash: "metrics_hash_v2_monotype_1000",
      unitsPerEm: 1000,
    },
    driveInfo: {
      driveId: "drive_internal",
      driveName: "Macintosh HD",
      mountPath: "/Volumes/Macintosh HD",
      relativePath: "Library/Fonts/InterTight-Medium-Monotype.otf",
    },
    hash: "11223344556677889900aabbccddeeff11223344",
  },
  {
    id: "ast_06_font_inter_google",
    name: "InterTight-Medium (Google Fonts)",
    kind: "font",
    ext: "ttf",
    tags: ["font", "inter", "sans", "typography", "conflict"],
    color: "slate",
    collection: "type",
    bytes: 312000,
    createdAt: new Date(Date.now() - 10 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 8 * 864e5).toISOString(),
    uses: 3,
    license: "cc0",
    licenseDetails: {
      type: "cc0",
      commercialCovered: true,
    },
    fontMetadata: {
      family: "Inter Tight",
      subfamily: "Medium",
      foundry: "Rasmus Andersson / Google",
      version: "Version 4.000;2024",
      metricsHash: "metrics_hash_v4_google_2048",
      unitsPerEm: 2048,
    },
    driveInfo: {
      driveId: "drive_internal",
      driveName: "Macintosh HD",
      mountPath: "/Volumes/Macintosh HD",
      relativePath: "Downloads/Fonts/InterTight-Medium-GF.ttf",
    },
    hash: "556677889900aabbccddeeff1122334455667788",
  },
  {
    id: "ast_07_stock_photo",
    name: "editorial_portrait_tokyo",
    kind: "image",
    ext: "jpg",
    tags: ["stock", "editorial", "portrait", "japan"],
    color: "crimson",
    collection: "product-shots",
    bytes: 14200000,
    width: 6000,
    height: 4000,
    createdAt: new Date(Date.now() - 40 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 1 * 864e5).toISOString(),
    uses: 9,
    license: "personal", // Non-commercial personal license! Flagged when shipping!
    licenseDetails: {
      type: "personal",
      commercialCovered: false,
      expiryDate: "2024-05-01", // Expired license!
      attributionRequired: true,
      attributionText: "Photo by Kenji Sato / Unsplash Editorial",
      notes: "Strict personal/non-commercial usage only. Needs extended license for client handoff.",
    },
    embeddedMetadata: {
      cameraModel: "Sony α7R V",
      iso: 200,
      focalLength: "85mm",
      aperture: "f/1.4",
      colorProfile: "sRGB IEC61966-2.1",
    },
    driveInfo: {
      driveId: "drive_ext_2", // On offline drive!
      driveName: "LaCie Rugged 4TB",
      mountPath: "/Volumes/LaCie_Studio",
      relativePath: "ClientArchives/Stock/editorial_portrait_tokyo.jpg",
    },
    hash: "99887766554433221100ffeeddccbbaa99887766",
  },
  {
    id: "ast_08_audio_sfx",
    name: "sci_fi_ui_click_heavy",
    kind: "audio",
    ext: "wav",
    tags: ["sfx", "audio", "ui", "click"],
    color: "violet",
    collection: "sfx",
    bytes: 4200000,
    duration: 1.8,
    createdAt: new Date(Date.now() - 8 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - 3 * 864e5).toISOString(),
    uses: 27,
    license: "commercial",
    licenseDetails: {
      type: "commercial",
      commercialCovered: true,
      attributionRequired: false,
    },
    embeddedMetadata: {
      sampleRate: 96000,
      channels: 2,
      bitDepth: 24,
    },
    driveInfo: {
      driveId: "drive_ext_1",
      driveName: "SanDisk Extreme (Archive)",
      mountPath: "/Volumes/SanDisk_Extreme",
      relativePath: "Audio/SFX/sci_fi_ui_click_heavy.wav",
    },
    hash: "3344556677889900aabbccddeeff112233445566",
  },
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
