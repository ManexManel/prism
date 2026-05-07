# 🚀 Prism Launch Checklist (J-2 → J-Day)

> Suivre dans l'ordre. Coche au fur et à mesure. Si un truc bloque, **passe au suivant** — tu reviendras dessus.

---

## J-2 — Setup technique (3-4h)

### Domaine + Hosting
- [ ] Acheter `prism.app` (ou `getprism.ai`, `useprism.io`) — Namecheap ~10€/an
- [ ] Compte Vercel (gratuit)
- [ ] `npx vercel` depuis le dossier `parakeet-ai/`
- [ ] Pointer DNS du domaine vers Vercel
- [ ] HTTPS auto-géré par Vercel

### Supabase
- [ ] Créer projet sur supabase.com (gratuit, 500MB DB)
- [ ] SQL Editor → coller `supabase/schema.sql` → Run
- [ ] Settings → API → copier URL + anon key
- [ ] Authentication → Providers → activer Google :
  - Créer OAuth client sur Google Cloud Console
  - Authorized redirect URI : `https://[ton-projet].supabase.co/auth/v1/callback`
  - Coller Client ID + Secret dans Supabase
- [ ] Authentication → URL Configuration :
  - Site URL : `https://prism.app`
  - Redirect URLs : `https://prism.app/auth/callback`

### Gemini
- [ ] aistudio.google.com/apikey → générer clé
- [ ] Quota gratuit : 1 500 requêtes/jour (largement suffisant pour MVP)

### Vercel env vars
Settings → Environment Variables, ajouter :
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `GEMINI_API_KEY`
- [ ] Redeploy

---

## J-1 — Tests + Assets (3h)

### Tests utilisateur (1h)
- [ ] Crée un compte test → vérifie email de confirmation Supabase
- [ ] Lance 6 rewrites (1 par mode) → tous doivent marcher
- [ ] Vérifie que les crédits décrémentent (DB → table profiles)
- [ ] Test mobile (Chrome DevTools → 375px)
- [ ] Test sur Safari + Firefox
- [ ] Vérifie le bouton "Sign out" fonctionne
- [ ] Vérifie que `/workspace` redirige vers `/login` si déconnecté

### Assets visuels (2h)
- [ ] **Logo final** : utiliser le `design` skill ou Figma — triangle violet/indigo, 512×512 PNG transparent
- [ ] **Favicon** : 32×32, fournit le triangle simplifié
- [ ] **OG Image** : 1200×630 — fond noir, logo + "Rewrite your AI prompts in 6 modes" + URL
- [ ] **5 screenshots** pour Product Hunt :
  - 1. Landing hero
  - 2. Workspace (vide)
  - 3. Workspace en cours de rewrite (mode Diagnostic actif)
  - 4. Résultat affiché
  - 5. Page pricing
- [ ] **GIF animé** (5s) : workflow paste → click mode → result. Outil : Kap (Mac) ou ScreenToGif (Windows)

### Analytics
- [ ] Plausible.io (gratuit 30 jours) ou Vercel Analytics (gratuit)
- [ ] Insère le snippet dans `app/layout.tsx` :
```tsx
<script defer data-domain="prism.app" src="https://plausible.io/js/script.js"></script>
```
- [ ] Vérifie que les visites sont trackées

---

## J-Day — Lundi matin

### Avant 9h
- [ ] Vérifie que le site est UP : `curl -I https://prism.app` doit retourner 200
- [ ] Test final : crée un compte + lance 1 rewrite
- [ ] Backup DB : Supabase → Database → Backups
- [ ] Préviens 5 amis pour upvotes initiaux

### 9h00 — Premier post
- [ ] Tweet build-in-public #1 (template `SOCIAL_TEMPLATES.md`)
- [ ] DM à 10 indie hackers connus
- [ ] Pin le tweet

### 11h00 — Reddit
- [ ] r/PromptEngineering (template ready)
- [ ] Espacer de 2h entre subreddits pour éviter le filtre anti-spam

### 13h00 — Hacker News
- [ ] Show HN (titre exact dans templates)
- [ ] Surveille les commentaires — répond à TOUT en <30min

### 17h00 — LinkedIn
- [ ] Post personnel (template ready)
- [ ] Tagger 3 personnes pertinentes

### 20h00 — Récap day 1
- [ ] Tweet : "Day 1 stats: X signups, Y rewrites, Z bugs to fix"
- [ ] Ferme l'ordi 🛌

---

## Bugs courants à surveiller

| Symptom | Cause probable | Fix |
|---------|---------------|-----|
| 401 sur `/api/rewrite` | Cookies pas envoyés | Vérifier `credentials: "include"` dans le fetch |
| 500 Gemini | Quota dépassé | Augmenter quota Gemini ou attendre 24h |
| Email confirmation pas reçu | Supabase template | Vérifier Auth → Email Templates |
| Google OAuth redirect 404 | URL Configuration | Re-checker les redirect URIs Supabase + Google Cloud |
| Crédits jamais décrémentés | RLS policy | `select credits` doit avoir RLS `select for own user` |

---

## Si ça part en flammes

**Si le site crash sous le trafic :**
1. Vercel scale auto, mais la DB Supabase free a une limite de connexions (60)
2. Si trop de signups → supplier Supabase de upgrade gratuit ou migrer sur PlanetScale (gratuit aussi)

**Si les comptes Gemini quota explose :**
1. Crée un 2e compte Google → 2e API key → balance load via env var multiple

**Si tout pète :**
1. Tweet : "Servers melting from your love 🔥 — fix incoming, will email you 50 free credits as apology"
2. → vrai marketing gold ces incidents
