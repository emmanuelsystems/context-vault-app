import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Context Vault API',
    version: '1.0.0',
    endpoints: {
      plays: '/api/plays',
      coreBlocks: '/api/core-blocks',
      shapes: '/api/shapes',
      dabs: '/api/dabs',
      runs: '/api/runs',
      assets: '/api/assets',
    },
  });
});

export default router;
