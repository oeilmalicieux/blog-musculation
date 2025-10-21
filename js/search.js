/* Recherche simple sur les 5 pages : extrait un snippet et le surligne */
(function () {
  const PAGES = [
    { url: 'index.html',   title: 'Accueil' },
    { url: 'actus.html',   title: 'Actus' },
    { url: 'articles.html',title: 'Articles' },
    { url: 'faq.html',     title: 'FAQ' },
    { url: 'contact.html', title: 'Contact' }
  ];

  const input = document.getElementById('site-search');
  const btn   = document.getElementById('search-btn');
  const overlay = document.getElementById('search-overlay');
  const closeBtn = document.getElementById('search-close');
  const resultsEl = document.getElementById('search-results');

  function openOverlay() { overlay.hidden = false; }
  function closeOverlay() { overlay.hidden = true; resultsEl.innerHTML=''; }

  function highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')})`, 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  async function search(query) {
    if (!query || query.trim().length < 2) return;
    openOverlay();
    resultsEl.innerHTML = '<li style="padding:1rem">Recherche…</li>';

    const q = query.trim();
    const tasks = PAGES.map(async p => {
      try {
        const res = await fetch(p.url, { cache: 'no-store' });
        const html = await res.text();
        // Texte brut sans balises
        const txt = html.replace(/<script[\\s\\S]*?<\\/script>/gi,' ')
                        .replace(/<style[\\s\\S]*?<\\/style>/gi,' ')
                        .replace(/<[^>]+>/g,' ')
                        .replace(/\\s+/g,' ')
                        .trim();
        const idx = txt.toLowerCase().indexOf(q.toLowerCase());
        if (idx === -1) return null;
        const start = Math.max(0, idx - 80);
        const end   = Math.min(txt.length, idx + 120);
        const snippet = txt.slice(start, end);
        return { ...p, snippet: highlight(snippet, q) };
      } catch { return null; }
    });

    const found = (await Promise.all(tasks)).filter(Boolean);
    resultsEl.innerHTML = found.length
      ? found.map(r => `<li><a href="${r.url}">${r.title}</a><p>${r.snippet}…</p></li>`).join('')
      : '<li style="padding:1rem">Aucun résultat.</li>';
  }

  btn?.addEventListener('click', () => search(input.value));
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') search(input.value); });
  closeBtn?.addEventListener('click', closeOverlay);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });
})();
