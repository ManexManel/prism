# Templates Sociaux Prêts à Copier

> Tous écrits avec les principes du `cold-email` skill : sound human, peer-to-peer, no jargon, observation → problem → ask.

---

## 🐦 TWITTER — Thread "Build in Public" Jour 1

**Tweet 1 (hook) :**
```
J'ai shippé Prism aujourd'hui.

Tu connais quand tu écris un prompt à ChatGPT et la réponse est… moyenne ?
Le problème vient pas de ChatGPT.

Le problème vient du prompt.

Voici ce que j'ai construit pour fixer ça 👇
```

**Tweet 2 :**
```
Le constat :

90% des prompts sont vagues.
"Ecris-moi un truc sur le marketing"
→ ChatGPT te sort une bouillie générique.

J'ai analysé 1000 prompts récents.
6 problèmes reviennent à chaque fois.
```

**Tweet 3 :**
```
Les 6 problèmes :

1. Pas de rôle défini ("agis comme un X")
2. Pas de contexte spécifique
3. Pas de format de sortie attendu
4. Trop vague (manque de contraintes)
5. Mauvais ton/registre
6. Une seule "angle" testée

Prism les corrige tous, en 1 clic.
```

**Tweet 4 (screenshot) :**
```
Voilà à quoi ça ressemble :

[Screenshot du workspace : input vague à gauche, résultat structuré à droite]

Tu paste ton prompt → tu choisis un mode → tu copies le résultat. 5 secondes.
```

**Tweet 5 (transparence) :**
```
Pourquoi build in public ?

Parce que je suis solo et j'ai besoin de votre feedback.

✅ Live aujourd'hui : workspace web, 6 modes, voice input
🔄 En cours : Chrome extension (2 semaines)
📅 Planifié : Desktop overlay Mac/Windows (Q3)
```

**Tweet 6 (CTA) :**
```
30 réécritures gratos, pas de carte.

Si tu testes, dis-moi le mode qui t'a le plus surpris.
Si tu trouves un bug, je t'envoie 6 mois Pro gratos.

→ prism.app
```

---

## 🟧 REDDIT — r/PromptEngineering

