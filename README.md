# ImageDash

<p align="center">
<img src="https://raw.githubusercontent.com/isixe/ImageDash/refs/heads/main/public/favicon.ico" alt="ImageDash Logo" width="100px">
</p>

<p align="center">
A fast image search launcher tool for initiating image searches across multiple search engines.
</p>

## Features

- Multi-engine image search launch
- One-click search functionality
- Temporary image storage with Redis

## Tech Stack

- **Framework**: Next.js 15.3.3
- **UI Components**: Shadcn-ui
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React


## Installation

1. Clone the Repository

```bash
git clone https://github.com/isixe/ImageDash.git
cd ImageDash
```

2. Install Dependencies

```bash
pnpm install
```

3. Configure Environment Variables

Create a `.env` file in the project root:

```env
UPSTASH_REDIS_REST_URL=your_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
```

4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

| Variable                   | Required | Description                         |
| -------------------------- | -------- | ----------------------------------- |
| `UPSTASH_REDIS_REST_URL`   | Yes      | Upstash Redis REST API endpoint     |
| `UPSTASH_REDIS_REST_TOKEN` | Yes      | Upstash Redis REST API access token |

## Project Structure

```
ImageDash/
├── public/                  # Static assets
│   ├── favicon.ico
│   └── preview.png
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (seo)/          # SEO related pages
│   │   │   └── sitemap.ts
│   │   ├── api/            # API routes
│   │   │   └── upload/     # Image upload endpoint
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── robots.ts       # Robots.txt config
│   │   └── not-found.tsx   # 404 page
│   ├── components/         # React components
│   │   ├── icon/           # Icon components
│   │   ├── layout/         # Layout components (header, footer)
│   │   ├── provider/       # Context providers
│   │   ├── ui/             # Shadcn UI components
│   │   ├── view/           # Page view components
│   │   └── widget/         # Feature widgets
│   ├── data/               # Static data (search engines)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── styles/             # Global styles
│   └── utils/              # Helper functions
├── .eslintrc.json          # ESLint config
├── .prettierrc.json        # Prettier config
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## License

This project is licensed under the [MIT License](LICENSE).
