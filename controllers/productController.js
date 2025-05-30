const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    // Handle sizes
    let sizes = [];
    if (req.body.sizes) {
      try {
        sizes = typeof req.body.sizes === 'string' 
          ? JSON.parse(req.body.sizes) 
          : req.body.sizes;
      } catch (e) {
        return res.status(400).json({ error: 'Invalid sizes format' });
      }
    }

    // Handle image
    let imageData = null;
    if (req.file) {
      // Validate image type
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }
      
      // 2MB max size
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ error: 'Image too large (max 2MB)' });
      }

      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const product = new Product({
      name,
      description: description || '',
      price,
      category,
      sizes,
      image: imageData,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error('Fetch product by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Update fields
    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.category) product.category = req.body.category;

    // Handle sizes
    if (req.body.sizes) {
      try {
        product.sizes = typeof req.body.sizes === 'string' 
          ? JSON.parse(req.body.sizes) 
          : req.body.sizes;
      } catch (e) {
        return res.status(400).json({ error: 'Invalid sizes format' });
      }
    }

    // Handle image update
    if (req.file) {
      // Validate image
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ error: 'Image too large (max 2MB)' });
      }

      product.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    await product.save();
    res.status(200).json({ message: 'Product updated', product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
