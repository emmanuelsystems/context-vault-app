import { Pool } from 'pg';
import { config } from '../config';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  connectionString: config.database.url,
});

async function runMigrations() {
  console.log('🔄 Running database migrations...');

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(schemaSql);

    console.log('✅ Database migrations completed successfully');
    console.log('📊 Schema created with tables: plays, core_blocks, shapes, dabs, runs, assets');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

runMigrations();
