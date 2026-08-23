import { AudioLines, Box, Clapperboard, Image as ImageIcon, PenTool, Type } from "lucide-react";
import { colorHex, type Asset } from "@/lib/data";

const ICONS = {
  image: ImageIcon,
  video: Clapperboard,
  "3d": Box,
  font: Type,
  vector: PenTool,
  audio: AudioLines,
} as const;

function seedNum(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic generated preview — every asset gets a unique, on-brand visual. */
export function Thumb({ asset, className = "" }: { asset: Asset; className?: string }) {
  const Icon = ICONS[asset.kind];
  const hex = colorHex(asset.color);
  const n = seedNum(asset.id);
  const angle = n % 360;
  const variant = n % 4;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at ${20 + (n % 60)}% ${10 + (n % 40)}%, ${hex}55, transparent 62%), linear-gradient(${angle}deg, oklch(0.22 0.008 60), oklch(0.17 0.006 60))`,
      }}
    >
      {variant === 0 && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(${angle}deg, ${hex}22 0 2px, transparent 2px 12px)`,
          }}
        />
      )}
      {variant === 1 && (
        <div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
          style={{ background: hex, opacity: 0.5 }}
        />
      )}
      {variant === 2 && (
        <div
          className="absolute inset-4 rounded-md border"
          style={{ borderColor: `${hex}66`, transform: `rotate(${(n % 20) - 10}deg)` }}
        />
      )}
      {variant === 3 && (
        <div className="absolute inset-0 flex items-end gap-[3px] p-4 opacity-60">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${12 + ((n >> i) % 70)}%`, background: `${hex}99` }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="size-7 text-foreground/70" strokeWidth={1.25} />
      </div>
    </div>
  );
}