**Titre :**
> I built a prompt rewriter with 6 different "modes" — feedback wanted (it's free)

**Body :**
```markdown
Hey r/PromptEngineering,

After reading hundreds of posts here about prompts that don't work, I noticed
the same 6 patterns of failure:

1. **No role defined** — "Write me X" instead of "Act as a senior X..."
2. **No context** — assumes the model knows your situation
3. **No output format** — gets a wall of text instead of a table
4. **Too vague** — "make it good" instead of specific constraints
5. **Wrong tone** — casual when you needed expert
6. **Single angle** — only one framing tested

I built a small tool that rewrites prompts in 6 modes addressing each of these.
Free for 30 rewrites/month, no signup tricks.

Honest ask: tell me which mode is most/least useful. I'm building this in public
and your feedback shapes the roadmap.

Link in comments (Reddit hates link posts).
```

**1st comment :**
```
Link → prism.app

Built in public, currently solo, feedback >>> upvotes.
```

---

## 🟧 REDDIT — r/SideProject

**Titre :**
> After 4 weekends, my prompt rewriter SaaS is live — here's the tech stack and what I learned

**Body :**
```markdown
**What it does:** Rewrites your AI prompts in 6 different modes (diagnostic,
dialogue, 3 angles, tone shift, expand, direct). Free tier 30 rewrites/month.

**Stack:**
- Next.js 14 (App Router) + Tailwind
- Supabase (auth + DB + RLS)
- Gemini 2.5 Flash for the rewriting
- Vercel for deploy
- 0 dollars spent on infra (free tiers)

**What I learned:**
1. Building the API was the easy part. The mode prompts took 2 weekends of testing.
2. Supabase RLS is a superpower — security for free.
3. Edge runtime + cookies = pain. Switched to nodejs runtime.
4. Voice input (Web Speech API) works in 2 lines of code, browser-side.
5. Rate limiting in-memory is fine for v1. Upstash Redis when traffic justifies.

**What's next:**
- Chrome extension (in 2 weeks)
- Desktop overlay app (Tauri, Q3)

Link to the live site in comments. Roast it, please.
```

---

## 🟪 LINKEDIN — Post personnel

```
Three weeks ago, I got pissed.

I was writing the same kind of prompt for the 50th time:
"Write me an email about X"
→ generic AI response.

Each time, I had to manually:
- Add a role ("act as a marketing director")
- Add context (industry, audience, tone)
- Add format requirements

That's 30 seconds of cognitive overhead PER PROMPT.
Multiply by 50 prompts/day → 25 minutes lost daily.

So I built Prism.

It's a small web tool that rewrites your prompts in 6 modes.
Paste → click → get a structured prompt that actually works.

Live today. Free for 30 rewrites/month.

Honest ask: I'm solo on this. If you try it, send me the prompt that
gave the worst result. I want to find the edge cases.

Link in the first comment.

P.S. Built in public. Following Marc Lou's playbook (ship in 7 days, market
in the next 7). Lessons coming on Twitter @useprism.
```

---

## 🟧 HACKER NEWS — Show HN

**Title :**
```
Show HN: Prism – Rewrite your AI prompts in 6 different modes
```

**Text post :**
```
Hi HN,

I built Prism because I kept writing vague prompts to ChatGPT and getting
vague responses. The fix is always the same — add a role, add context, add
format requirements. So I automated it.

Six modes:
- Direct: sharpens the prompt in one pass
- Diagnostic: identifies what's vague, fixes it
- Dialogue: restructures as a clarification flow
- 3 Angles: generates 3 framings of the same request
- Tone Shift: rewrites in expert/authoritative tone
- Expand: adds role + context + structure + format

Stack: Next.js + Supabase + Gemini 2.5 Flash. Free tier (30 rewrites/month),
no signup tricks. Building in public.

Live: https://prism.app

Would love feedback on:
1. Which mode is actually useful vs gimmick
2. Whether you'd want a Chrome extension first or a desktop overlay
3. Pricing — €9/mo Pro for unlimited, fair?
```

---

## 🟦 PRODUCT HUNT — Launch description

**Tagline (60 chars max) :**
```
Rewrite your AI prompts in 6 different modes — instantly
```

**Description (260 chars) :**
```
Stop getting generic answers from ChatGPT. Prism rewrites your prompts in 6
modes (diagnostic, dialogue, 3 angles, tone shift, expand, direct) so you
get exactly the response you asked for. Free tier · Voice input · Built in
public.
```

**First comment by maker :**
```
Hey hunters! 👋

I built Prism after the 50th time I asked ChatGPT for "an email about X" and got generic slop back.

The fix was always manual: add role, context, format. So I automated it into 6 modes.

This is v0.1 — the web workspace is live. Chrome extension in 2 weeks, desktop overlay (Tauri) next quarter.

Free tier is real (30 rewrites/mo, no card), Pro is €9/mo for unlimited.

Honest ask: I'm solo. Tell me which mode is overkill, which is missing.

Stack for the curious: Next.js + Supabase + Gemini 2.5 Flash. Built solo over 4 weekends.

Thanks for hunting! 🔮
```

---

## 📨 COLD EMAIL — Newsletter outreach

**Subject:** `Tool for your "what's new" section — Prism (prompt rewriter)`

**Body:**
```
Hi [Prénom],

Quick one — I shipped Prism 10 days ago. It rewrites your AI prompts in 6
modes so you stop getting generic answers from ChatGPT.

Numbers so far:
- [X] signups
- [Y] paying
- #1 on r/PromptEngineering last week
- Featured on [X] this morning

If you're scanning for tools to feature in [Newsletter Name] this week:
- URL: prism.app
- 1-liner: Rewrite your AI prompts in 6 modes (diagnostic, dialogue, 3 angles…)
- Screenshot attached
- 30 rewrites free, €9/mo Pro

Not chasing — just thought it fits the audience. Reply if useful, ignore if not.

[Ton prénom]
Building solo. Shipping in public.
```

---

## 🎬 VIDEO DEMO SCRIPT (30s)

```
[0-2s]   Black screen, white text fades in: "Why ChatGPT gives you bad answers."
[2-5s]   Cut to ChatGPT screen. Type: "write me an email about marketing".
         Hit Enter. Show generic response (3-line preview).
[5-8s]   Text overlay: "The problem isn't ChatGPT. It's the prompt."
[8-15s]  Cut to Prism workspace. Paste same prompt. Click "Diagnostic".
         Show the rewritten prompt appearing (animation).
[15-20s] Click "Copy". Cut back to ChatGPT. Paste new prompt.
         Show the structured, specific response now.
[20-25s] Side-by-side: bad response vs good response.
[25-28s] Logo Prism + tagline: "Rewrite your prompts in 6 modes."
[28-30s] CTA: "Try free → prism.app"
```

**Music :** royalty-free tech ambient (e.g., Pixabay "Innovation" or "Future")
**Outil :** OBS (gratuit) ou Loom + CapCut pour montage
