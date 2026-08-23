import { Star } from "lucide-react";
import { Thumb } from "@/components/Thumb";
import { colorHex, formatBytes, relTime, type Asset } from "@/lib/data";

export function AssetSkeletonGrid({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shimmer overflow-hidden rounded-xl border border-border bg-surface"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <div className="aspect-4/3 bg-secondary/50" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 rounded bg-secondary" />
            <div className="h-2.5 w-1/2 rounded bg-secondary/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AssetGrid({
  assets, selectedId, onSelect, onToggleFavorite,
}: {
  assets: Asset[];
  selectedId: string | null;
  onSelect: (a: Asset) => void;
  onToggleFavorite: (a: Asset) => void;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
      {assets.map((a, i) => (
        <button
          key={a.id}
          onClick={() => onSelect(a)}
          style={{ animationDelay: `${Math.min(i, 24) * 22}ms` }}
          className={`rise hover-lift group overflow-hidden rounded-xl border bg-surface text-left ${
            selectedId === a.id ? "border-primary/70 shadow-(--shadow-glow)" : "border-border"
          }`}
        >
          <div className="relative">
            <Thumb asset={a} className="aspect-4/3 w-full" />
            <span
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(a); }}
              className="absolute right-2 top-2 rounded-md bg-background/70 p-1.5 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
            >
              <Star className={`size-3.5 ${a.favorite ? "fill-primary text-primary" : "text-foreground/70"}`} />
            </span>
            <span className="absolute bottom-2 left-2 rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
              {a.ext}
            </span>
          </div>
          <div className="space-y-1.5 p-3">
            <p className="truncate text-[13px] font-medium text-foreground">{a.name}</p>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: colorHex(a.color) }} />
              <span className="font-mono">{formatBytes(a.bytes)}</span>
              <span className="ml-auto">{relTime(a.createdAt)}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function AssetList({
  assets, selectedId, onSelect,
}: {
  assets: Asset[];
  selectedId: string | null;
  onSelect: (a: Asset) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[minmax(0,3fr)_100px_110px_110px_90px] gap-3 border-b border-border bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span>Name</span><span>Kind</span><span>Size</span><span>Added</span><span>Uses</span>
      </div>
      {assets.map((a, i) => (
        <button
          key={a.id}
          onClick={() => onSelect(a)}
          style={{ animationDelay: `${Math.min(i, 24) * 16}ms` }}
          className={`rise grid w-full grid-cols-[minmax(0,3fr)_100px_110px_110px_90px] items-center gap-3 border-b border-border/60 px-3 py-2 text-left text-[13px] transition-colors last:border-0 ${
            selectedId === a.id ? "bg-secondary" : "hover:bg-secondary/50"
          }`}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Thumb asset={a} className="size-8 shrink-0 rounded-md" />
            <span className="truncate">{a.name}.{a.ext}</span>
          </span>
          <span className="text-muted-foreground">{a.kind}</span>
          <span className="font-mono text-muted-foreground">{formatBytes(a.bytes)}</span>
          <span className="text-muted-foreground">{relTime(a.createdAt)}</span>
          <span className="font-mono text-muted-foreground">{a.uses}</span>
        </button>
      ))}
    </div>
  );
}
