import { Router } from 'express';
import { Pool } from 'pg';
import { config } from '../config';

const router = Router();
const pool = new Pool({ connectionString: config.database.url });

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM shapes ORDER BY name ASC');
    res.json({ data: result.rows });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM shapes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Shape not found' });
    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description, template, output_format, schema, examples } = req.body;
    const result = await pool.query(
      'INSERT INTO shapes (name, description, template, output_format, schema, examples) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, template, output_format || 'markdown', schema || null, examples || []]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export default router;
