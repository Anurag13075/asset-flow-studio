import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, Boxes, Check, ChevronDown, Command, Grid2X2, List, LogOut, Moon, Sun, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { AssetGrid, AssetList } from "@/components/app/AssetGrid";
import { CommandPalette, PALETTE_ICONS, type PaletteAction } from "@/components/app/CommandPalette";
import { DetailPanel } from "@/components/app/DetailPanel";
import { Dropzone } from "@/components/app/Dropzone";
import { Insights } from "@/components/app/Insights";
import { HandoffBuilder } from "@/components/app/HandoffBuilder";
import { Sidebar, type SmartView } from "@/components/app/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme";
import { KINDS, type Asset } from "@/lib/data";
import { isFreeAccessEmail, useHotkey, useStore } from "@/lib/store";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Library — screenfast" }, { name: "description", content: "Your screenfast asset library." }] }),
  component: LibraryPage,
});

function LibraryPage() {
  const { ready, user, paid, assets, collections, signOut, updateAsset, removeAssets, addAssets, addCollection } = useStore();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState<{ view: SmartView; collection: string | null }>({ view: "all", collection: null });
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [color, setColor] = useState("all");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tab, setTab] = useState<"library" | "insights">("library");
  const [handoffIds, setHandoffIds] = useState<string[]>([]);

  useEffect(() => { if (ready && !user) navigate({ to: "/auth" }); }, [ready, user, navigate]);
  useHotkey((e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k", () => setPaletteOpen(true));

  const visible = useMemo(() => assets.filter((asset) => {
    const normalized = query.trim().toLowerCase();
    const baseName = asset.name.replace(/-(copy|v\d|final|alt)$/, "");
    const inView = active.collection ? asset.collection === active.collection : active.view === "favorites" ? asset.favorite : active.view === "unused" ? asset.uses === 0 : active.view === "duplicates" ? assets.filter((other) => other.kind === asset.kind && other.name.replace(/-(copy|v\d|final|alt)$/, "") === baseName).length > 1 : active.view === "recent" ? Date.now() - Date.parse(asset.createdAt) < 30 * 864e5 : true;
    return inView && (!normalized || `${asset.name} ${asset.ext} ${asset.kind} ${asset.tags.join(" ")}`.toLowerCase().includes(normalized)) && (kind === "all" || asset.kind === kind) && (color === "all" || asset.color === color);
  }), [active, assets, color, kind, query]);

  const actions: PaletteAction[] = [
    { id: "grid", label: "Show grid", icon: PALETTE_ICONS.LayoutGrid, run: () => setLayout("grid") },
    { id: "list", label: "Show list", icon: PALETTE_ICONS.List, run: () => setLayout("list") },
    { id: "insights", label: "Open insights", icon: PALETTE_ICONS.BarChart3, run: () => setTab("insights") },
    { id: "theme-dark", label: "Switch to Dark Theme", icon: Moon, run: () => setTheme("dark") },
    { id: "theme-light", label: "Switch to Light Theme", icon: Sun, run: () => setTheme("light") },
    { id: "clear", label: "Clear filters", icon: PALETTE_ICONS.Layers, run: () => { setQuery(""); setKind("all"); setColor("all"); } },
  ];

  const toggleHandoffAsset = (id: string) => {
    setHandoffIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const checkoutUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL as string | undefined;
  const hasAccess = paid || isFreeAccessEmail(user?.email ?? "");
  const startCheckout = () => {
    if (!checkoutUrl) { toast.error("Checkout is not configured", { description: "Add VITE_POLAR_CHECKOUT_URL to your environment." }); return; }
    window.location.assign(checkoutUrl);
  };

  if (!ready || !user) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading vault…</div>;
  if (!hasAccess) return <Paywall email={user.email} onCheckout={startCheckout} onSignOut={() => { signOut(); navigate({ to: "/" }); }} />;

  return <div className="flex h-screen min-h-[620px] overflow-hidden bg-background">
    <Sidebar collections={collections} assets={assets} active={active} onSelect={(next) => { setActive(next); setSelected(null); setTab("library"); }} onAddCollection={addCollection} />
    <main className="min-w-0 flex-1 overflow-y-auto">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-3 backdrop-blur-xl lg:px-7"><div className="flex items-center gap-3"><Link to="/" className="mr-1 flex items-center gap-2 lg:hidden"><span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground"><Boxes className="size-4" /></span></Link><div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1"><TabButton active={tab === "library"} onClick={() => setTab("library")}>Library</TabButton><TabButton active={tab === "insights"} onClick={() => setTab("insights")}>Insights</TabButton></div><div className="ml-auto flex items-center gap-2"><ThemeToggle /><button onClick={() => setPaletteOpen(true)} className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground sm:flex"><Search className="size-3.5" />Search vault <kbd className="ml-3 rounded border border-border px-1 font-mono text-[10px]"><Command className="inline size-2.5" /> K</kbd></button><button onClick={() => { signOut(); navigate({ to: "/" }); }} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Sign out"><LogOut className="size-4" /></button></div></div></header>
      <div className="mx-auto max-w-[1500px] p-5 lg:p-7">{tab === "insights" ? <Insights assets={assets} /> : <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{active.collection ? collections.find((c) => c.id === active.collection)?.name : active.view === "all" ? "Workspace" : active.view}</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">{visible.length.toLocaleString()} assets</h1></div><div className="flex items-center gap-2"><button onClick={() => setLayout("grid")} className={`rounded-lg border p-2 ${layout === "grid" ? "border-primary/50 bg-secondary" : "border-border text-muted-foreground"}`} aria-label="Grid view"><Grid2X2 className="size-4" /></button><button onClick={() => setLayout("list")} className={`rounded-lg border p-2 ${layout === "list" ? "border-primary/50 bg-secondary" : "border-border text-muted-foreground"}`} aria-label="List view"><List className="size-4" /></button></div></div><div className="mt-5"><Dropzone onFiles={addAssets} /></div><div className="mt-4 flex flex-wrap items-center gap-2"><div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-input bg-surface px-3 py-2"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, tag, or type" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X className="size-3.5 text-muted-foreground" /></button>}</div><Filter value={kind} onChange={setKind} options={["all", ...KINDS]} /><Filter value={color} onChange={setColor} options={["all", "amber", "crimson", "teal", "lime", "violet", "slate", "ink"]} /><button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-secondary" aria-label="Filter options"><SlidersHorizontal className="size-4" /></button></div><HandoffBuilder assets={visible} selectedIds={handoffIds} onToggle={toggleHandoffAsset} onClear={() => setHandoffIds([])} /><div className="mt-5">{visible.length === 0 ? <div className="surface-panel rounded-xl p-12 text-center text-sm text-muted-foreground">No assets match these filters.</div> : layout === "grid" ? <AssetGrid assets={visible} selectedId={selected?.id ?? null} onSelect={setSelected} onToggleFavorite={(a) => updateAsset(a.id, { favorite: !a.favorite })} /> : <AssetList assets={visible} selectedId={selected?.id ?? null} onSelect={setSelected} />}</div></>}</div>
    </main>
    {selected && <DetailPanel asset={selected} all={assets} onClose={() => setSelected(null)} onUpdate={(patch) => { updateAsset(selected.id, patch); setSelected({ ...selected, ...patch }); }} onDelete={() => { removeAssets([selected.id]); setSelected(null); toast.success("Asset removed"); }} />}
    <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} assets={assets} actions={actions} onPick={setSelected} />
  </div>;
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) { return <button onClick={onClick} className={`rounded-md px-3 py-1.5 text-xs font-medium ${active ? "bg-secondary text-foreground" : "text-muted-foreground"}`}>{children}</button>; }
function Filter({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) { return <label className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none rounded-lg border border-border bg-surface py-2 pl-3 pr-8 text-xs capitalize outline-none focus:border-primary/60">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3 text-muted-foreground" /></label>; }
function Paywall({ email, onCheckout, onSignOut }: { email: string; onCheckout: () => void; onSignOut: () => void }) { return <main className="grid min-h-screen place-items-center px-6 py-16"><div className="surface-panel w-full max-w-md rounded-2xl p-8 text-center"><div className="mx-auto grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" /></div><p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-primary">screenfast lifetime access</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Your vault is ready.</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Unlock the full local-first library for a single $2 payment. No subscription, no usage limits.</p><ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">{["Unlimited assets and collections", "Duplicate radar and insights", "All future updates included"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</li>)}</ul><button onClick={onCheckout} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5">Unlock for $2 <Sparkles className="size-4" /></button><p className="mt-3 text-[11px] text-muted-foreground">Signed in as {email}</p><button onClick={onSignOut} className="mt-5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Sign out</button></div></main>; }
