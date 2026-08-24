import { useState } from "react";
import {
  AudioLines, Box, Camera, Clapperboard, Folder, Layers, Plus, Sparkles, Star, Trash2, Type,
  Clock, AlertTriangle, HardDrive, ShieldAlert, RotateCcw,
} from "lucide-react";
import type { Asset, Collection } from "@/lib/data";
import { formatBytes } from "@/lib/data";
import { useStore } from "@/lib/store";

const ICONS: Record<string, typeof Folder> = {
  Sparkles, Camera, Clapperboard, Type, Box, AudioLines, Folder,
};

export type SmartView = "all" | "favorites" | "unused" | "duplicates" | "recent" | "font-conflicts" | "trash";

export function Sidebar({
  collections, assets, active, onSelect, onAddCollection,
}: {
  collections: Collection[];
  assets: Asset[];
  active: { view: SmartView; collection: string | null };
  onSelect: (v: { view: SmartView; collection: string | null }) => void;
  onAddCollection: (name: string) => void;
}) {
  const { drives, fontConflicts, offlineAssetCount, trash, toggleDriveStatus } = useStore();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  const totalBytes = assets.reduce((s, a) => s + a.bytes, 0);
  const smart: { id: SmartView; label: string; icon: typeof Folder; count: number; alert?: boolean }[] = [
    { id: "all", label: "All assets", icon: Layers, count: assets.length },
    { id: "recent", label: "Recently added", icon: Clock, count: assets.filter((a) => Date.now() - Date.parse(a.createdAt) < 30 * 864e5).length },
    { id: "favorites", label: "Starred", icon: Star, count: assets.filter((a) => a.favorite).length },
    { id: "unused", label: "Never used", icon: Trash2, count: assets.filter((a) => a.uses === 0).length },
    { id: "duplicates", label: "Duplicate radar", icon: AlertTriangle, count: countDupes(assets) },
    { id: "font-conflicts", label: "Font conflicts", icon: ShieldAlert, count: fontConflicts.length, alert: fontConflicts.length > 0 },
    { id: "trash", label: "Versioned trash", icon: RotateCcw, count: trash.length },
  ];

  return (
    <aside className="flex h-full w-[256px] shrink-0 flex-col border-r border-border bg-sidebar">
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {smart.map((s) => {
            const on = active.view === s.id && !active.collection;
            return (
              <button
                key={s.id}
                onClick={() => onSelect({ view: s.id, collection: null })}
                className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  on ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                }`}
              >
                <s.icon className={`size-4 ${on ? "text-primary" : s.alert ? "text-amber-500" : ""}`} strokeWidth={1.6} />
                <span className="flex-1 text-left truncate">{s.label}</span>
                <span className={`font-mono text-[11px] ${s.alert ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                  {s.count}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between px-2.5 pb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Collections
            </span>
            <button
              onClick={() => setAdding((v) => !v)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
              aria-label="New collection"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {adding && (
            <form
              className="px-2.5 pb-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) onAddCollection(name.trim());
                setName("");
                setAdding(false);
              }}
            >
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Collection name"
                className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm outline-none focus:border-primary/60"
              />
            </form>
          )}

          <div className="space-y-0.5">
            {collections.map((c) => {
              const Icon = ICONS[c.icon] ?? Folder;
              const on = active.collection === c.id;
              const count = assets.filter((a) => a.collection === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelect({ view: "all", collection: c.id })}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                    on ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                  }`}
                >
                  <Icon className={`size-4 ${on ? "text-primary" : ""}`} strokeWidth={1.6} />
                  <span className="flex-1 truncate text-left">{c.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Drive-aware Storage Section */}
      <div className="border-t border-sidebar-border p-3 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            <span className="flex items-center gap-1.5">
              <HardDrive className="size-3.5" /> External Drives
            </span>
            {offlineAssetCount > 0 && (
              <span className="text-[10px] text-amber-500 font-normal">
                {offlineAssetCount} offline
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {drives.map((d) => (
              <div key={d.id} className="flex items-center justify-between text-xs rounded-md bg-secondary/40 px-2 py-1.5 border border-border/40">
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <span className={`size-2 shrink-0 rounded-full ${d.isOnline ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                  <span className="truncate text-[12px] font-medium text-foreground">{d.name}</span>
                </div>
                <button
                  onClick={() => toggleDriveStatus(d.id)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono border transition-colors shrink-0 ${
                    d.isOnline
                      ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/40"
                      : "border-amber-500/30 text-amber-400 hover:bg-amber-950/40"
                  }`}
                  title={d.isOnline ? "Click to simulate unplugging drive" : "Click to simulate reconnecting drive"}
                >
                  {d.isOnline ? "Online" : "Plug in"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-sidebar-border/60">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Vault size</span>
            <span className="font-mono text-foreground">{formatBytes(totalBytes)}</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (totalBytes / 4e10) * 100)}%` }} />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">Local index · drive aware</p>
        </div>
      </div>
    </aside>
  );
}

export function countDupes(assets: Asset[]) {
  const seen = new Map<string, number>();
  for (const a of assets) {
    const k = `${a.kind}:${a.name.replace(/-(copy|v\d|final|alt)$/, "")}`;
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  return [...seen.values()].filter((v) => v > 1).reduce((s, v) => s + v, 0);
}

export function isDupe(assets: Asset[], a: Asset) {
  const k = a.name.replace(/-(copy|v\d|final|alt)$/, "");
  return assets.filter((b) => b.kind === a.kind && b.name.replace(/-(copy|v\d|final|alt)$/, "") === k).length > 1;
}
