# Padre Gino's — Production React (Day 1–3)

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · SQLite

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npx vitest run
npm run build
npm run db:reset     # restore data/pizza.sqlite from the seed (stop dev first)
```

Classroom switches:

- Footer checkbox **"Simulasi gagal server"** makes every write fail on purpose.
- `DEMO_READ_LATENCY_MS` / `DEMO_WRITE_LATENCY_MS` in `.env.local` change the artificial delay (defaults 300 / 800 ms).

Each step of the workshop is a git tag. See `README-DAY1.md`.

## Tabel Audit

| Component         | Server/Client                           | Butuh browser?                                           | Perlu `'use client'` sendiri? |
| ----------------- | --------------------------------------- | -------------------------------------------------------- | ----------------------------- |
| Header            | Server, kecuali punya state/menu mobile | Tidak, jika hanya markup                                 | Tidak                         |
| MenuExplorer      | Client                                  | `useState` untuk filter                                  | Ya                            |
| MenuToolbar       | Client                                  | Input dan event handler                                  | Ya                            |
| PizzaCard         | Client dalam struktur sekarang          | Berada di bawah `MenuExplorer`; memakai `FavoriteButton` | Ya dalam struktur sekarang    |
| FavoriteButton    | Client                                  | `use`, state, transition, Server Action                  | Ya                            |
| SizePicker        | Client                                  | Pilihan ukuran/event handler                             | Ya                            |
| RatingPanel       | Client                                  | Form optimistic state dan transition                     | Ya                            |
| FailureToggle     | Client                                  | State/event handler                                      | Ya                            |
| PizzaOfTheDay     | Server                                  | Tidak                                                    | Tidak                         |
| DismissibleBanner | Client                                  | `useState` untuk dismiss                                 | Ya                            |
