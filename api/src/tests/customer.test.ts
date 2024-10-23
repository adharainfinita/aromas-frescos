import request from 'supertest';
import  app  from '../index'; 
import { initDB } from '../db/initDb';

beforeAll(async()=> {
  await initDB();
})

describe('Customer API', () => {
  it('Debería crear un nuevo cliente', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('customer_id');
  });

  it('Debería retornar todos los clientes', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Debería retornar un cliente por ID', async () => {
    const res = await request(app).get('/api/customers/1'); // Supongamos que existe el cliente con ID 1
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('customer_id', 1);
  });

  it('Debería actualizar un cliente', async () => {
    const res = await request(app)
      .put('/api/customers/1')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '33333333333'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Cliente actualizado con éxito');
  });
});
