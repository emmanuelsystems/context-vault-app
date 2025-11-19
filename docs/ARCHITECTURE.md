# Context Vault Architecture

## System Overview

Context Vault transforms a static knowledge repository into a live AI orchestration layer using the **ASSET Framework**.

## Components

### 1. PostgreSQL Database
- **Purpose**: Canonical data store
- **Tables**: 
  - `plays` - Workflow templates
  - `core_blocks` - Structured knowledge (Canon)
  - `shapes` - Output templates
  - `dabs` - AI role definitions
  - `runs` - Execution records
  - `assets` - Banked outputs

### 2. Backend API (Express + TypeScript)
- **Port**: 3000
- **Endpoints**: REST API for all entities
- **Features**: 
  - CRUD operations for all Vault entities
  - LLM provider abstraction (OpenAI, Gemini)
  - Run tracking and Asset banking

### 3. MCP Server
- **Protocol**: Model Context Protocol (stdio)
- **Tools**: 7 MCP tools exposed to AI hosts
- **Connection**: Connects to Backend API via HTTP

### 4. Workbench Widget
- **Framework**: React + Vite
- **Purpose**: UI for Run configuration
- **Deployment**: Embedded in ChatGPT

## Data Flow

```
User → ChatGPT (AI Host)
         ↓ MCP Protocol
     MCP Server
         ↓ HTTP REST
     Backend API
         ↓ SQL
     PostgreSQL
```

## ASSET Framework

The core prompt assembly follows:

- **A**ssistant: DAB persona and role
- **S**ources: Core Blocks (Canon)
- **S**tructured Output: Shape template
- **E**xpectations: Quality criteria
- **T**ask: Goal statement

## Security Considerations

- Environment variables for sensitive keys
- PostgreSQL connection pooling
- Input validation via Zod schemas
- Rate limiting (TODO)
- Authentication (TODO)

## Scaling Strategy

- Database: Read replicas for heavy query loads
- Backend: Horizontal scaling via load balancer
- MCP Server: Stateless, can run multiple instances
- Caching: Redis for frequently accessed Vault data (TODO)

## Development vs Production

**Development:**
- Docker Compose for all services
- SQLite can be substituted for quick prototyping
- Hot reload enabled

**Production:**
- Managed PostgreSQL (AWS RDS, Supabase, etc.)
- Containerized deployments (Kubernetes/ECS)
- CI/CD pipelines
- Monitoring and logging
