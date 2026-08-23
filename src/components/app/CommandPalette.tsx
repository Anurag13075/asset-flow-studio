import { Command } from "cmdk";
import { Layers, Search, Star, Trash2, Sparkles, LayoutGrid, List, BarChart3 } from "lucide-react";
import { Thumb } from "@/components/Thumb";
import type { Asset } from "@/lib/data";

export type PaletteAction = {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Layers;
  run: () => void;
};

export function CommandPalette({
  open, onOpenChange, assets, actions, onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  assets: Asset[];
  actions: PaletteAction[];
  onPick: (a: Asset) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        loop
        className="surface-panel w-full max-w-xl overflow-hidden rounded-2xl animate-in zoom-in-95 slide-in-from-top-2 duration-200"
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search className="size-4 text-muted-foreground" />
          <Command.Input
            autoFocus
            placeholder="Search assets, tags, actions…"
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <Command.List className="max-h-[54vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
            Nothing matched. Try a tag like “hero” or “3d-render”.
          </Command.Empty>

          <Command.Group heading="Actions" className="px-1 pb-2 text-[11px] uppercase tracking-widest text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            {actions.map((a) => (
              <Command.Item
                key={a.id}
                value={`${a.label} ${a.hint ?? ""}`}
                onSelect={() => { a.run(); onOpenChange(false); }}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground data-[selected=true]:bg-secondary"
              >
                <a.icon className="size-4 text-primary" strokeWidth={1.6} />
                <span className="normal-case tracking-normal">{a.label}</span>
                {a.hint && <span className="ml-auto font-mono text-[11px] normal-case tracking-normal text-muted-foreground">{a.hint}</span>}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Assets" className="px-1 text-[11px] uppercase tracking-widest text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            {assets.slice(0, 60).map((a) => (
              <Command.Item
                key={a.id}
                value={`${a.name} ${a.ext} ${a.kind} ${a.tags.join(" ")}`}
                onSelect={() => { onPick(a); onOpenChange(false); }}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm data-[selected=true]:bg-secondary"
              >
                <Thumb asset={a} className="size-7 shrink-0 rounded-md" />
                <span className="truncate normal-case tracking-normal">{a.name}</span>
                <span className="ml-auto font-mono text-[11px] normal-case tracking-normal text-muted-foreground">{a.ext}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

export const PALETTE_ICONS = { Star, Trash2, Sparkles, LayoutGrid, List, BarChart3, Layers };
