import express, { Request, Response } from "express";
import {
	validateBulkCreateProducts,
	validateCreateProduct,
	validateProductId,
	validateUpdateProduct,
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
import { log } from "console";

const router = express.Router();

// POST: Crear un nuevo producto
router.post(
	"/",
	validateCreateProduct, // Validaciones de creación de productos
	validate, // Middleware para manejar resultados de validación
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

// GET: Obtener un producto por su ID
router.get(
	"/:id",
	validateProductId, // Validación del ID del producto
	validate, // Middleware para manejar resultados de validación
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
	validateUpdateProduct, // Validaciones para la actualización de productos
	validate, // Middleware para manejar resultados de validación
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
			console.log("Error al crear los productos: ", error);
			res
				.status(500)
				.json({ error: "Hubo un error en la creación de productos" });
		}
	}
);

router.put(
	"/updatePrice",
	validateUpdateProduct,
	validate,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const {price, category} = req.body;
			await updatePriceProducts(price, category);
			res.status(200).json({ message: "Precios actualizados con éxito"});
		} catch (error) {
			console.log("Error al actualizar los precios: ", error);
			res.status(500).json({message: "Error al actualizar los precios"})
		}
	}
);

export default router;
