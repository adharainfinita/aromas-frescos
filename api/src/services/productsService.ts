import { connectDB } from "../db/db.js";

export interface IProduct {
	name: string;
	brand: string;
	category: string;
	price: number;
	available: boolean;
	stock: number;
}

//Función para crear un nuevo producto
export async function createProduct(product: IProduct) {
	const client = await connectDB();
	console.log(product);
	try {
		const result = await client.query(
			`INSERT INTO products (product_name, product_brand, product_category, product_price, product_available, product_stock) VALUES($1, $2, $3, $4, $5, $6) RETURNING product_id`,
			[
				product.name,
				product.brand,
				product.category,
				product.price,
				product.available,
				product.stock,
			]
		);
		return result.rows[0].customer_id;
	} finally {
		client.release();
	}
}

// Función para obtener todos los productos
export async function getAllProducts() {
	const client = await connectDB();
	try {
		const products = await client.query(`SELECT * FROM products`);
		return products.rows;
	} finally {
		client.release();
	}
}

// Función para obtener productos por ID
export async function getProductById(productId: number) {
	const client = await connectDB();
	try {
		const product = await client.query(
			`SELECT * FROM products WHERE product_id = $1`,
			[productId]
		);
		return product.rows[0];
	} finally {
		client.release();
	}
}

// Función para modificar un producto
export async function updateProduct(productId: number, product: IProduct) {
	const client = await connectDB();
	try {
		const result = await client.query(
			`UPDATE products 
			SET product_name = $1, product_brand = $2, product_category = $3, product_price = $4, product_available = $5, product_stock = $6
			WHERE product_id = $7`,
			[
				product.name,
				product.brand,
				product.category,
				product.price,
				product.available,
				product.stock,
				productId,
			]
		);
		return result.rowCount; // Retorna true si hubo cambios
	} finally {
		client.release();
	}
}

export async function deleteProductById(productId: number) {
	const db = await connectDB();
	try {
		const product = await db.query(
			`DELETE FROM products WHERE product_id = $1`,
			[productId]
		);
		return product.rowCount;
	} finally {
		db.release();
	}
}

export async function bulkCreateProducts(products: IProduct[]) {
	const db = await connectDB();

	try {
		await db.query("BEGIN");

		const insertPromises = products.map((product) => {
			const { name, brand, category, price, available, stock } = product;
			return db.query(
				`
					INSERT INTO products(product_name, product_brand, product_category, product_price, product_available, product_stock) VALUES ($1, $2, $3, $4, $5, $6)
				`,
				[name, brand, category, price, available, stock]
			);
		});
		await Promise.all(insertPromises);
		await db.query("COMMIT");
	} finally {
		db.release();
	}
}

export async function updatePriceProducts(price: number, category: string) {
  const db = await connectDB();

  try {
    await db.query("BEGIN");

    // Actualizar precios según la categoría
    const result = await db.query(
      `UPDATE products 
       SET product_price = $1 
       WHERE product_category = $2`,
      [price, category]
    );

    // Confirmar la transacción
    await db.query("COMMIT");

    // Retornar la cantidad de filas afectadas
    return result.rowCount;
  } catch (error) {
    // Revertir la transacción en caso de error
    await db.query("ROLLBACK");
    throw error; // Propagar el error para manejarlo externamente
  } finally {
    db.release(); // Liberar la conexión
  }
}
