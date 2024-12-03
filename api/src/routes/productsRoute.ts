import express, { Request, Response } from "express";
import {
	validateBulkCreateProducts,
	validateCreateProduct,
	validateProductId,
	validateUpdateProduct,
	validateUpdatePrice
} from "../middlewares/productsValidator.js";
import { validate } from "../middlewares/validate.js";
import {
	createProduct,
	deleteProductById,
	getAllProducts,
	getProductById,
	updateProduct,
	bulkCreateProducts,
	updatePriceProducts,
} from "../services/productsService.js";

const router = express.Router();

/** Rutas específicas */
// POST: Crear múltiples productos (bulk)
router.post(
	"/bulk",
	validateBulkCreateProducts,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const products = req.body;
			await bulkCreateProducts(products);
			res.status(201).json({ message: "Productos creados con éxito" });
		} catch (error) {
			console.error("Error al crear los productos:", error);
			res.status(500).json({ error: "Error en la creación de productos" });
		}
	}
);

// PUT: Actualizar precios de productos por categoría
router.put(
	"/updatePrice",
	validateUpdatePrice,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { price, category } = req.body;
			await updatePriceProducts(price, category);
			res.status(200).json({ message: "Precios actualizados con éxito" });
		} catch (error) {
			console.error("Error al actualizar los precios:", error);
			res.status(500).json({ message: "Error al actualizar los precios" });
		}
	}
);

/** Rutas generales */
// POST: Crear un nuevo producto
router.post(
	"/",
	validateCreateProduct,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const productId = await createProduct(req.body);
			res
				.status(201)
				.json({ message: "Producto creado con éxito", product_id: productId });
		} catch (error) {
			console.error("Error al crear el producto:", error);
			res.status(500).json({ error: "Error al crear el producto" });
		}
	}
);

// GET: Obtener todos los productos
router.get("/", async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await getAllProducts();
		res.status(200).json(products);
	} catch (error) {
		console.error("Error al obtener los productos:", error);
		res.status(500).json({ error: "Error al obtener los productos" });
	}
});

/** Rutas dinámicas */
// GET: Obtener un producto por su ID
router.get(
	"/:id",
	validateProductId,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const product = await getProductById(parseInt(id));
			if (product) {
				res.status(200).json(product);
			} else {
				res.status(404).json({ message: "Producto no encontrado" });
			}
		} catch (error) {
			console.error("Error al obtener el producto:", error);
			res.status(500).json({ error: "Error al obtener el producto" });
		}
	}
);

// PUT: Actualizar un producto
router.put(
	"/:id",
	validateUpdateProduct,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const updated = await updateProduct(parseInt(id), req.body);
			if (updated) {
				res.status(200).json({ message: "Producto actualizado con éxito" });
			} else {
				res.status(404).json({ message: "Producto no encontrado" });
			}
		} catch (error) {
			console.error("Error al actualizar el producto:", error);
			res.status(500).json({ error: "Error al actualizar el producto" });
		}
	}
);

// DELETE: Eliminar un producto por su ID
router.delete(
	"/:id",
	validateProductId,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const deleted = await deleteProductById(parseInt(id));
			if (deleted) {
				res.status(200).json({ message: "Producto eliminado con éxito" });
			} else {
				res.status(404).json({ message: "Producto no encontrado" });
			}
		} catch (error) {
			console.error("Error al eliminar el producto:", error);
			res.status(500).json({ error: "Error al eliminar el producto" });
		}
	}
);

export default router;
