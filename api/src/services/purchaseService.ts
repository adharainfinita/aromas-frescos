import { connectDB } from "../db/db";

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
export async function createPurchase(
	purchase: IPurchase,
	details: IPurchaseDetail[]
) {
	const db = await connectDB();

	try {
		await db.run("BEGIN TRANSACTION"); // Iniciar transacción

		// Insertar la compra
		const result = await db.run(
			`INSERT INTO Purchase (customer_id, purchase_amount, purchase_paid, purchase_paid_date)
       VALUES (?, ?, ?, ?)`,
			[
				purchase.customerId,
				purchase.totalAmount,
				purchase.paid,
				purchase.paidDate || null,
			]
		);
		const purchaseId = result.lastID;

		// Insertar detalles de la compra
		for (const detail of details) {
			await db.run(
				`INSERT INTO PurchaseDetails (purchase_id, product_id, quantity, price_per_unit)
         VALUES (?, ?, ?, ?)`,
				[purchaseId, detail.productId, detail.quantity, detail.pricePerUnit]
			);

			//Reducir el stock del producto
			const product = await db.get(
				`SELECT stock FROM products WHERE product_id = ?`,
				[detail.productId]
			);

			if (product) {
				const newStock = product.stock - detail.quantity;

				//Actualizar el estado del producto
				await db.run(
					`
          UPDATE products SET stock = ?, available = ? WHERE product_id = ?`,[
						newStock, newStock > 0, detail.productId
					]
				);
			}
		}

		await db.run("COMMIT"); // Confirmar transacción
		return purchaseId;
	} catch (error) {
		await db.run("ROLLBACK"); // Revertir transacción en caso de error
		throw error;
	}
}

// Obtener todas las compras
export async function getAllPurchases() {
	const db = await connectDB();
	const purchases = await db.all(`SELECT * FROM Purchase`);
	return purchases;
}

// Obtener detalles de una compra específica
export async function getPurchaseById(purchaseId: number) {
	const db = await connectDB();
	const purchase = await db.get(
		`SELECT * FROM Purchase WHERE purchase_id = ?`,
		[purchaseId]
	);
	const details = await db.all(
		`SELECT * FROM PurchaseDetails WHERE purchase_id = ?`,
		[purchaseId]
	);

	return {
		purchase,
		details,
	};
}

// Actualizar una compra
export async function updatePurchase(purchaseId: number, purchase: IPurchase) {
	const db = await connectDB();
	const result = await db.run(
		`UPDATE Purchase
     SET customer_id = ?, purchase_amount = ?, purchase_paid = ?, purchase_paid_date = ?
     WHERE purchase_id = ?`,
		[
			purchase.customerId,
			purchase.totalAmount,
			purchase.paid,
			purchase.paidDate || null,
			purchaseId,
		]
	);
	return result.changes! > 0;
}
