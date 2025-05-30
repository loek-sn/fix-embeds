# fix-embeds

A Discord bot server built with [Bun](https://bun.sh) that automatically
rewrites social media links in your server messages for better embeds. It
supports platforms like X (Twitter), Reddit, TikTok, and Instagram, converting
them to alternative embed-friendly services (e.g., `fxtwitter` for X links).

## Features

- Detects and rewrites links from:
  - X (Twitter) → fxtwitter
  - Reddit → rxddit
  - TikTok → vxtiktok
  - Instagram → ddinstagram
- Improves embed previews for shared links
- Fast and lightweight, powered by Bun

## Installation

Install dependencies:

```bash
bun install
```

## Usage

Start the bot:

```bash
export DISCORD_CLIENT_TOKEN ...
export DISCORD_CLIENT_ID ...
bun run build
bun run register
bun run src/index.ts
```

## Configuration

1. Set up your Discord bot and invite it to your server.
2. Configure your bot token and other settings in the environment file or as
   required in the code.

## Requirements

- [Bun](https://bun.sh) v1.2.13 or later
- Node.js (if required by dependencies)
- Discord bot token

## License

MIT

---

This project was created using `bun init` in Bun v1.2.13.
