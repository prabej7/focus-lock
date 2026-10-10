# FocusLock

FocusLock is a desktop productivity app designed to help you stay on task by combining a focus timer with website blocking and a clean, distraction-free interface.

## Features

- Focus timer with configurable session lengths
- Website blocking for distracting domains
- Settings modal for session customization
- Light and dark theme toggle
- Native desktop experience using Wails and Go

## Tech stack

- Go for the desktop app shell and native logic
- Wails for cross-platform desktop integration
- React + TypeScript + Vite for the frontend UI
- Tailwind CSS for styling
- Lucide icons for interface actions

## Getting started

### Prerequisites

- Go 1.22 or newer
- Node.js 18 or newer
- npm
- Wails CLI

Install the Wails CLI:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### Install dependencies

```bash
cd frontend
npm install
```

### Run in development mode

From the project root:

```bash
wails dev
```

This starts the desktop app and serves the Vite frontend in development mode.

### Build the app

```bash
wails build
```

## Project structure

```text
.
├── app.go
├── main.go
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── build/
├── wails.json
├── go.mod
├── go.sum
└── README.md
```

## Notes

The app keeps a minimal, focused interface and centers around reducing digital distractions while preserving a polished desktop experience.
