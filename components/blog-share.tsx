"use client";
import { useState } from "react";
import { copyArticleLink } from "@/lib/blog-core.mjs";

export function BlogShare({url,title,locale}:{url:string;title:string;locale:string}) {
  const fr=locale === "fr";
  const [status,setStatus]=useState("");
  const [fallback,setFallback]=useState(false);
  async function copy() {
    const copied=await copyArticleLink(url);
    setFallback(!copied);
    setStatus(copied ? (fr ? "Lien copié." : "Link copied.") : (fr ? "Copie automatique indisponible. Sélectionnez et copiez le lien ci-dessous." : "Automatic copying is unavailable. Select and copy the link below."));
  }
  const control="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400";
  return <section aria-label={fr ? "Partager cet article" : "Share this article"} className="mt-8">
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={copy} className={control}>{fr ? "Copier le lien" : "Copy link"}</button>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={control}>{fr ? "Partager sur LinkedIn" : "Share on LinkedIn"}</a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} className={control}>{fr ? "Partager par e-mail" : "Share by email"}</a>
    </div>
    <p role="status" aria-live="polite" className="mt-3 text-sm text-text-secondary">{status}</p>
    {fallback && <label className="block text-sm mt-3">{fr ? "Lien de l’article" : "Article link"}<input readOnly value={url} onFocus={event=>event.currentTarget.select()} className="block mt-2 w-full rounded-lg border border-white/20 bg-base p-3 text-text-primary" /></label>}
  </section>;
}
