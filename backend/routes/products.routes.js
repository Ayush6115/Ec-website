const express = require('express');
const router = express.Router();
const Products = require('../models/products.model');
const jwtMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); 

// CREATE Product (Admin only)
router.post('/add-product', adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category || !imageUrl || stock === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Products({ name, description, price, category, imageUrl, stock });
    const createdProduct = await newProduct.save();

    res.status(200).json({
      message: 'Product Added Successfully',
      response: createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// READ Products (Public)
router.get('/products', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const allProducts = await Products.find(filter);

    res.status(200).json({
      message: 'Products successfully fetched',
      response: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    res.status(200).json({
      message: 'Product Fetched Successfully',
      response: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Public category filters
router.get('/products/category/men', async (req, res) => {
  try {
    const menProducts = await Products.find({ category: 'men' });
    res.status(200).json(menProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/products/category/women', async (req, res) => {
  try {
    const womenProducts = await Products.find({ category: 'women' });
    res.status(200).json(womenProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/products/category/kids', async (req, res) => {
  try {
    const kidsProducts = await Products.find({ category: 'kids' });
    res.status(200).json(kidsProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// UPDATE Product (Admin only)
router.put('/update-product/:id', adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, imageUrl, stock } = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { name, description, price, category, imageUrl, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    res.status(200).json({
      message: 'Product Updated Successfully',
      response: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE Product (Admin only)
router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    res.status(200).json({ message: 'Product Deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
