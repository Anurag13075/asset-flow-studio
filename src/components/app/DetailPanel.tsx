import { useState } from "react";
import { Copy, Link2, Star, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Thumb } from "@/components/Thumb";
import { COLOR_FAMILIES, colorHex, formatBytes, relTime, type Asset } from "@/lib/data";
import { isDupe } from "./Sidebar";

export function DetailPanel({
  asset, all, onClose, onUpdate, onDelete,
}: {
  asset: Asset;
  all: Asset[];
  onClose: () => void;
  onUpdate: (patch: Partial<Asset>) => void;
  onDelete: () => void;
}) {
  const [tag, setTag] = useState("");
  const related = all
    .filter((a) => a.id !== asset.id && (a.tags.some((t) => asset.tags.includes(t)) || a.color === asset.color))
    .slice(0, 6);

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col overflow-y-auto border-l border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Inspector
        </span>
        <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      <div className="p-4">
        <Thumb asset={asset} className="aspect-[4/3] w-full rounded-xl border border-border" />
        <h2 className="mt-4 text-[15px] font-semibold leading-snug">{asset.name}.{asset.ext}</h2>
        {isDupe(all, asset) && (
          <p className="mt-2 rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1.5 text-[11px] text-destructive-foreground">
            Near-duplicate detected in this vault.
          </p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onUpdate({ favorite: !asset.favorite })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium transition-colors hover:border-primary/50"
          >
            <Star className={`size-3.5 ${asset.favorite ? "fill-primary text-primary" : ""}`} />
            {asset.favorite ? "Starred" : "Star"}
          </button>
          <button
            onClick={() => { navigator.clipboard?.writeText(`vault://${asset.id}`); toast.success("Reference link copied"); }}
            className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs transition-colors hover:border-primary/50"
          >
            <Link2 className="size-3.5" />
          </button>
          <button
            onClick={() => { navigator.clipboard?.writeText(asset.hash); toast.success("Hash copied"); }}
            className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs transition-colors hover:border-primary/50"
          >
            <Copy className="size-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-destructive transition-colors hover:border-destructive/60"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>

        <dl className="mt-5 space-y-2 text-[12px]">
          <Row k="Kind" v={asset.kind} />
          <Row k="Size" v={formatBytes(asset.bytes)} />
          {asset.width ? <Row k="Dimensions" v={`${asset.width} × ${asset.height}`} /> : null}
          {asset.duration ? <Row k="Duration" v={`${asset.duration}s`} /> : null}
          <Row k="Added" v={relTime(asset.createdAt)} />
          <Row k="Last used" v={relTime(asset.lastUsed)} />
          <Row k="Uses" v={String(asset.uses)} />
          <Row k="License" v={asset.license} />
          <Row k="Hash" v={asset.hash} mono />
        </dl>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Palette</p>
          <div className="mt-2 flex gap-1.5">
            {COLOR_FAMILIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onUpdate({ color: c.id })}
                className={`size-6 rounded-md border transition-transform hover:scale-110 ${
                  asset.color === c.id ? "border-foreground" : "border-transparent"
                }`}
                style={{ background: c.hex }}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Tags</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {asset.tags.map((t) => (
              <button
                key={t}
                onClick={() => onUpdate({ tags: asset.tags.filter((x) => x !== t) })}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-destructive/50 hover:text-foreground"
              >
                {t} ×
              </button>
            ))}
          </div>
          <form
            className="mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              const v = tag.trim().toLowerCase();
              if (v && !asset.tags.includes(v)) onUpdate({ tags: [...asset.tags, v] });
              setTag("");
            }}
          >
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add tag + Enter"
              className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary/60"
            />
          </form>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Notes</p>
          <textarea
            value={asset.note ?? ""}
            onChange={(e) => onUpdate({ note: e.target.value })}
            placeholder="Usage rights, client, source…"
            rows={3}
            className="mt-2 w-full resize-none rounded-lg border border-input bg-background px-2.5 py-2 text-xs outline-none focus:border-primary/60"
          />
        </div>

        {related.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Visually related
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {related.map((r) => (
                <Thumb key={r.id} asset={r} className="aspect-square rounded-md border border-border" />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-1.5">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={`truncate ${mono ? "font-mono text-[11px]" : ""}`}>{v}</dd>
    </div>
  );
}

export { colorHex };
