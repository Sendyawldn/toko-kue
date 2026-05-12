# Docker Runtime

## Scope

This project uses separate Docker lanes for development and production.

## Development

Use the development Compose file from the project root:

```bash
docker compose up --build
```

The web app runs at `http://localhost:5173`. Source files are bind-mounted into the container for Vite hot reload.

## Production

Use the production override:

```bash
docker compose -f compose.yaml -f compose.prod.yaml up --build -d
```

The production app is served at `http://localhost:8080` from an Nginx container. The production lane does not bind-mount application source.

## Runtime Notes

- Development target: Node.js 24.15.0 Alpine.
- Production build target: Nginx 1.29 Alpine serving the Vite `dist` output.
- Health check: HTTP request to `/` inside the production container.

## Source Checks

| Source | Used For | Fetched At |
| --- | --- | --- |
| https://docs.docker.com/compose | Current Compose workflow | 2026-05-12 |
| https://docs.docker.com/compose/how-tos/production/ | Production override guidance | 2026-05-12 |
| https://docs.docker.com/guides/nodejs/ | Node.js container lane guidance | 2026-05-12 |
