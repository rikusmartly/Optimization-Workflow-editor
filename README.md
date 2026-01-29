# Workflow Builder UI

A sophisticated node-based workflow automation platform for managing advertising triggers across multiple campaigns, ad sets, and individual ads.

## Features

- **Node-Based Visual Editor**: Infinite canvas with draggable workflow nodes and visual connections
- **Four Node Types**: Scope, Schedule, Condition, and Action nodes
- **Connection System**: Drag-to-connect nodes with Bezier curve connections
- **Zoom & Pan**: Full canvas navigation with zoom controls (30% to 200%)
- **Settings Panel**: Contextual node configuration panel
- **Scope Selection**: Comprehensive account selection dialog with search
- **AI Chat Integration**: Floating prompt input with chat panel
- **Undo/Redo**: Full history system with last 50 states
- **Template Creation**: Quick-start template with 4 pre-connected nodes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd workflow-builder-ui
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
workflow-builder-ui/
├── src/
│   ├── components/          # React components
│   │   ├── NodeBasedTriggerEditor.tsx
│   │   ├── Node.tsx
│   │   ├── ConnectionLine.tsx
│   │   ├── TopNavigation.tsx
│   │   ├── Toolbar.tsx
│   │   ├── NodeSettingsPanel.tsx
│   │   ├── ScopeSelectionDialog.tsx
│   │   ├── FloatingPromptInput.tsx
│   │   └── InsightChatPanel.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── trigger.ts
│   ├── utils/              # Utility functions and icons
│   │   ├── icons.tsx
│   │   └── mockData.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Usage

### Creating Nodes

1. Click "Add new item" in the toolbar
2. Select a node type (Scope, Schedule, Condition, Action) or "Trigger Template"
3. Nodes appear on the canvas and can be dragged around

### Connecting Nodes

1. Hover over a node to see connection handles
2. Click and drag from a handle to another node
3. Release to create a connection

### Configuring Nodes

1. Click on a node to select it
2. The settings panel opens on the right
3. Configure node-specific settings
4. For Scope nodes, click "Select accounts" to open the account selection dialog

### Canvas Navigation

- **Pan**: Click and drag on empty canvas
- **Zoom**: Use Ctrl/Cmd + Mouse Wheel, or use zoom buttons in toolbar
- **Reset View**: Click the maximize icon in toolbar

### Keyboard Shortcuts

- **Ctrl/Cmd + Click**: Multi-select nodes
- **Ctrl/Cmd + Mouse Wheel**: Zoom in/out

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **SVG** - Canvas rendering

## License

MIT
