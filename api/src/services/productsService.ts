import { connectDB } from "../db/db";

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
	const db = await connectDB();
  console.log(product);
	
	const result = await db.run(
		`INSERT INTO products (product_name, product_brand, product_category, product_price, product_available, product_stock) VALUES(?, ?, ?, ?, ?, ?)`,
		[
			product.name,
			product.brand,
			product.category,
			product.price,
			product.available,
			product.stock,
		]
	);
	return result.lastID;
}

// Función para obtener todos los productos
export async function getAllProducts() {
	const db = await connectDB();
	const products = await db.all(`SELECT * FROM products`);
	return products;
}

// Función para obtener productos por ID
export async function getProductById(productId: number) {
	const db = await connectDB();
	const product = await db.get(`SELECT * FROM products WHERE product_id = ?`, [
		productId,
	]);
	return product;
}

// Función para modificar un producto
export async function updateProduct(productId: number, product: IProduct) {
	const db = await connectDB();
	const result = await db.run(
		`UPDATE products 
    SET product_name = ?, product_brand = ?, product_category = ?, product_price = ?, product_available = ?, product_stock = ?
    WHERE product_id = ?`,
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
	return result.changes! > 0; // Retorna true si hubo cambios
};


export async function deleteProductById(productId: number) {
	const db = await connectDB();
	const product = await db.run(`DELETE 1 FROM products WHERE product_id = ?`, [
		productId,
	]);
	return product;
}
