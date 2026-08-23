import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

export function Dropzone({ onFiles }: { onFiles: (files: { name: string; bytes: number; lastModified: number }[]) => void }) {
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const ingest = (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const payload = Array.from(files).map((f) => ({ name: f.name, bytes: f.size, lastModified: f.lastModified }));
    setTimeout(() => {
      onFiles(payload);
      setBusy(false);
      toast.success(`Indexed ${payload.length} asset${payload.length > 1 ? "s" : ""}`, {
        description: "Original filename, size, type, and modified date recorded.",
      });
    }, 700);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); ingest(e.dataTransfer.files); }}
      onClick={() => input.current?.click()}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-sm transition-all duration-300 ${
        over ? "border-primary bg-primary/10 text-foreground" : "border-hairline text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      <input ref={input} type="file" multiple hidden onChange={(e) => ingest(e.target.files)} />
      <UploadCloud className={`size-4 ${busy ? "animate-pulse text-primary" : ""}`} />
      <span>{busy ? "Indexing…" : over ? "Release to index" : "Drop files here or click to import"}</span>
      <span className="ml-auto font-mono text-[11px] text-muted-foreground">psd · glb · mov · otf · wav</span>
    </div>
  );
}
