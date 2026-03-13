const request = require('supertest');
const app = require('../server'); // Exporta app desde server.js

describe('API de Escuela de Patinaje', () => {
  
  // Test 1: Ruta raíz - debe responder 200
  test('GET / - debe responder con éxito', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  // Test 2: GET /api/clases - debe responder 200
  test('GET /api/clases - debe obtener lista de clases', async () => {
    const response = await request(app).get('/api/clases');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test 3: GET /api/clases/999 - clase inexistente debe dar 404
  test('GET /api/clases/999 - clase no encontrada debe dar 404', async () => {
    const response = await request(app).get('/api/clases/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  // Test 4: POST /api/auth/login - credenciales inválidas dan 401
  test('POST /api/auth/login - credenciales inválidas dan 401', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: 'wrong' });
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  // Test 5: POST /api/auth/register - falta campo da 400
  test('POST /api/auth/register - falta campo da 400', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Test' }); // Faltan apellido, email, password
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});