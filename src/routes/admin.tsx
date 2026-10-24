import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LogOut, Upload } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PAGES, RATIOS, type Field, type PageId } from "@/lib/content-fields";
import { contentQueryKey } from "@/hooks/use-content";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — AAVYA GLOBEX" },
      { name: "description", content: "Edit website text, photos and videos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — AAVYA GLOBEX" },
      { property: "og:description", content: "Website content editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) {
        const { data: ok } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
        setIsAdmin(Boolean(ok));
      } else setIsAdmin(false);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT") check();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });
  };
  const signOut = () => supabase.auth.signOut();

  if (user === undefined) return <p className="container-site py-24 text-muted-foreground">Loading…</p>;

  if (!user)
    return (
      <section className="container-site max-w-md py-24 text-center">
        <h1 className="display text-5xl text-primary">Admin</h1>
        <p className="mt-4 text-muted-foreground">Sign in with an authorised Google account to edit the website.</p>
        <button onClick={signIn} className="mt-8 bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
          Continue with Google
        </button>
      </section>
    );

  if (!isAdmin)
    return (
      <section className="container-site max-w-md py-24 text-center">
        <h1 className="display text-4xl text-primary">Access denied</h1>
        <p className="mt-4 text-muted-foreground">{user.email} is not authorised to edit this website.</p>
        <button onClick={signOut} className="mt-8 border border-border px-6 py-3 font-semibold">Sign out</button>
      </section>
    );

  return <Editor email={user.email ?? ""} onSignOut={signOut} />;
}

