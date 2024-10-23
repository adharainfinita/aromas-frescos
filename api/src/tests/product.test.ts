import { initDB } from '../db/initDb';
import request from 'supertest';
import app from '../index'; 

beforeAll(async()=> {
  await initDB();
})

describe('Product API', () => {
  it('Debería crear un nuevo producto', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Producto Test',
        brand: 'Marca Test',
        category: 'Categoría Test',
        price: 100,
        available: true,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('product_id');
  });

  it('Debería retornar todos los productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Debería retornar un producto por ID', async () => {
    const res = await request(app).get('/api/products/1'); // Supongamos que existe el producto con ID 1
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('product_id', 1);
  });

  it('Debería actualizar un producto', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .send({
        name: 'Producto Actualizado',
        brand: 'Marca Actualizada',
        category: 'Nueva Categoría',
        price: 150,
        available: true,
        discontinued: false
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Producto actualizado con éxito');
  });
});
