# 🔥 Plan Ultra-Stratégique 0€ — Prism

> **Contraintes :** 0 euro, 0 carte bancaire, 0 outil payant.
> **Objectif :** Valider qu'il y a un MARCHÉ avant de dépenser un centime sur un domaine.
> **Stratégie :** Validation > Marketing > Cash. Dans cet ordre.

---

## 🎯 PHASE 0 — Déploiement gratuit (1h, AUJOURD'HUI)

### Étape 1 : Push sur GitHub (15 min)

1. Aller sur **github.com** → bouton vert "New repository"
2. Nom : `prism` — Description : "AI prompt rewriter, 6 modes" — **Public** (gratuit) ou Private
3. NE PAS cocher "Initialize with README" (on a déjà un repo local)
4. Clique "Create repository"
5. Sur la page suivante, GitHub te montre les commandes. Copie-colle dans ton terminal :

```bash
cd "C:/Users/HP/Downloads/parakeet-ai"
git remote add origin https://github.com/TON_USERNAME/prism.git
git push -u origin main
```

(GitHub te demandera de te connecter — utilise un Personal Access Token si demandé : Settings → Developer settings → Personal access tokens → Generate new token (classic) → coche `repo` → copie le token et utilise-le comme mot de passe.)

### Étape 2 : Supabase gratuit (15 min)

