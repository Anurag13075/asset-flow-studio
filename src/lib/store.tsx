import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import {
  type Asset,
  type Collection,
  type Drive,
  DEFAULT_COLLECTIONS,
  DEFAULT_DRIVES,
  INITIAL_ASSETS,
  formatBytes,
} from "./data";

const KEY = "vaultgrid.v3";
export const FREE_ACCESS_EMAIL = "anuragf863@gmail.com";

export function isFreeAccessEmail(email: string) {
  return email.trim().toLowerCase() === FREE_ACCESS_EMAIL;
}

export type FontConflictGroup = {
  familyName: string;
  assets: Asset[];
  foundries: string[];
  metricsHashes: string[];
};

type Persisted = {
  assets: Asset[];
  trash: Asset[];
  drives: Drive[];
  collections: Collection[];
  user: { email: string; name: string } | null;
  paid: boolean;
};

type Store = Persisted & {
  ready: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
  grantAccess: () => void;
  updateAsset: (id: string, patch: Partial<Asset>) => void;
  softDeleteAssets: (ids: string[]) => void;
  restoreAssets: (ids: string[]) => void;
  permanentlyDeleteAssets: (ids: string[]) => void;
  addAssets: (files: { name: string; bytes: number; lastModified: number }[]) => Asset[];
  addCollection: (name: string) => void;
  toggleDriveStatus: (driveId: string) => void;
  bundleProjectZip: (rootAssetId: string) => Promise<void>;
  exportContactSheetPDF: (selectedAssets: Asset[], title?: string) => void;
  fontConflicts: FontConflictGroup[];
  offlineAssetCount: number;
};

const Ctx = createContext<Store | null>(null);

function initial(): Persisted {
  return {
    assets: INITIAL_ASSETS,
    trash: [],
    drives: DEFAULT_DRIVES,
    collections: DEFAULT_COLLECTIONS,
    user: null,
    paid: false,
  };
}

