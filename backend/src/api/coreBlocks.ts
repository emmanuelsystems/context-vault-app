import { Router } from 'express';
import { Pool } from 'pg';
import { config } from '../config';

const router = Router();
const pool = new Pool({ connectionString: config.database.url });

// GET /api/core-blocks - List core blocks with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { type, tags } = req.query;

    let query = 'SELECT * FROM core_blocks WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (type) {
      query += \` AND type = $\${paramIndex++}\`;
      params.push(type);
    }

    if (tags) {
      query += \` AND tags && $\${paramIndex++}\`;
      params.push(Array.isArray(tags) ? tags : [tags]);
    }

    query += ' ORDER BY name ASC';

    const result = await pool.query(query, params);
    res.json({ data: result.rows });
  } catch (error) {
    next(error);
  }
});

// GET /api/core-blocks/:id - Get single core block
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM core_blocks WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Core block not found' });
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// POST /api/core-blocks - Create new core block
router.post('/', async (req, res, next) => {
  try {
    const { name, type, content, metadata, tags } = req.body;

    const result = await pool.query(
      \`INSERT INTO core_blocks (name, type, content, metadata, tags)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *\`,
      [name, type, content, metadata || {}, tags || []]
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/core-blocks/:id - Update core block
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const setClause = fields.map((field, index) => \`\${field} = $\${index + 2}\`).join(', ');

    const result = await pool.query(
      \`UPDATE core_blocks SET \${setClause} WHERE id = $1 RETURNING *\`,
      [id, ...values]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Core block not found' });
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/core-blocks/:id - Delete core block
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM core_blocks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Core block not found' });
    }

    res.json({ message: 'Core block deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
