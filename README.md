# ImageDash

ImageDash is an image search launcher tool designed to quickly initiate image searches across multiple search engines.

## Features

- Launches image searches on multiple search engines with one click.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/isixe/ImageDash.git
   cd ImageDash
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root and fill in your Upstash credentials as shown above.

4. **Start the project**
   ```bash
   pnpm dev
   ```

## Environment Variables

Image uploading uses Upstash Redis service for temporary storage. Before running the project, please ensure the following environment variables are set:

| Variable Name              | Description                         |
| -------------------------- | ----------------------------------- |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST API endpoint     |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API access token |

You can configure them in a `.env` file as follows:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## License

This project is licensed under the MIT License.