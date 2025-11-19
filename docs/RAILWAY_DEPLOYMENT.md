# 🚀 Railway Deployment Guide - Context Vault

## Quick Deploy (5 Minutes)

### Step 1: Prepare Railway Account

1. **Sign up for Railway** at [railway.app](https://railway.app)
   - Free tier: $5/month credit
   - No credit card required for free tier

2. **Install Railway CLI** (optional but recommended)
   ```bash
   npm install -g @railway/cli
   railway login
   ```

---

## Option A: Deploy via Railway Dashboard (Easiest)

### 1. Create New Project

1. Go to [Railway Dashboard](https://railway.app/new)
2. Click **"Deploy from GitHub repo"**
3. Select `emmanuelsystems/context-vault-app`
4. Railway will automatically detect:
   - `railway.json` configuration
   - `Procfile` for services
   - `nixpacks.toml` for build

### 2. Add PostgreSQL Database

1. In your project dashboard, click **"New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically:
   - Creates the database
   - Injects `DATABASE_URL` environment variable
   - Connects it to your services

### 3. Configure Environment Variables

Click on **"Variables"** for each service:

**Backend Service:**
```
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here (optional)
DATABASE_URL=<auto-injected-by-railway>
```

**MCP Server:**
```
NODE_ENV=production
BACKEND_API_URL=<will-be-backend-service-url>
```

### 4. Run Database Migrations

After first deployment:

```bash
# Option 1: Via Railway CLI
railway run npm run migrate --service backend

# Option 2: Via Railway Dashboard
# Go to backend service → Settings → Add one-time command
npm run migrate
```

### 5. Deploy!

Railway will automatically:
- ✅ Build both services
- ✅ Deploy to production
- ✅ Generate public URLs
- ✅ Set up SSL certificates

**Your URLs will be:**
- Backend API: `https://context-vault-backend-production.up.railway.app`
- MCP Server: `https://context-vault-mcp-production.up.railway.app`

---

## Option B: Deploy via Railway CLI

```bash
# 1. Navigate to project
cd context-vault-app

# 2. Initialize Railway project
railway init

# 3. Add PostgreSQL
railway add --database postgres

# 4. Set environment variables
railway variables set OPENAI_API_KEY=your_key_here
railway variables set GEMINI_API_KEY=your_key_here
railway variables set NODE_ENV=production

# 5. Deploy
railway up

# 6. Run migrations
railway run npm run migrate --service backend

# 7. Get your URLs
railway status
```

---

## Option C: Deploy via GitHub Integration (Automatic)

### 1. Connect GitHub to Railway

1. Go to your Railway project
2. Settings → **"Connect Repo"**
3. Select `emmanuelsystems/context-vault-app`

### 2. Configure Auto-Deploy

Railway will automatically deploy when you:
- Push to `main` branch
- Create a pull request (preview deployment)
- Merge PRs

### 3. Environment Variables

Add via Dashboard → Variables:
```
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
NODE_ENV=production
```

---

## Post-Deployment: Testing

### 1. Test Backend API

```bash
curl https://your-backend.up.railway.app/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2025-11-19T09:00:00.000Z"
# }
```

### 2. Test Database Connection

```bash
curl https://your-backend.up.railway.app/api/plays

# Should return:
# {"data": [...]} # List of plays
```

### 3. Test MCP Server

MCP server runs on stdio, so it's used via ChatGPT/Claude integration (see next section).

---

## Connect MCP Server to ChatGPT

### 1. Get MCP Server URL

From Railway dashboard, copy your MCP server URL:
```
https://context-vault-mcp-production.up.railway.app
```

### 2. Configure ChatGPT Desktop

Create `~/.config/chatgpt/mcp_config.json`:

```json
{
  "mcpServers": {
    "context-vault": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/sdk",
        "http-sse",
        "https://context-vault-mcp-production.up.railway.app"
      ]
    }
  }
}
```

### 3. Restart ChatGPT

The 7 Context Vault tools will now be available in ChatGPT!

---

## Monitoring & Logs

### View Logs

**Railway Dashboard:**
- Go to service → **"Deployments"**
- Click on active deployment
- View real-time logs

**Railway CLI:**
```bash
# Backend logs
railway logs --service backend

# MCP Server logs
railway logs --service mcp-server
```

### Metrics

Railway provides:
- ✅ CPU usage
- ✅ Memory usage
- ✅ Network traffic
- ✅ Response times

Access via: Service → **"Metrics"**

---

## Scaling & Performance

### Vertical Scaling (Increase Resources)

Railway automatically allocates:
- **Hobby Plan**: 512MB RAM, 0.5 vCPU
- **Pro Plan**: 8GB RAM, 8 vCPU

Upgrade: Dashboard → **"Settings"** → **"Plan"**

### Horizontal Scaling (Multiple Instances)

Edit `railway.json`:
```json
{
  "deploy": {
    "numReplicas": 3  // Run 3 instances
  }
}
```

### Database Scaling

Railway PostgreSQL:
- Automatic backups
- Point-in-time recovery
- Connection pooling

---

## Troubleshooting

### Issue: Deployment Fails

**Check build logs:**
```bash
railway logs --deployment <deployment-id>
```

**Common fixes:**
- Verify `package.json` scripts exist
- Check Node.js version (should be 18+)
- Ensure all dependencies are listed

### Issue: Database Connection Error

**Verify DATABASE_URL:**
```bash
railway variables --service backend
```

**Run migrations manually:**
```bash
railway run npm run migrate --service backend
```

### Issue: MCP Tools Not Working

**Check MCP server is running:**
```bash
curl https://your-mcp-url.up.railway.app/health
```

**Verify BACKEND_API_URL:**
```bash
railway variables --service mcp-server
```

---

## Cost Breakdown

### Free Tier ($5/month credit)
- 500 hours of service runtime
- PostgreSQL database
- SSL certificates
- **Perfect for testing!**

### Pro Tier ($20/month)
- Unlimited hours
- Priority support
- Higher resource limits
- **Recommended for production**

### Estimated Monthly Cost
- **Development**: $0 (stays within free tier)
- **Production (low traffic)**: $10-15/month
- **Production (high traffic)**: $30-50/month

---

## Backup & Recovery

### Automatic Backups

Railway backs up PostgreSQL:
- Daily snapshots
- 7-day retention
- One-click restore

**Restore a backup:**
1. Dashboard → Database
2. **"Backups"** tab
3. Click backup → **"Restore"**

### Manual Database Export

```bash
# Get database URL
railway variables --service backend | grep DATABASE_URL

# Export via pg_dump
pg_dump <DATABASE_URL> > backup.sql

# Restore
psql <DATABASE_URL> < backup.sql
```

---

## Custom Domain (Optional)

### 1. Add Custom Domain

1. Service → **"Settings"** → **"Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `api.yourdomaincom`

### 2. Configure DNS

Add CNAME record:
```
api.yourdomain.com  CNAME  your-service.up.railway.app
```

Railway automatically provisions SSL!

---

## Next Steps

✅ **Deployment Complete!**

Now you can:
1. **Test the API** - Make requests to your backend
2. **Connect to ChatGPT** - Use the MCP tools
3. **Add sample data** - Seed Plays, DABs, Core Blocks
4. **Monitor performance** - Watch logs and metrics
5. **Scale as needed** - Upgrade plan or add replicas

---

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Context Vault Issues**: [GitHub Issues](https://github.com/emmanuelsystems/context-vault-app/issues)
- **Railway Community**: [Railway Discord](https://discord.gg/railway)

---

🎉 **Your Context Vault is now live on Railway!**
