import { connectDB } from "../db/db.js";

export interface IPurchase {
	customerId: number;
	totalAmount: number;
	paid: boolean;
	paidDate?: string | null;
}

export interface IPurchaseDetail {
	purchaseId: number;
	productId: number;
	quantity: number;
	pricePerUnit: number;
}


// Crear una nueva compra
export async function createPurchase(purchase: IPurchase, details: IPurchaseDetail[]) {
	const db = await connectDB();

	try {
		await db.query("BEGIN"); // Iniciar transacción

		// Insertar la compra
		const result = await db.query(
			`INSERT INTO purchase (customer_id, purchase_amount, purchase_paid, purchase_paid_date)
			 VALUES ($1, $2, $3, $4) RETURNING purchase_id`,
			[
				purchase.customerId,
				purchase.totalAmount,
				purchase.paid,
				purchase.paidDate || null,
			]
		);
		const purchaseId = result.rows[0].purchase_id;

		// Insertar detalles de la compra
		for (const detail of details) {
			await db.query(
				`INSERT INTO purchasedetails (purchase_id, product_id, quantity, price_per_unit)
				 VALUES ($1, $2, $3, $4)`,
				[purchaseId, detail.productId, detail.quantity, detail.pricePerUnit]
			);

			// Reducir el stock del producto
			const productResult = await db.query(
				`SELECT product_stock FROM products WHERE product_id = $1`,
				[detail.productId]
			);

			if (productResult.rowCount && productResult.rowCount > 0) {
				const currentStock = productResult.rows[0].product_stock;
				const newStock = currentStock - detail.quantity;

				// Actualizar el estado del producto
				await db.query(
					`UPDATE products SET product_stock = $1, product_available = $2 WHERE product_id = $3`,
					[newStock, newStock > 0, detail.productId]
				);
			} else {
				throw new Error(`Product with ID${detail.productId} not found`)
			}
		}

		await db.query("COMMIT"); // Confirmar transacción
		return purchaseId;
	} catch (error) {
		await db.query("ROLLBACK"); // Revertir transacción en caso de error
		throw error;
	} finally {
		db.release();
	}
}

// Obtener todas las compras
export async function getAllPurchases() {
	const db = await connectDB();
	try {
		const purchases = await db.query(`SELECT * FROM purchase`);
		return purchases.rows;
	} finally {
		db.release();
	}
}

// Obtener detalles de una compra específica
export async function getPurchaseById(purchaseId: number) {
	const db = await connectDB();
	try {
		const purchase = await db.query(
			`SELECT * FROM purchase WHERE purchase_id = $1`,
			[purchaseId]
		);
		const details = await db.query(
			`SELECT * FROM purchasedetails WHERE purchase_id = $1`,
			[purchaseId]
		);

		return { purchase: purchase.rows[0], details: details.rows };
	} finally {
		db.release();
	}
}

// Actualizar una compra
export async function updatePurchase(purchaseId: number, purchase: IPurchase) {
	const db = await connectDB();
	try {
		const result = await db.query(
			`UPDATE purchase
			 SET customer_id = $1, purchase_amount = $2, purchase_paid = $3, purchase_paid_date = $4
			 WHERE purchase_id = $5 RETURNING *`,
			[
				purchase.customerId,
				purchase.totalAmount,
				purchase.paid,
				purchase.paidDate || null,
				purchaseId,
			]
		);
		return result.rowCount;
	} finally {
		db.release();
	}
}
