# wrkrs website

The official landing page for [`wrkrs`](https://github.com/SmartScaleAI/wrkrs-website), an
open-source CLI that installs a structured team of workers (AI agents) into an
existing software repository.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- shadcn/ui foundations
- Geist Sans and Geist Mono
- Vercel

## Development

Use Node.js 22.18 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm check
```

This runs ESLint, the TypeScript compiler, and a production Next.js build.

## Deployment

Pull requests receive Vercel preview deployments. The `main` branch is the
production source after review and explicit approval.

## License

[MIT](./LICENSE) © SmartScale AI