function kindFromName(name: string): Asset["kind"] {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["mp4", "mov", "webm", "prores"].includes(ext)) return "video";
  if (["glb", "fbx", "obj", "blend", "usdz"].includes(ext)) return "3d";
  if (["otf", "ttf", "woff", "woff2"].includes(ext)) return "font";
  if (["svg", "ai", "eps"].includes(ext)) return "vector";
  if (["wav", "mp3", "aiff", "flac"].includes(ext)) return "audio";
  return "image";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => initial());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Persisted;
        // Merge drives and assets if saved data lacks new schema fields
        setState({
          ...initial(),
          ...parsed,
          drives: parsed.drives && parsed.drives.length ? parsed.drives : DEFAULT_DRIVES,
          assets: parsed.assets && parsed.assets.length ? parsed.assets : INITIAL_ASSETS,
        });
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  // Derive font conflicts
  const fontConflicts = useMemo<FontConflictGroup[]>(() => {
    const fonts = state.assets.filter((a) => a.kind === "font" && a.fontMetadata);
    const groups = new Map<string, Asset[]>();
    for (const f of fonts) {
      const fam = f.fontMetadata?.family.trim().toLowerCase() ?? f.name.toLowerCase();
      const existing = groups.get(fam) ?? [];
      groups.set(fam, [...existing, f]);
    }
    const result: FontConflictGroup[] = [];
    for (const [fam, fontAssets] of groups.entries()) {
      if (fontAssets.length > 1) {
        const foundries = Array.from(new Set(fontAssets.map((a) => a.fontMetadata?.foundry ?? "Unknown")));
        const metricsHashes = Array.from(new Set(fontAssets.map((a) => a.fontMetadata?.metricsHash ?? "default")));
        if (foundries.length > 1 || metricsHashes.length > 1) {
          result.push({
            familyName: fontAssets[0]?.fontMetadata?.family ?? fam,
            assets: fontAssets,
            foundries,
            metricsHashes,
          });
        }
      }
    }
    return result;
  }, [state.assets]);

  // Derive count of assets on offline drives
  const offlineAssetCount = useMemo(() => {
    const offlineDriveIds = new Set(state.drives.filter((d) => !d.isOnline).map((d) => d.id));
    return state.assets.filter((a) => offlineDriveIds.has(a.driveInfo?.driveId)).length;
  }, [state.assets, state.drives]);

  const value = useMemo<Store>(
    () => ({
      ...state,
      ready,
      fontConflicts,
      offlineAssetCount,
      signIn: (email) => {
        const normalizedEmail = email.trim().toLowerCase();
        setState((s) => ({
          ...s,
          user: { email: normalizedEmail, name: normalizedEmail.split("@")[0] ?? "designer" },
          paid: s.paid || isFreeAccessEmail(normalizedEmail),
        }));
      },
      signOut: () => setState((s) => ({ ...s, user: null })),
      grantAccess: () => setState((s) => ({ ...s, paid: true })),
      updateAsset: (id, patch) =>
        setState((s) => ({ ...s, assets: s.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
      softDeleteAssets: (ids) =>
        setState((s) => {
          const toDelete = s.assets.filter((a) => ids.includes(a.id)).map((a) => ({ ...a, deletedAt: new Date().toISOString() }));
          const remaining = s.assets.filter((a) => !ids.includes(a.id));
          return {
            ...s,
            assets: remaining,
            trash: [...toDelete, ...s.trash],
          };
        }),
      restoreAssets: (ids) =>
        setState((s) => {
          const toRestore = s.trash.filter((a) => ids.includes(a.id)).map((a) => ({ ...a, deletedAt: null }));
          const remainingTrash = s.trash.filter((a) => !ids.includes(a.id));
          return {
            ...s,
            assets: [...toRestore, ...s.assets],
            trash: remainingTrash,
          };
        }),
      permanentlyDeleteAssets: (ids) =>
        setState((s) => ({
          ...s,
          trash: s.trash.filter((a) => !ids.includes(a.id)),
        })),
      addAssets: (files) => {
        const created = files.map((f, i) => {
          const kind = kindFromName(f.name);
          const ext = f.name.split(".").pop()?.toLowerCase() ?? "bin";
          const baseName = f.name.replace(/\.[^.]+$/, "");
          return {
            id: `up_${Date.now().toString(36)}_${i}`,
            name: baseName,
            kind,
            ext,
            tags: [kind, ext],
            color: null,
            collection: "unfiled",
            bytes: f.bytes,
            createdAt: new Date(f.lastModified).toISOString(),
            lastUsed: null,
            uses: 0,
            license: "unknown" as const,
            licenseDetails: {
              type: "unknown",
              commercialCovered: false,
            },
            driveInfo: {
              driveId: "drive_internal",
              driveName: "Macintosh HD",
              mountPath: "/Volumes/Macintosh HD",
              relativePath: `Imports/${f.name}`,
            },
            dependencies: [],
            hash: null,
          } satisfies Asset;
        });
        setState((s) => ({ ...s, assets: [...created, ...s.assets] }));
        return created;
      },
      addCollection: (name) =>
        setState((s) => ({
          ...s,
          collections: [
            ...s.collections,
            { id: `c_${Date.now().toString(36)}`, name, icon: "Folder" },
          ],
        })),
      toggleDriveStatus: (driveId) =>
        setState((s) => ({
          ...s,
          drives: s.drives.map((d) => (d.id === driveId ? { ...d, isOnline: !d.isOnline } : d)),
        })),

      // 1. Client Delivery Packaging — recursively collects dependencies & bundles to ZIP with relative paths
      bundleProjectZip: async (rootAssetId: string) => {
        const assetMap = new Map(state.assets.map((a) => [a.id, a]));
        const root = assetMap.get(rootAssetId);
        if (!root) {
          toast.error("Project asset not found");
          return;
        }

        const collected = new Set<string>();
        const queue = [rootAssetId];
        const uncommercial: string[] = [];

        while (queue.length > 0) {
          const currentId = queue.shift()!;
          if (collected.has(currentId)) continue;
          collected.add(currentId);

          const item = assetMap.get(currentId);
          if (item) {
            if (item.licenseDetails && !item.licenseDetails.commercialCovered) {
              uncommercial.push(`${item.name}.${item.ext} (${item.license})`);
            }
            if (item.dependencies && item.dependencies.length > 0) {
              for (const depId of item.dependencies) {
                if (!collected.has(depId)) queue.push(depId);
              }
            }
          }
        }

        if (uncommercial.length > 0) {
          toast.warning(`License warning! ${uncommercial.length} referenced asset(s) are not covered for commercial use:`, {
            description: uncommercial.join(", "),
            duration: 6000,
          });
        }

        const zip = new JSZip();
        const manifestLines: string[] = [
          `Vaultgrid Delivery Package Manifest`,
          `==================================`,
          `Project Root: ${root.name}.${root.ext}`,
          `Generated: ${new Date().toISOString()}`,
          `Total Referenced Assets: ${collected.size}`,
          ``,
          `Included Files (Paths collapsed to relative):`,
        ];

        collected.forEach((id) => {
          const item = assetMap.get(id);
          if (!item) return;

          const relFilename = item.driveInfo?.relativePath
            ? item.driveInfo.relativePath.split("/").pop()!
            : `${item.name}.${item.ext}`;

          manifestLines.push(` - ${relFilename} [${item.kind.toUpperCase()}] (${formatBytes(item.bytes)})`);

          // Generate simulated file content for zip package
          const mockFileContent = `[Vaultgrid Client Delivery Bundle]
File: ${item.name}.${item.ext}
Kind: ${item.kind}
Hash: ${item.hash ?? "N/A"}
License: ${item.license} (Commercial Covered: ${item.licenseDetails?.commercialCovered ?? false})
Original Local Path: ${item.driveInfo?.mountPath ?? ""}/${item.driveInfo?.relativePath ?? ""}`;

          zip.file(relFilename, mockFileContent);
        });

        zip.file("README_DELIVERY.txt", manifestLines.join("\n"));

        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${root.name}_delivery_package.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success(`Client bundle exported! (${collected.size} files packaged with relative paths)`);
      },

      // 6. Contact Sheet Export — Deterministic PDF generation
      exportContactSheetPDF: (selectedAssets: Asset[], title = "Vaultgrid Asset Handoff Contact Sheet") => {
        if (selectedAssets.length === 0) {
          toast.error("No assets selected for contact sheet export");
          return;
        }

        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40;
        let y = margin;

        // Header
        doc.setFillColor(22, 20, 15); // Vaultgrid ink background token
        doc.rect(0, 0, pageWidth, 54, "F");

        doc.setTextColor(242, 239, 230); // Primary text token
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("VAULTGRID", margin, 34);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(163, 159, 143);
        doc.text(title, margin + 110, 34);

        doc.setFontSize(9);
        doc.text(`Generated ${new Date().toLocaleDateString()} · ${selectedAssets.length} Assets`, pageWidth - margin, 34, { align: "right" });

        y = 80;

        const cols = 2;
        const colWidth = (pageWidth - margin * 2 - 20) / cols;

        selectedAssets.forEach((asset, idx) => {
          if (y > pageHeight - 110) {
            doc.addPage();
            y = margin + 20;
          }

          const col = idx % cols;
          const x = margin + col * (colWidth + 20);

          // Card container
          doc.setDrawColor(220, 220, 220);
          doc.setFillColor(248, 247, 245);
          doc.roundedRect(x, y, colWidth, 90, 6, 6, "FD");

          // Asset Thumbnail representation
          doc.setFillColor(230, 228, 220);
          doc.roundedRect(x + 8, y + 8, 74, 74, 4, 4, "F");
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(100, 100, 100);
          doc.text(asset.ext.toUpperCase(), x + 45, y + 48, { align: "center" });

          // Spec Metadata
          doc.setTextColor(30, 30, 30);
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          const truncatedName = asset.name.length > 22 ? asset.name.slice(0, 20) + "…" : asset.name;
          doc.text(`${truncatedName}.${asset.ext}`, x + 92, y + 24);

          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(100, 100, 100);
          doc.text(`Kind: ${asset.kind.toUpperCase()}`, x + 92, y + 38);
          doc.text(`Size: ${formatBytes(asset.bytes)}`, x + 92, y + 50);

          const dimText = asset.width
            ? `Specs: ${asset.width} × ${asset.height} px`
            : asset.duration
              ? `Duration: ${asset.duration}s`
              : asset.embeddedMetadata?.layerCount
                ? `Layers: ${asset.embeddedMetadata.layerCount}`
                : `License: ${asset.license}`;
          doc.text(dimText, x + 92, y + 62);

          doc.text(`Drive: ${asset.driveInfo?.driveName ?? "Local"}`, x + 92, y + 74);

          if (col === cols - 1) {
            y += 102;
          }
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Vaultgrid Local-First Asset Management System — Deterministic Client Handoff PDF", margin, pageHeight - 20);

        doc.save(`Vaultgrid_Contact_Sheet_${Date.now()}.pdf`);
        toast.success("Contact sheet PDF downloaded successfully!");
      },
    }),
    [state, ready, fontConflicts, offlineAssetCount],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function useHotkey(combo: (e: KeyboardEvent) => boolean, handler: () => void) {
  const cb = useCallback(handler, [handler]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (combo(e)) {
        e.preventDefault();
        cb();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cb, combo]);
}
