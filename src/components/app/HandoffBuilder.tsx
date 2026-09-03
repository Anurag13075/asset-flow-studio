import { useMemo, useState } from "react";
import { Check, ClipboardCheck, Download, ShieldAlert, X } from "lucide-react";
import { formatBytes, type Asset } from "@/lib/data";

type HandoffBuilderProps = {
  assets: Asset[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
};

export function HandoffBuilder({ assets, selectedIds, onToggle, onClear }: HandoffBuilderProps) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => assets.filter((asset) => selectedIds.includes(asset.id)), [assets, selectedIds]);
  const risky = selected.filter((asset) => ["unknown", "unlicensed", "personal"].includes(asset.license));
  const totalBytes = selected.reduce((sum, asset) => sum + asset.bytes, 0);

  const downloadManifest = () => {
    const manifest = {
      generatedAt: new Date().toISOString(),
      assetCount: selected.length,
      totalBytes,
      riskCount: risky.length,
      assets: selected.map(({ id, name, ext, kind, bytes, tags, license, collection }) => ({
        id, name, ext, kind, bytes, tags, license, collection,
      })),
    };
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vaultgrid-handoff-manifest.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-5 overflow-hidden rounded-xl border border-primary/30 bg-surface shadow-[0_12px_30px_-18px_rgba(232,163,61,0.5)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50"
        aria-expanded={open}
      >
        <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary"><ClipboardCheck className="size-4" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-foreground">Handoff Builder</span>
          <span className="block text-[11px] text-muted-foreground">Build a rights-aware delivery manifest from this view</span>
        </span>
        <span className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-foreground">{selected.length} selected</span>
      </button>

      {open && (
        <div className="border-t border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
              <span>{formatBytes(totalBytes)} package size</span>
              <span className={risky.length ? "text-destructive" : "text-[#4FBFA0]"}>{risky.length} rights {risky.length === 1 ? "review" : "reviews"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => assets.forEach((asset) => { if (!selectedIds.includes(asset.id)) onToggle(asset.id); })} className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-[11px] font-medium text-foreground hover:border-primary/40">Add visible</button>
              <button onClick={onClear} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Clear selected assets"><X className="size-3.5" /></button>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {assets.slice(0, 12).map((asset) => {
              const selectedAsset = selectedIds.includes(asset.id);
              const assetRisky = ["unknown", "unlicensed", "personal"].includes(asset.license);
              return (
                <button key={asset.id} onClick={() => onToggle(asset.id)} className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-colors ${selectedAsset ? "border-primary/50 bg-primary/10" : "border-border bg-surface hover:bg-secondary/60"}`}>
                  <span className={`grid size-5 shrink-0 place-items-center rounded border ${selectedAsset ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}>
                    {selectedAsset && <Check className="size-3" />}
                  </span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-[11px] font-medium text-foreground">{asset.name}.{asset.ext}</span><span className="block font-mono text-[10px] text-muted-foreground">{formatBytes(asset.bytes)} / {asset.license}</span></span>
                  {assetRisky && <ShieldAlert className="size-3.5 shrink-0 text-destructive" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-[11px] text-muted-foreground">Risky files stay visible so approvals are explicit.</p>
            <button onClick={downloadManifest} disabled={!selected.length} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"><Download className="size-3.5" />Download manifest</button>
          </div>
        </div>
      )}
    </section>
  );
}
