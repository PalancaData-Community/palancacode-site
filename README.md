# PalancaCode — Site (Next.js + Tailwind)

Look & feel minimalista inspirado no Tailwind CSS Starter Blog e payload-vercel demo.

## Rodar local
```bash
npm install
cp .env.example .env.local  # edite com suas chaves
npm run dev  # http://localhost:3000
```

## Publicar (Vercel)
1. Suba o repo para o GitHub.
2. Importe na Vercel e adicione as envs `YOUTUBE_API_KEY` e `YOUTUBE_CHANNEL_ID`.
3. Deploy.

## Publicar posts
Crie `.md` em `content/posts/` com frontmatter:
```md
---
title: "Título"
date: "2025-10-16"
excerpt: "Resumo curto..."
---

Seu conteúdo em Markdown...
```
