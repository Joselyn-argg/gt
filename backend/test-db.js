const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'admin_local',
  password: 'admin123',
  database: 'escuela_patinaje',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error:', err.message);
  } else {
    console.log('✅ Conexión exitosa!', res.rows[0]);
  }
  pool.end();
});