1. Va sur **supabase.com** → "Start your project" → connecte avec GitHub
2. Crée un projet :
   - Name : `prism`
   - Database password : **génère et SAUVEGARDE**
   - Region : choisis le plus proche (Frankfurt si tu es en Europe)
   - Pricing plan : **Free** (500MB DB, 50k MAU, c'est bien assez)
3. Attends 2 min que ça setup
4. Va dans **SQL Editor** → "New query" → colle le contenu de `supabase/schema.sql` → clique "Run"
5. Va dans **Settings → API** → copie ces 2 valeurs (tu en auras besoin pour Vercel) :
   - `Project URL`
   - `anon public key`

### Étape 3 : Gemini API gratuite (5 min)

1. Va sur **aistudio.google.com/apikey** → connecte avec ton compte Google
2. Clique "Create API key" → "Create API key in new project"
3. **Copie la clé** (commence par `AIza...`)
4. **Quota gratuit Gemini 2.5 Flash :** 1 500 requêtes/jour, 250 000 tokens/min — largement suffisant pour 100+ users

### Étape 4 : Vercel gratuit (10 min)

1. Va sur **vercel.com** → "Sign Up" avec ton compte GitHub
2. "Add New Project" → sélectionne ton repo `prism`
3. Framework preset : Next.js (détecté auto)
4. **AVANT de cliquer Deploy**, dérouler "Environment Variables" et ajouter :
   - `NEXT_PUBLIC_SUPABASE_URL` = (ton URL Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (ton anon key)
   - `GEMINI_API_KEY` = (ta clé Gemini)
5. Clique "Deploy"
6. Attends 2-3 min — Vercel te donne une URL gratuite genre `prism-xyz.vercel.app`

### Étape 5 : Configurer Supabase Auth (10 min)

Maintenant que tu as ton URL Vercel, retourne sur **Supabase → Authentication → URL Configuration** :
- **Site URL :** `https://prism-xyz.vercel.app` (ton URL Vercel)
- **Redirect URLs :** `https://prism-xyz.vercel.app/auth/callback`

**Pour Google OAuth (optionnel mais recommandé) :**
1. Google Cloud Console → "Credentials" → "Create Credentials" → "OAuth client ID"
2. Type : Web application
3. Authorized redirect URIs : `https://[ton-projet-id].supabase.co/auth/v1/callback`
4. Copie Client ID + Secret
5. Supabase → Authentication → Providers → Google → Enable + colle Client ID + Secret

### ✅ Tu as maintenant :
- Repo GitHub gratuit
- Web app live sur `prism-xyz.vercel.app` (HTTPS auto)
- Base de données Supabase gratuite
- Gemini API qui marche
- **TOTAL DÉPENSÉ : 0€**

---

## 🧠 PHASE 1 — VALIDATION avant marketing (3-5 jours)

> **Règle :** Si en 5 jours tu n'as pas 20 signups organiques avec ton URL Vercel, **NE LANCE PAS** la grosse campagne marketing. C'est que le produit n'intéresse personne (ou ton hook est mauvais). Pivot ou ajuste.

### Comment valider gratuitement (sans grosse pub)

#### Test 1 — DM friends & community (Jour 1)
- Envoie ton URL à **20 personnes** dans ton entourage qui utilisent ChatGPT
- Demande littéralement : *"Tu peux tester ce truc 2min et me dire si tu paierais 5€/mois pour ça ?"*
- Note les réponses dans un Google Sheet (gratuit)

**Signal de validation :**
- 8/20 disent "oui je paierais" → tu as un produit
- 3/20 → ton produit est sympa mais pas assez douloureux
- 0/20 → pivot

#### Test 2 — Reddit "Soft launch" (Jour 2-3)
Poste sur 1 SEUL subreddit (pas 4 d'un coup) :
- **r/PromptEngineering** (le moins risqué — communauté niche, pas trop de modération)
- Format : "I built X, looking for honest feedback before launch — no signup needed to try"
- Mets ton URL Vercel (oui, vercel.app c'est crédible pour un MVP)

**Signal de validation :**
- 50+ upvotes → marché là
- 20-50 upvotes → marché tiède, mais OK pour continuer
- < 20 → ton hook est mauvais, retest avec un autre titre

#### Test 3 — Twitter cold (Jour 3-4)
Identifie sur Twitter **5 personnes** qui ont récemment posté des frustrations avec ChatGPT. Reply à leur tweet :

> "J'ai eu exactement le même problème. J'ai construit un truc qui fait X — gratuit si tu veux tester [lien]. Si ça marche, je veux ton feedback ; si ça marche pas, je veux savoir pourquoi 🙏"

**Signal :** au moins 1/5 clique → tu as une accroche qui marche.

---

## 💸 PHASE 2 — MARKETING 0€ (Jour 5-19)

### Les 7 canaux gratuits par ordre de ROI

#### 🥇 #1 — Reddit (le plus puissant, plus que tu crois)

**Pourquoi :** 9M users sur r/ChatGPT, gratuit, traffic intent élevé.

**Stratégie qui marche :**
1. **NE PAS** poster ton lien direct (filtre anti-spam)
2. Format gagnant : *"I noticed [problem] — here's the [solution / framework / tool]"*
3. Donne 80% de valeur gratuite (un framework de prompting détaillé) → mention discrète de Prism dans le commentaire
4. Réponds à TOUS les commentaires sous 1h (boost l'algo Reddit)

**Subreddits cibles dans l'ordre :**
1. r/PromptEngineering (280k) — le plus chaud
2. r/ChatGPTPromptGenius (140k)
3. r/SideProject (220k)
4. r/SaaS (320k)
5. r/ChatGPT (9M) — plus risqué (modération stricte)
6. r/artificial (1M)
7. r/MachineLearning (3M) — seulement si angle technique

**Calendrier :** 1 subreddit par jour, espacement 24h minimum.

#### 🥈 #2 — Twitter/X "Build in Public"

**Tactique cheat-code :** Reply aux tweets de gros comptes IA (@karpathy, @sama, @AnthropicAI, @OpenAI, @karinaNguyen) avec un commentaire utile + screenshot Prism.

**Pourquoi ça marche :** Ces tweets ont 1M+ d'impressions. Même 0,01% de clics = 100 visiteurs gratos.

**Règle d'or :** Ne JAMAIS spam ton lien. Sois pertinent, fournis valeur, le clic suit.

#### 🥉 #3 — Hacker News "Show HN"

**Quand poster :** Mardi-Jeudi entre 15h-17h CET (= 9-11h ET, prime time HN)
**Titre exact :** `Show HN: Prism – Rewrite your AI prompts in 6 different modes`
**Risque :** Si ça flop, tu peux re-poster une seule fois 7 jours plus tard avec un titre différent.

#### 4️⃣ Indie Hackers
Crée un compte (gratuit), poste dans "Show IH" + "Building in Public". Communauté petite mais ultra qualifiée — c'est là que sont les autres makers qui peuvent acheter ton produit OU le promouvoir.

#### 5️⃣ Product Hunt (à préparer pour J+10)
**Pré-launch checklist :**
- [ ] Page "Coming Soon" sur Product Hunt 7 jours avant
- [ ] Mobiliser **30 amis** pour upvote dans la 1ère heure (12:01 PT = 9h CET)
- [ ] Préparer 5 screenshots + 1 GIF démo
- [ ] Tagline punchy : "Rewrite your AI prompts in 6 modes — instantly"
- [ ] Ton premier commentaire = la "story" derrière le produit

**Si tu finis Top 10 PH :** ~1000-2000 signups en 24h. Si Top 3, c'est ~5000+.

#### 6️⃣ TikTok / YouTube Shorts (sous-coté)
**Format gagnant 30s :**
- 0-3s : "ChatGPT te donne des réponses moyennes ?"
- 3-15s : Démontre Prism en split-screen (avant/après)
- 15-25s : Résultat dramatiquement meilleur
- 25-30s : "Lien dans bio, c'est gratuit"

**Tu peux ne JAMAIS apparaître à l'écran**, juste capture d'écran + voix off avec ElevenLabs (gratuit 10k chars/mois) ou ta voix.

**Volume cible :** 1 vidéo/jour pendant 14 jours. Sur 14, 1-2 vont marcher (algo TikTok).

#### 7️⃣ Newsletter swap / Communautés Discord
- **Rejoins** : Indie Worldwide, Makerlog Discord, r/SideProject Discord, Build in Public Discord
- **Ne spam pas** — sois actif 3-4 jours, aide les autres, PUIS partage ton truc
- Beaucoup de newsletters AI featurent gratos les outils (TLDR AI, Ben's Bites, etc.) — DM aux fondateurs

---

## 💰 PHASE 3 — MONÉTISATION 0€ (Jour 7+)

> **Stratégie clé :** Active le paiement DÈS QUE possible. Même 1 paying customer change tout (validation + cash + témoignage).

### Stripe gratuit (30 min de setup)

1. **stripe.com** → crée un compte (gratuit, pas de carte requise pour le compte Stripe lui-même)
2. **Active "Test mode"** d'abord pour tester
3. Crée un produit "Pro" → Recurring → 9€/mois
4. Stripe te donne un **Payment Link** que tu colles direct dans ton bouton "Upgrade"
5. **Bonus 0€ :** Stripe Checkout est gratuit (commission 1.4% + 0.25€ par transaction seulement)

### Pricing psychologique
- Free 30 rewrites → **forcer une frustration positive** au crédit 25-30
- Modal "Tu as utilisé 90% de tes crédits — passe Pro pour 9€/mois illimité"
- **Lifetime deal early adopter :** 49€ à vie pour les 50 premiers (urgence + scarcité + cash up-front)

### Cash hacks 0€
1. **Affiliate program informal :** Promets 30% commission à vie aux gens qui te ramènent des paying. Track avec un code promo Stripe simple.
2. **Pre-orders :** Si tu lances le desktop overlay dans 1 mois, fais des pré-commandes "20€ à vie" maintenant. Si 10 personnes paient, tu as 200€ pour acheter le domaine + outils.
3. **Bundle deals avec d'autres makers :** Cherche 5 autres SaaS niche similaire, proposez un bundle "5 tools for AI power users — 1 prix". Cross-promo gratuite.

---

## 🛠 PHASE 4 — Outils gratuits ou cheats légaux

### Design / Visuels (0€)
- **Figma** : gratuit pour 3 fichiers (largement suffisant)
- **Canva** : gratuit avec watermark (et le watermark est petit)
- **Logo gratuit** : DesignEvo, Hatchful, Looka (générateurs gratuits)
- **OG image** : OpenGraph.xyz (gratuit, juste à customiser leur template)
- **Screenshots polish** : Mockuup.io ou ScreenStudio (gratuit)

### Vidéo (0€)
- **OBS Studio** : screen recording pro, gratuit
- **CapCut Desktop** : montage gratuit, sans watermark
- **DaVinci Resolve** : pro-grade, gratuit
- **Voix off** : ElevenLabs (gratuit 10k chars/mois) ou TTS Edge gratuite

### IA gratuite (cheats)
- **Gemini 2.5 Flash** : 1500 req/jour gratuit (déjà utilisé)
- **Mistral Le Chat** : illimité gratuit pour tester des prompts
- **Anthropic Claude** : 30 messages/jour gratuit
- **Cursor IDE** : 2 semaines free trial Pro (puis 14€/mois — annule avant)

### Email (0€)
- **Resend** : 3 000 emails/mois gratuit, pas de carte
- **Mailtrap** : 1 000/mois pour tester
- **Brevo (ex-Sendinblue)** : 300 emails/jour gratuit

### Analytics (0€)
- **Vercel Analytics** : gratuit avec Vercel
- **PostHog** : 1M events/mois gratuit
- **Plausible** : 30 jours gratuit puis ~6€/mois (skip pour l'instant)

### Domaine "presque gratuit" (1-2€)
- **Namecheap** : domaines `.app` ou `.io` à ~10€/an mais **`.xyz`** ou **`.fyi`** à **1-2€** la 1ère année
- **Freenom** : `.tk`, `.ml`, `.ga` GRATUITS — mais douteux pour la crédibilité
- **Verdict :** Reste sur `prism.vercel.app` jusqu'à avoir tes 5 premiers paying. Ensuite achète `getprism.app` ou `useprism.io`.

---

## 📊 KPIs à tracker (gratuit, dans Supabase)

| Métrique | Cible J+14 | Comment tracker |
|----------|-----------|-----------------|
| Total signups | 100+ | Supabase → table `auth.users` |
| Activated users (1+ rewrite) | 60+ | Supabase → `select count(distinct user_id) from rewrites` |
| Total rewrites | 1500+ | Supabase → `count(*) from rewrites` |
| Paying customers | 5+ | Stripe Dashboard |
| Source de trafic n°1 | TBD | Vercel Analytics |
| Mode le + utilisé | TBD | `select mode, count(*) from rewrites group by mode order by 2 desc` |

---

## 🚨 SI ÇA NE MARCHE PAS — Plans B/C/D

### Si après 14 jours tu as <30 signups :
**→ Le hook ne fonctionne pas.**
- Change le headline de la landing
- Test une autre angle : "Save 25 min/day on ChatGPT prompts"
- Test un autre canal (TikTok)

### Si tu as >100 signups mais 0 paying :
**→ Le produit est sympa mais pas indispensable.**
- Ajoute un "killer mode" qui n'existe nulle part ailleurs
- Réduis le free tier à 10 rewrites pour forcer la conversion
- Lance le lifetime deal urgent (49€/à vie, 48h)

### Si tu as 5+ paying :
**→ TU AS UN BUSINESS. Réinvestis :**
- Achète ton domaine (10€)
- Loom Pro pour démos longues (12€/mois)
- Domain pro email (Resend domain : gratuit avec ton domaine)
- Première pub Reddit (€20 ciblée sur r/ChatGPT) — tu valides ROI

---

## 🎯 RÉCAP : Ton planning concret cette semaine

| Jour | Action | Temps | Coût |
|------|--------|-------|------|
| **Lundi** | Deploy GitHub + Vercel + Supabase + Gemini | 2h | 0€ |
| **Mardi** | DM à 20 contacts perso (validation) | 1h | 0€ |
| **Mercredi** | Post Reddit r/PromptEngineering | 30min | 0€ |
| **Jeudi** | Replies Twitter sur 5 gros tweets IA | 1h | 0€ |
| **Vendredi** | Crée vidéo TikTok 30s | 1h30 | 0€ |
| **Samedi** | Post LinkedIn + Indie Hackers | 1h | 0€ |
| **Dimanche** | Récap + decision : continuer ou pivot | 30min | 0€ |

**TOTAL semaine 1 : ~7h, 0€, validation faite.**

Si validation OK → semaine 2 = Hacker News + Product Hunt prep + scale Reddit.

---

## 💡 LE TRUC QUE PERSONNE NE DIT

**Le canal qui marche le mieux pour les SaaS IA en 2026 = TikTok + LinkedIn personnel.**

Pourquoi :
- Tout le monde lance sur PH/HN → saturé
- TikTok algo distribue gratos si le contenu est bon
- LinkedIn = décideurs qui ont du budget pour outils pro

**Action concrète :**
- 1 vidéo TikTok/jour (30s, sans toi à l'écran)
- 1 post LinkedIn/2 jours (storytime + screenshot)
- Ne post **rien** sur Twitter/Reddit pendant 1 semaine pour comparer

**Hack final :** Capture les commentaires/tweets/posts qui parlent de Prism → screenshots → réutilise comme "social proof" sur ta landing. **C'est légal, c'est gratuit, et ça remplace les fake testimonials.**
