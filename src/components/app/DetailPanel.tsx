import { useState } from "react";
import {
  AlertTriangle, Box, Copy, Download, HardDrive, Layers, Link2, Package, ShieldAlert, ShieldCheck, Star, Trash2, X,
} from "lucide-react";
import { toast } from "sonner";
import { Thumb } from "@/components/Thumb";
import { COLOR_FAMILIES, colorHex, formatBytes, relTime, type Asset, type LicenseType } from "@/lib/data";
import { useStore } from "@/lib/store";
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
  const { drives, bundleProjectZip } = useStore();
  const [tag, setTag] = useState("");
  const [zipping, setZipping] = useState(false);

  const drive = drives.find((d) => d.id === asset.driveInfo?.driveId);
  const isOffline = drive ? !drive.isOnline : false;

  const related = all
    .filter((a) => a.id !== asset.id && (a.tags.some((t) => asset.tags.includes(t)) || a.color === asset.color))
    .slice(0, 6);

  // Resolved dependency assets
  const dependencyAssets = (asset.dependencies ?? [])
    .map((depId) => all.find((a) => a.id === depId))
    .filter((a): a is Asset => Boolean(a));

  const hasUncommercialDep = [asset, ...dependencyAssets].some(
    (a) => a.licenseDetails && !a.licenseDetails.commercialCovered
  );

  const handleZip = async () => {
    setZipping(true);
    try {
      await bundleProjectZip(asset.id);
    } finally {
      setZipping(false);
    }
  };

  return (
    <aside className="flex h-full w-96 shrink-0 flex-col overflow-y-auto border-l border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Inspector & Operations
        </span>
        <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      <div className="p-4 space-y-5">
        <div>
          <Thumb asset={asset} className="aspect-4/3 w-full rounded-xl border border-border" />
          <h2 className="mt-3 text-[15px] font-semibold leading-snug break-all">{asset.name}.{asset.ext}</h2>

          {isOffline && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-2.5 text-xs text-amber-300">
              <HardDrive className="size-4 shrink-0 mt-0.5 text-amber-400 animate-pulse" />
              <div>
                <p className="font-medium">Drive Offline</p>
                <p className="text-[11px] opacity-90">
                  Located on <span className="font-mono text-amber-200">{drive?.name ?? "External Drive"}</span>. Reconnect drive to edit original file.
                </p>
              </div>
            </div>
          )}

          {isDupe(all, asset) && (
            <p className="mt-2 rounded-md border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-[11px] text-destructive-foreground flex items-center gap-1.5">
              <AlertTriangle className="size-3.5 shrink-0" />
              Near-duplicate detected in this vault.
            </p>
          )}

          <div className="mt-3 flex gap-2">
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
              title="Copy Vault URI"
            >
              <Link2 className="size-3.5" />
            </button>
            <button
              onClick={() => {
                if (!asset.hash) {
                  toast.info("No hash calculated for this import");
                  return;
                }
                navigator.clipboard?.writeText(asset.hash);
                toast.success("Hash copied");
              }}
              className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs transition-colors hover:border-primary/50"
              title="Copy File Hash"
            >
              <Copy className="size-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-destructive transition-colors hover:border-destructive/60"
              title="Move to Versioned Trash"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Client Delivery Packaging */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Package className="size-4" /> Client Delivery Packaging
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">1-Click ZIP</span>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Bundles this asset and its {dependencyAssets.length} linked reference(s). Collapses paths to relative so smart objects and fonts never open broken.
          </p>

          {dependencyAssets.length > 0 && (
            <div className="space-y-1 rounded-lg border border-border bg-background p-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Resolved Dependency Graph ({dependencyAssets.length})
              </p>
              {dependencyAssets.map((dep) => (
                <div key={dep.id} className="flex items-center justify-between text-[11px] py-0.5 font-mono">
                  <span className="truncate max-w-[170px] text-foreground">↳ {dep.name}.{dep.ext}</span>
                  <span className={`text-[9px] px-1 rounded ${dep.licenseDetails?.commercialCovered ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/20 text-amber-300"}`}>
                    {dep.license}
                  </span>
                </div>
              ))}
            </div>
          )}

          {hasUncommercialDep && (
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-medium">
              <ShieldAlert className="size-3.5 shrink-0" />
              Warning: Linked asset contains non-commercial license
            </div>
          )}

          <button
            onClick={handleZip}
            disabled={zipping}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#E8A33D] px-3 py-2 text-xs font-semibold text-[#16140F] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Download className="size-3.5" />
            {zipping ? "Packaging ZIP…" : "Bundle & Export Package (.zip)"}
          </button>
        </div>

        {/* 2. License & Usage Tracking */}
        <div className="rounded-xl border border-border bg-background p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              {asset.licenseDetails?.commercialCovered ? (
                <ShieldCheck className="size-4 text-emerald-400" />
              ) : (
                <ShieldAlert className="size-4 text-amber-400" />
              )}
              License & Usage Tracking
            </span>
            <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
              asset.licenseDetails?.commercialCovered ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
            }`}>
              {asset.license}
            </span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Commercial Clearance:</span>
              <span className={`font-semibold ${asset.licenseDetails?.commercialCovered ? "text-emerald-400" : "text-amber-400"}`}>
                {asset.licenseDetails?.commercialCovered ? "Covered" : "Restricted / Risk"}
              </span>
            </div>

            {asset.licenseDetails?.expiryDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Expiry Date:</span>
                <span className="font-mono text-amber-300">{asset.licenseDetails.expiryDate}</span>
              </div>
            )}

            {asset.licenseDetails?.attributionRequired && (
              <div className="space-y-1">
                <span className="text-muted-foreground">Attribution Requirement:</span>
                <p className="rounded border border-border bg-secondary/60 p-1.5 font-mono text-[10px] text-foreground">
                  {asset.licenseDetails.attributionText ?? "Attribution required"}
                </p>
              </div>
            )}

            <div className="pt-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Update License Type
              </label>
              <select
                value={asset.license}
                onChange={(e) => {
                  const type = e.target.value as LicenseType;
                  const commercialCovered = ["commercial", "cc0"].includes(type);
                  onUpdate({
                    license: type,
                    licenseDetails: {
                      ...(asset.licenseDetails ?? { type, commercialCovered }),
                      type,
                      commercialCovered,
                    },
                  });
                }}
                className="w-full rounded-md border border-input bg-surface px-2 py-1.5 text-xs outline-none focus:border-primary/60"
              >
                <option value="commercial">Commercial (Cleared)</option>
                <option value="personal">Personal / Non-commercial</option>
                <option value="cc0">CC0 / Public Domain</option>
                <option value="editorial">Editorial Only</option>
                <option value="unlicensed">Unlicensed</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Font Conflict Detector Metadata (if Font) */}
        {asset.kind === "font" && asset.fontMetadata && (
          <div className="rounded-xl border border-border bg-background p-3.5 space-y-2 text-[12px]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Layers className="size-4 text-primary" /> Font Metrics & Foundry
            </div>
            <Row k="Family" v={asset.fontMetadata.family} />
            <Row k="Foundry" v={asset.fontMetadata.foundry} />
            <Row k="Version" v={asset.fontMetadata.version} />
            <Row k="Units per Em" v={String(asset.fontMetadata.unitsPerEm ?? 1000)} mono />
            <Row k="Metrics Hash" v={asset.fontMetadata.metricsHash} mono />
          </div>
        )}

        {/* 4. Real Embedded Metadata */}
        {asset.embeddedMetadata && (
          <div className="rounded-xl border border-border bg-background p-3.5 space-y-2 text-[12px]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Box className="size-4 text-primary" /> Embedded File Specs
            </div>
            {asset.embeddedMetadata.layerCount !== undefined && <Row k="PSD Layer Count" v={`${asset.embeddedMetadata.layerCount} layers`} mono />}
            {asset.embeddedMetadata.vertexCount !== undefined && <Row k="3D Mesh Vertices" v={asset.embeddedMetadata.vertexCount.toLocaleString()} mono />}
            {asset.embeddedMetadata.sampleRate !== undefined && <Row k="Audio Sample Rate" v={`${asset.embeddedMetadata.sampleRate / 1000} kHz (${asset.embeddedMetadata.bitDepth} bit)`} mono />}
            {asset.embeddedMetadata.colorProfile && <Row k="Color Profile" v={asset.embeddedMetadata.colorProfile} />}
            {asset.embeddedMetadata.cameraModel && <Row k="EXIF Camera" v={asset.embeddedMetadata.cameraModel} />}
            {asset.embeddedMetadata.aperture && <Row k="Aperture / ISO" v={`${asset.embeddedMetadata.aperture} · ISO ${asset.embeddedMetadata.iso}`} mono />}
            {asset.embeddedMetadata.resolution && <Row k="DPI Resolution" v={asset.embeddedMetadata.resolution} mono />}
          </div>
        )}

        {/* 5. Drive-Aware Storage Info */}
        <div className="rounded-xl border border-border bg-background p-3.5 space-y-2 text-[12px]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <HardDrive className="size-4 text-primary" /> Physical Storage Location
          </div>
          <Row k="Volume Name" v={asset.driveInfo?.driveName ?? "Macintosh HD"} />
          <Row k="Mount Path" v={asset.driveInfo?.mountPath ?? "/"} mono />
          <Row k="Relative Path" v={asset.driveInfo?.relativePath ?? asset.name} mono />
        </div>

        {/* Basic File Specs & Info */}
        <dl className="space-y-2 text-[12px] border-t border-border/60 pt-3">
          <Row k="Kind" v={asset.kind.toUpperCase()} />
          <Row k="File Size" v={formatBytes(asset.bytes)} mono />
          {asset.width ? <Row k="Dimensions" v={`${asset.width} × ${asset.height} px`} mono /> : null}
          {asset.duration ? <Row k="Duration" v={`${asset.duration}s`} mono /> : null}
          <Row k="Added" v={relTime(asset.createdAt)} />
          <Row k="Last used" v={relTime(asset.lastUsed)} />
          <Row k="Total Uses" v={String(asset.uses)} mono />
          <Row k="SHA256 Hash" v={asset.hash ? `${asset.hash.slice(0, 14)}…` : "Uncalculated"} mono />
        </dl>

        {/* Palette Color Selection */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Palette override</p>
          <div className="mt-2 flex gap-1.5">
            {COLOR_FAMILIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onUpdate({ color: c.id })}
                className={`size-6 rounded-md border transition-transform hover:scale-110 ${
                  asset.color === c.id ? "border-foreground ring-2 ring-primary/40" : "border-transparent"
                }`}
                style={{ background: c.hex }}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
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

        {/* Notes */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Notes & Instructions</p>
          <textarea
            value={asset.note ?? ""}
            onChange={(e) => onUpdate({ note: e.target.value })}
            placeholder="Usage rights, client notes, project context…"
            rows={3}
            className="mt-2 w-full resize-none rounded-lg border border-input bg-background px-2.5 py-2 text-xs outline-none focus:border-primary/60"
          />
        </div>

        {/* Visually Related */}
        {related.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Visually & Palette Related
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
    <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-1.5">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={`truncate max-w-[190px] ${mono ? "font-mono text-[11px]" : ""}`}>{v}</dd>
    </div>
  );
}

export { colorHex };
