import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3, Boxes, Check, ChevronDown, Command, FileText, Grid2X2, HardDrive, List, LogOut,
  Moon, Sun, Search, ShieldAlert, SlidersHorizontal, Sparkles, Trash2, X, RotateCcw, Package,
} from "lucide-react";
import { toast } from "sonner";
import { AssetGrid, AssetList } from "@/components/app/AssetGrid";
import { CommandPalette, PALETTE_ICONS, type PaletteAction } from "@/components/app/CommandPalette";
import { DetailPanel } from "@/components/app/DetailPanel";
import { Dropzone } from "@/components/app/Dropzone";
import { Insights } from "@/components/app/Insights";
import { Sidebar, type SmartView } from "@/components/app/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme";
import { KINDS, type Asset } from "@/lib/data";
import { isFreeAccessEmail, useHotkey, useStore } from "@/lib/store";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Library — Vaultgrid" }, { name: "description", content: "Your Vaultgrid asset library." }] }),
  component: LibraryPage,
});

function LibraryPage() {
  const {
    ready, user, paid, assets, trash, drives, fontConflicts, collections, signOut,
    updateAsset, softDeleteAssets, restoreAssets, permanentlyDeleteAssets, addAssets, addCollection, exportContactSheetPDF,
  } = useStore();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState<{ view: SmartView; collection: string | null }>({ view: "all", collection: null });
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [color, setColor] = useState("all");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [driveFilter, setDriveFilter] = useState("all");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tab, setTab] = useState<"library" | "insights">("library");

  useEffect(() => { if (ready && !user) navigate({ to: "/auth" }); }, [ready, user, navigate]);
  useHotkey((e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k", () => setPaletteOpen(true));

  const visible = useMemo(() => {
    if (active.view === "trash") return [];
    return assets.filter((asset) => {
      const normalized = query.trim().toLowerCase();
      const baseName = asset.name.replace(/-(copy|v\d|final|alt)$/, "");

      let inView = true;
      if (active.collection) {
        inView = asset.collection === active.collection;
      } else if (active.view === "favorites") {
        inView = Boolean(asset.favorite);
      } else if (active.view === "unused") {
        inView = asset.uses === 0;
      } else if (active.view === "duplicates") {
        inView = assets.filter((other) => other.kind === asset.kind && other.name.replace(/-(copy|v\d|final|alt)$/, "") === baseName).length > 1;
      } else if (active.view === "recent") {
        inView = Date.now() - Date.parse(asset.createdAt) < 30 * 864e5;
      } else if (active.view === "font-conflicts") {
        inView = fontConflicts.some((g) => g.assets.some((a) => a.id === asset.id));
      }

      const matchQuery = !normalized || `${asset.name} ${asset.ext} ${asset.kind} ${asset.tags.join(" ")} ${asset.fontMetadata?.family ?? ""} ${asset.embeddedMetadata?.cameraModel ?? ""} ${asset.driveInfo?.driveName ?? ""}`.toLowerCase().includes(normalized);
      const matchKind = kind === "all" || asset.kind === kind;
      const matchColor = color === "all" || asset.color === color;
      const matchLicense = licenseFilter === "all" || asset.license === licenseFilter;
      const matchDrive = driveFilter === "all" || asset.driveInfo?.driveId === driveFilter;

      return inView && matchQuery && matchKind && matchColor && matchLicense && matchDrive;
    });
  }, [active, assets, color, driveFilter, fontConflicts, kind, licenseFilter, query]);

  const actions: PaletteAction[] = [
    { id: "grid", label: "Show grid", icon: PALETTE_ICONS.LayoutGrid, run: () => setLayout("grid") },
    { id: "list", label: "Show list", icon: PALETTE_ICONS.List, run: () => setLayout("list") },
    { id: "insights", label: "Open insights", icon: PALETTE_ICONS.BarChart3, run: () => setTab("insights") },
    { id: "contact-sheet", label: "Export Contact Sheet (PDF)", icon: FileText, run: () => exportContactSheetPDF(visible) },
    { id: "theme-dark", label: "Switch to Dark Theme", icon: Moon, run: () => setTheme("dark") },
    { id: "theme-light", label: "Switch to Light Theme", icon: Sun, run: () => setTheme("light") },
    { id: "clear", label: "Clear filters", icon: PALETTE_ICONS.Layers, run: () => { setQuery(""); setKind("all"); setColor("all"); setLicenseFilter("all"); setDriveFilter("all"); } },
  ];

  const checkoutUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL as string | undefined;
  const hasAccess = paid || isFreeAccessEmail(user?.email ?? "");
  const startCheckout = () => {
    if (!checkoutUrl) { toast.error("Checkout is not configured", { description: "Add VITE_POLAR_CHECKOUT_URL to your environment." }); return; }
    window.location.assign(checkoutUrl);
  };

  if (!ready || !user) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading vault…</div>;
  if (!hasAccess) return <Paywall email={user.email} onCheckout={startCheckout} onSignOut={() => { signOut(); navigate({ to: "/" }); }} />;

  const handleSoftDelete = (asset: Asset) => {
    softDeleteAssets([asset.id]);
    setSelected(null);
    toast("Moved to Versioned Trash", {
      description: `${asset.name}.${asset.ext} can be restored anytime`,
      action: {
        label: "Undo",
        onClick: () => restoreAssets([asset.id]),
      },
    });
  };

  return <div className="flex h-screen min-h-[620px] overflow-hidden bg-background">
    <Sidebar collections={collections} assets={assets} active={active} onSelect={(next) => { setActive(next); setSelected(null); setTab("library"); }} onAddCollection={addCollection} />
    <main className="min-w-0 flex-1 overflow-y-auto">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-3 backdrop-blur-xl lg:px-7">
        <div className="flex items-center gap-3">
          <Link to="/" className="mr-1 flex items-center gap-2 lg:hidden">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground"><Boxes className="size-4" /></span>
          </Link>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
            <TabButton active={tab === "library"} onClick={() => setTab("library")}>Library</TabButton>
            <TabButton active={tab === "insights"} onClick={() => setTab("insights")}>Insights</TabButton>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => exportContactSheetPDF(visible)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground font-medium hover:border-primary/50 transition-colors"
              title="Generate clean client handoff contact sheet PDF"
            >
              <FileText className="size-3.5 text-primary" /> Export Contact Sheet
            </button>
            <ThemeToggle />
            <button onClick={() => setPaletteOpen(true)} className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground sm:flex">
              <Search className="size-3.5" />Search vault <kbd className="ml-3 rounded border border-border px-1 font-mono text-[10px]"><Command className="inline size-2.5" /> K</kbd>
            </button>
            <button onClick={() => { signOut(); navigate({ to: "/" }); }} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Sign out">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] p-5 lg:p-7">
        {tab === "insights" ? (
          <Insights assets={assets} />
        ) : active.view === "trash" ? (
          <TrashView trash={trash} onRestore={restoreAssets} onPermanentDelete={permanentlyDeleteAssets} />
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {active.collection ? collections.find((c) => c.id === active.collection)?.name : active.view === "all" ? "Workspace" : active.view.replace("-", " ")}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                  {visible.length.toLocaleString()} assets
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setLayout("grid")} className={`rounded-lg border p-2 ${layout === "grid" ? "border-primary/50 bg-secondary" : "border-border text-muted-foreground"}`} aria-label="Grid view"><Grid2X2 className="size-4" /></button>
                <button onClick={() => setLayout("list")} className={`rounded-lg border p-2 ${layout === "list" ? "border-primary/50 bg-secondary" : "border-border text-muted-foreground"}`} aria-label="List view"><List className="size-4" /></button>
              </div>
            </div>

            {/* Banner for Font Conflicts */}
            {active.view === "font-conflicts" && fontConflicts.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                  <ShieldAlert className="size-4 text-amber-400" /> Font Conflict Radar Active
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Vaultgrid detected multiple installed versions of font families with differing foundries or metrics hashes. This causes text reflow bugs when opening projects on different designer or client machines.
                </p>
                <div className="space-y-2">
                  {fontConflicts.map((c) => (
                    <div key={c.familyName} className="rounded-lg border border-amber-500/20 bg-background/80 p-3 text-xs">
                      <div className="font-semibold text-foreground">Family: {c.familyName} ({c.assets.length} versions found)</div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-muted-foreground font-mono">
                        <span>Foundries: {c.foundries.join(" vs ")}</span>
                        <span>·</span>
                        <span>Metrics hashes: {c.metricsHashes.join(" vs ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5"><Dropzone onFiles={addAssets} /></div>

            {/* Filter controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-input bg-surface px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search metadata, EXIF, fonts, layers..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X className="size-3.5 text-muted-foreground" /></button>}
              </div>

              <Filter value={kind} onChange={setKind} options={["all", ...KINDS]} label="Type" />
              <Filter value={color} onChange={setColor} options={["all", "amber", "crimson", "teal", "lime", "violet", "slate", "ink"]} label="Color" />
              <Filter value={licenseFilter} onChange={setLicenseFilter} options={["all", "commercial", "personal", "cc0", "editorial"]} label="License" />
              <Filter
                value={driveFilter}
                onChange={setDriveFilter}
                options={["all", ...drives.map((d) => d.id)]}
                labels={Object.fromEntries([["all", "All Drives"], ...drives.map((d) => [d.id, d.name])])}
                label="Drive"
              />

              <button
                onClick={() => { setQuery(""); setKind("all"); setColor("all"); setLicenseFilter("all"); setDriveFilter("all"); }}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-secondary"
                aria-label="Clear all filters"
                title="Clear all filters"
              >
                <SlidersHorizontal className="size-4" />
              </button>
            </div>

            <div className="mt-5">
              {visible.length === 0 ? (
                <div className="surface-panel rounded-xl p-12 text-center text-sm text-muted-foreground">
                  No assets match these filters.
                </div>
              ) : layout === "grid" ? (
                <AssetGrid assets={visible} selectedId={selected?.id ?? null} onSelect={setSelected} onToggleFavorite={(a) => updateAsset(a.id, { favorite: !a.favorite })} />
              ) : (
                <AssetList assets={visible} selectedId={selected?.id ?? null} onSelect={setSelected} />
              )}
            </div>
          </>
        )}
      </div>
    </main>

    {selected && (
      <DetailPanel
        asset={selected}
        all={assets}
        onClose={() => setSelected(null)}
        onUpdate={(patch) => { updateAsset(selected.id, patch); setSelected({ ...selected, ...patch }); }}
        onDelete={() => handleSoftDelete(selected)}
      />
    )}

    <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} assets={assets} actions={actions} onPick={setSelected} />
  </div>;
}

function TrashView({
  trash, onRestore, onPermanentDelete,
}: {
  trash: Asset[];
  onRestore: (ids: string[]) => void;
  onPermanentDelete: (ids: string[]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Versioned Trash</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{trash.length} deleted assets recoverable</h1>
        </div>
        {trash.length > 0 && (
          <button
            onClick={() => onPermanentDelete(trash.map((t) => t.id))}
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20"
          >
            Empty Trash Permanently
          </button>
        )}
      </div>

      {trash.length === 0 ? (
        <div className="surface-panel rounded-xl p-12 text-center text-sm text-muted-foreground">
          Trash is empty. Deleting files inside Vaultgrid soft-deletes them here first for instant recovery.
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {trash.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-surface p-3 space-y-2">
              <p className="truncate text-xs font-medium text-foreground">{item.name}.{item.ext}</p>
              <p className="text-[10px] text-muted-foreground font-mono">Deleted: {item.deletedAt ? new Date(item.deletedAt).toLocaleTimeString() : "recently"}</p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => { onRestore([item.id]); toast.success(`Restored ${item.name}.${item.ext}`); }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-medium hover:border-primary/50"
                >
                  <RotateCcw className="size-3 text-primary" /> Restore
                </button>
                <button
                  onClick={() => onPermanentDelete([item.id])}
                  className="rounded-md border border-border p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  title="Delete permanently"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) { return <button onClick={onClick} className={`rounded-md px-3 py-1.5 text-xs font-medium ${active ? "bg-secondary text-foreground" : "text-muted-foreground"}`}>{children}</button>; }
function Filter({ value, onChange, options, labels, label }: { value: string; onChange: (value: string) => void; options: string[]; labels?: Record<string, string>; label?: string }) { return <label className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none rounded-lg border border-border bg-surface py-2 pl-3 pr-8 text-xs capitalize outline-none focus:border-primary/60">{options.map((option) => <option key={option} value={option}>{labels?.[option] ?? (option === "all" ? `All ${label ?? ""}` : option)}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-muted-foreground" /></label>; }
function Paywall({ email, onCheckout, onSignOut }: { email: string; onCheckout: () => void; onSignOut: () => void }) { return <main className="grid min-h-screen place-items-center px-6 py-16"><div className="surface-panel w-full max-w-md rounded-2xl p-8 text-center"><div className="mx-auto grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" /></div><p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-primary">Vaultgrid lifetime access</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Your vault is ready.</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Unlock the full local-first library for a single $2 payment. No subscription, no usage limits.</p><ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">{["Unlimited assets and collections", "Client delivery packaging & ZIP exporter", "Font conflict detector & license radar", "All future updates included"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</li>)}</ul><button onClick={onCheckout} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5">Unlock for $2 <Sparkles className="size-4" /></button><p className="mt-3 text-[11px] text-muted-foreground">Signed in as {email}</p><button onClick={onSignOut} className="mt-5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Sign out</button></div></main>; }
