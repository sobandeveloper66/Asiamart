import express from 'express';
import { getProducts, findProductById, saveProduct, updateProduct, deleteProductById, seedProducts } from '../config/dbHelper.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all catalog products with search, country, and category filters
router.get('/', async (req, res) => {
  const { country, category, search, minPrice, maxPrice } = req.query;
  
  try {
    const products = await getProducts({ country, category, search, minPrice, maxPrice });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get specific product detail
router.get('/:id', async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found', message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   POST /api/products
// @desc    Add a new product
router.post('/', async (req, res) => {
  const { name, category, country, price, originalPrice, description, images, stock, specifications, boxContents } = req.body;

  try {
    const cleanId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check if ID exists
    let existing = await findProductById(cleanId);
    const productSlug = existing ? `${cleanId}-${Date.now()}` : cleanId;

    const discountVal = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const newProduct = {
      id: productSlug,
      name,
      category,
      country,
      description,
      images: images || ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'],
      price,
      originalPrice: originalPrice || price,
      discount: discountVal,
      stock,
      specifications: specifications || {},
      boxContents: boxContents || ['Standard packaging box'],
      newArrival: true,
      rating: 5,
      reviewsCount: 0
    };

    const product = await saveProduct(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update an existing product
router.put('/:id', async (req, res) => {
  const { name, price, originalPrice, stock, description, specifications, boxContents, category, country } = req.body;

  try {
    let product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found', message: 'Product to update not found.' });
    }

    const discountVal = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const updatedData = {
      name: name || product.name,
      price: price !== undefined ? price : product.price,
      originalPrice: originalPrice !== undefined ? originalPrice : product.originalPrice,
      discount: discountVal,
      stock: stock !== undefined ? stock : product.stock,
      description: description || product.description,
      specifications: specifications || product.specifications,
      boxContents: boxContents || product.boxContents,
      category: category || product.category,
      country: country || product.country
    };

    const updatedProduct = await updateProduct(req.params.id, updatedData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await deleteProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found', message: 'Product to delete not found.' });
    }
    res.json({ message: 'Product successfully deleted from catalog database.' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   POST /api/products/seed
// @desc    Seeding route to initialize catalog database with mock products
router.post('/seed', async (req, res) => {
  try {
    const seedResult = await seedProducts();
    if (seedResult.skipped) {
      return res.json({ message: 'Database already has product listings. Seeding skipped.' });
    }
    res.json({ message: 'Products seeded successfully into database!' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

export default router;
