# Context Vault - AI Workbench MCP Application

Transform your Context Vault from a static repository into a live AI orchestration layer.

## 🎯 Overview

Context Vault is a Model Context Protocol (MCP) server that connects ChatGPT/Claude to your structured knowledge base, enabling seamless AI-assisted workflow execution through the **ASSET Framework**:

- **A**ssistant: AI role (DAB - Digital AI Bot)
- **S**ources: Context data (Core Blocks from Canon)
- **S**tructured Output: Output template (Shape)
- **E**xpectations: Quality criteria
- **T**ask: The goal statement

## 🏗️ Architecture

```
┌─────────────────────┐
│  ChatGPT / Claude   │  ← AI Host
└──────────┬──────────┘
           │ MCP Protocol
┌──────────▼──────────┐
│   MCP Server        │  ← Exposes 7 tools
│   (TypeScript)      │
└──────────┬──────────┘
           │ REST API
┌──────────▼──────────┐
│  Backend API        │  ← Business Logic
│  (Express + Prisma) │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  PostgreSQL         │  ← Canonical Data Store
│  (Plays, Canon,     │
│   Shapes, DABs,     │
│   Runs, Assets)     │
└─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15+ (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd context-vault-app
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   cd backend
   npm install
   npm run migrate
   ```

5. **Seed initial data** (optional)
   ```bash
   npm run seed
   ```

### Access Points
- **Backend API**: http://localhost:3000
- **MCP Server**: stdio (connected via ChatGPT)
- **Workbench Widget**: Embedded in ChatGPT

## 📦 Components

### 1. Backend API (`/backend`)
Express.js + Prisma backend providing REST API for:
- Plays management
- Core Blocks (Canon) storage
- Shapes library
- DABs (Digital AI Bots)
- Runs tracking
- Asset banking

### 2. MCP Server (`/mcp-server`)
Model Context Protocol server exposing 7 tools:
- `cv_list_plays`: List available Plays
- `cv_list_core_blocks`: List Core Blocks (Canon)
- `cv_list_shapes`: List output Shapes
- `cv_list_dabs`: List DABs (AI roles)
- `cv_assemble_asset`: Assemble complete ASSET prompt
- `cv_create_run`: Create new Run record
- `cv_update_run_judge`: Update Run status & bank Assets

### 3. Workbench Widget (`/workbench-widget`)
React UI embedded in ChatGPT for:
- Play selection
- Goal definition
- Context review
- ASSET preview
- Judge & Banking

## 🔧 Development

### Backend Development
```bash
cd backend
npm install
npm run dev      # Start with hot reload
npm run test     # Run tests
npm run migrate  # Run database migrations
```

### MCP Server Development
```bash
cd mcp-server
npm install
npm run dev      # Start MCP server
npm run build    # Build for production
```

### Widget Development
```bash
cd workbench-widget
npm install
npm run dev      # Start Vite dev server
npm run build    # Build for production
```

## 📊 Database Schema

Core entities:
- **plays**: Repeatable workflow templates
- **core_blocks**: Structured client knowledge (Canon)
- **shapes**: Output templates
- **dabs**: AI role definitions
- **runs**: Execution records
- **assets**: Banked, approved outputs

See `backend/src/database/schema.sql` for full schema.

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# MCP Server tests
cd mcp-server && npm test

# Widget tests
cd workbench-widget && npm test
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🎯 Success Metrics

- **Reduction in manual copy-paste steps** per Run
- **Bank rate**: % of Runs producing banked Assets
- **First-pass acceptance**: % of Runs marked "Pass" at Judge

## 🛠️ Tech Stack

- **Backend**: TypeScript, Express.js, Prisma, PostgreSQL
- **MCP Server**: TypeScript, @modelcontextprotocol/sdk
- **Widget**: React, TypeScript, TailwindCSS, Vite
- **Infrastructure**: Docker, Docker Compose

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue.

---

Built with ❤️ for AI-assisted workflow orchestration
