# Countries project

This is a monorepo with frontend and backend services for the Countries project

## Installation


Install dependencies for all services
```bash
  yarn prepare
```


## Run all services

All services will run in docker compose and you can access them at http:localhost:3000
```bash
  yarn local
```

Get the .env.local file for the console and landing services from your colleagues

```bash
  cp .env.example .env.local
```

## Console development

Run the following commands in different terminals

```bash
  # terminal #1
  yarn front
```
```bash
  # terminal #2
  yarn dev:console
```

## Resorces