function Editor({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [page, setPage] = useState<PageId>("home");
  const qc = useQueryClient();
  const { data: rows = [] } = useQuery({
    queryKey: contentQueryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("page,key,value");
      if (error) throw error;
      return data;
    },
  });
  const current = PAGES.find((p) => p.id === page)!;

  return (
    <section className="container-site py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-5xl text-primary">Website editor</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {email}
          <button onClick={onSignOut} className="flex items-center gap-1.5 border border-border px-3 py-2 text-primary">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {PAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${page === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5">
        {current.fields.map((f) => (
          <FieldEditor
            key={`${page}-${f.key}`}
            page={page}
            field={f}
            saved={rows.find((r) => r.page === page && r.key === f.key)?.value ?? ""}
            savedSize={rows.find((r) => r.page === page && r.key === `${f.key}__size`)?.value ?? ""}
            savedFit={rows.find((r) => r.page === page && r.key === `${f.key}__fit`)?.value ?? ""}
            rows={rows}
            onSaved={() => qc.invalidateQueries({ queryKey: contentQueryKey })}
          />
        ))}
      </div>
    </section>
  );
}

function FieldEditor({ page, field, saved, savedSize, savedFit, rows, onSaved }: { page: PageId; field: Field; saved: string; savedSize: string; savedFit: string; rows: { page: string; key: string; value: string }[]; onSaved: () => void }) {
  const get = (k: string, d: string) => rows.find((r) => r.page === page && r.key === `${field.key}__${k}`)?.value || d;
  const sRatio = get("ratio", "auto"), sX = get("x", "50"), sY = get("y", "50"), sZoom = get("zoom", "100");
  const [size, setSize] = useState(Number(savedSize) || 100);
  const [fit, setFit] = useState(savedFit || "cover");
  const [ratio, setRatio] = useState(sRatio);
  const [cx, setCx] = useState(Number(sX));
  const [cy, setCy] = useState(Number(sY));
  const [zoom, setZoom] = useState(Number(sZoom));
  useEffect(() => setSize(Number(savedSize) || 100), [savedSize]);
  useEffect(() => setFit(savedFit || "cover"), [savedFit]);
  useEffect(() => { setRatio(sRatio); setCx(Number(sX)); setCy(Number(sY)); setZoom(Number(sZoom)); }, [sRatio, sX, sY, sZoom]);
  const saveDisplay = async () => {
    setStatus("Saving…");
    const now = new Date().toISOString();
    const { error } = await supabase.from("site_content").upsert(
      ([["size", String(size)], ["fit", fit], ["ratio", ratio], ["x", String(cx)], ["y", String(cy)], ["zoom", String(zoom)]] as const).map(([k, v]) => ({ page, key: `${field.key}__${k}`, value: v, updated_at: now })),
    );
    setStatus(error ? `Error: ${error.message}` : "Saved");
    if (!error) onSaved();
  };
  const previewStyle: React.CSSProperties = {
    width: "100%", height: "100%", objectFit: fit === "contain" ? "contain" : "cover",
    objectPosition: `${cx}% ${cy}%`, transform: zoom > 100 ? `scale(${zoom / 100})` : undefined, transformOrigin: `${cx}% ${cy}%`,
  };
  const [value, setValue] = useState(saved || field.default);
  const [status, setStatus] = useState("");
  useEffect(() => setValue(saved || field.default), [saved, field.default]);

  const save = async (v: string) => {
    setStatus("Saving…");
    const { error } = await supabase.from("site_content").upsert({ page, key: field.key, value: v, updated_at: new Date().toISOString() });
    setStatus(error ? `Error: ${error.message}` : "Saved");
    if (!error) onSaved();
  };

  const upload = async (file: File) => {
    setStatus("Uploading…");
    const path = `${page}/${field.key}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: true });
    if (error) return setStatus(`Error: ${error.message}`);
    const { data, error: e2 } = await supabase.storage.from("site-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (e2 || !data) return setStatus(`Error: ${e2?.message}`);
    setValue(data.signedUrl);
    await save(data.signedUrl);
  };

  const media = field.type === "image" || field.type === "video";
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-primary">{field.label}</label>
        <span className="text-xs text-muted-foreground">{status}</span>
      </div>
      {media ? (
        <div className="mt-3 flex flex-wrap items-center gap-5">
          {field.type === "image" ? (
            <img src={value} alt="" className="h-28 w-40 object-cover" />
          ) : (
            <video key={value} src={value} muted loop autoPlay playsInline className="h-28 w-48 object-cover" />
          )}
          <label className="flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-sm font-medium">
            <Upload className="h-4 w-4" /> Replace {field.type}
            <input type="file" accept={field.type === "image" ? "image/*" : "video/*"} className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
          {saved && <button onClick={() => { setValue(field.default); save(""); }} className="text-sm text-muted-foreground underline">Restore original</button>}
          <div className="flex w-full flex-wrap items-end gap-5 border-t border-border pt-4">
            <label className="flex flex-col gap-1 text-sm">
              <span>Size on the website: <b>{size}%</b></span>
              <input type="range" min={40} max={180} step={5} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-64 accent-primary" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>How it fills the space</span>
              <select value={fit} onChange={(e) => setFit(e.target.value)} className="border border-input bg-background p-2">
                <option value="cover">Fill the space (may crop edges)</option>
                <option value="contain">Show the whole {field.type}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Shape (layout)</span>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="border border-input bg-background p-2">
                {RATIOS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </label>
          </div>
          <div className="flex w-full flex-wrap items-start gap-6">
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Crop preview</span>
              <div className="overflow-hidden border border-border bg-secondary" style={{ width: 240, aspectRatio: ratio === "auto" ? "16/9" : ratio, maxHeight: 320 }}>
                {field.type === "image" ? <img src={value} alt="" style={previewStyle} /> : <video key={value} src={value} muted loop autoPlay playsInline style={previewStyle} />}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-medium">Crop manually</span>
              <label className="flex flex-col gap-1"><span>Zoom in: <b>{zoom}%</b></span>
                <input type="range" min={100} max={300} step={5} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-64 accent-primary" /></label>
              <label className="flex flex-col gap-1"><span>Move left ↔ right: <b>{cx}%</b></span>
                <input type="range" min={0} max={100} value={cx} onChange={(e) => setCx(Number(e.target.value))} className="w-64 accent-primary" /></label>
              <label className="flex flex-col gap-1"><span>Move up ↕ down: <b>{cy}%</b></span>
                <input type="range" min={0} max={100} value={cy} onChange={(e) => setCy(Number(e.target.value))} className="w-64 accent-primary" /></label>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-5">
            <button onClick={saveDisplay} className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save size, shape &amp; crop</button>
            <button onClick={() => { setSize(100); setFit("cover"); setRatio("auto"); setCx(50); setCy(50); setZoom(100); }} className="text-sm text-muted-foreground underline">Reset all</button>
          </div>
        </div>
      ) : field.type === "select" ? (
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <select value={value} onChange={(e) => { setValue(e.target.value); save(e.target.value); }} className="border border-input bg-background p-2">
            {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      ) : (
        <div className="mt-3">
          {field.type === "longtext" ? (
            <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={3} className="w-full border border-input bg-background p-3" />
          ) : (
            <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-input bg-background p-3" />
          )}
          <div className="mt-2 flex gap-4">
            <button onClick={() => save(value)} className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save</button>
            {saved && <button onClick={() => { setValue(field.default); save(""); }} className="text-sm text-muted-foreground underline">Restore original</button>}
          </div>
        </div>
      )}
    </div>
  );
}
