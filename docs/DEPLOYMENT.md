# Context Vault Deployment Guide

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- PostgreSQL 15+ (or use Docker)

### Setup Steps

1. **Clone repository**
   ```bash
   git clone <repo-url>
   cd context-vault-app
   ```

2. **Environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your credentials
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **Run migrations**
   ```bash
   cd backend
   npm install
   npm run migrate
   ```

5. **Seed data (optional)**
   ```bash
   npm run seed
   ```

6. **Verify**
   - Backend: http://localhost:3000/health
   - Database: `psql postgresql://contextvault:password@localhost:5432/contextvault`

## Production Deployment

### Option 1: Docker Compose (Simple)

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Kubernetes

See `k8s/` directory for manifests (TODO)

### Option 3: Cloud Platforms

**Render.com:**
1. Create PostgreSQL database
2. Create Web Service for backend
3. Create Web Service for MCP server
4. Set environment variables

**Railway:**
1. Deploy from GitHub
2. Add PostgreSQL plugin
3. Set environment variables

**AWS:**
- RDS for PostgreSQL
- ECS/Fargate for containers
- Application Load Balancer

## Environment Variables

### Backend
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
PORT=3000
NODE_ENV=production
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
JWT_SECRET=...
```

### MCP Server
```
BACKEND_API_URL=https://your-backend.com
NODE_ENV=production
```

## Database Migrations

```bash
# Run migrations
cd backend
npm run migrate

# Create new migration (manual for now)
# Edit backend/src/database/schema.sql
# Then run migrate again
```

## Monitoring

### Health Checks
- Backend: `GET /health`
- Database: Connection pool status

### Logs
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f mcp-server

# View database logs
docker-compose logs -f postgres
```

### Metrics (TODO)
- Request count
- Response times
- Database query performance
- MCP tool usage

## Backup & Recovery

### Database Backup
```bash
# Manual backup
docker-compose exec postgres pg_dump -U contextvault contextvault > backup.sql

# Restore
docker-compose exec -T postgres psql -U contextvault contextvault < backup.sql
```

### Automated Backups
- Use managed database provider (RDS, Supabase)
- Or set up cron job with pg_dump

## Security Checklist

- [ ] Change default database passwords
- [ ] Use environment variables for secrets
- [ ] Enable SSL for database connections
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Restrict CORS origins

## Troubleshooting

**Backend won't start:**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check logs: `docker-compose logs backend`

**MCP tools not responding:**
- Verify BACKEND_API_URL is correct
- Check backend is accessible
- Review MCP server logs

**Database connection errors:**
- Check PostgreSQL is running
- Verify connection string
- Check firewall rules
