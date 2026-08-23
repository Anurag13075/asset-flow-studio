import { AudioLines, Box, Clapperboard, Image as ImageIcon, PenTool, Type } from "lucide-react";
import { type Asset } from "@/lib/data";

const ICONS = {
  image: ImageIcon,
  video: Clapperboard,
  "3d": Box,
  font: Type,
  vector: PenTool,
  audio: AudioLines,
} as const;

/** A neutral local placeholder until a real file preview is decoded. */
export function Thumb({ asset, className = "" }: { asset: Asset; className?: string }) {
  const Icon = ICONS[asset.kind];

  return (
    <div className={`relative grid place-items-center overflow-hidden bg-secondary/70 ${className}`}>
      <Icon className="size-7 text-foreground/55" strokeWidth={1.25} />
    </div>
  );
}
