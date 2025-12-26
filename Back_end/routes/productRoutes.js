const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//route POST /api/produts
// create a new product
// @access private /admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      counterInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigth,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      counterInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigth,
      sku,
      user: req.user._id, // reference to the admin user who created it
    });
    const createdProduct = await product.save();
    res.status(201).json({
      message: "Succesfully created",
      createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// route PUT /api/products.:id
// update an existing prouct Id
// access private admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      counterInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // find product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      //update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.counterInStock = counterInStock || product.counterInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimension = dimensions || product.dimension;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      //save the updated peoduct
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not FOUND" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ROUTE DELETE /api/products/:id
// delete a product by ID
// access private/admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // find the product Id
    const product = await Product.findById(req.params.id);

    if (product) {
      // remove the DB
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//route GET/api/products
//desc get all products with optional query filters
//access public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = { $in: [gender] };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceASC":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "polpularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // fetch product and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server Error");
  }
});

// route GET /api/product/best seller
// desc retrieve the productwith highest rating
// access public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "no best seller found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//route get /api/product/new-arrivals
//desc retrieve latest 8 products - creation date
//access public

router.get("/new-arrivals", async (req, res) => {
  try {
    //fetch latest 8 productc
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//get api/products/:id
//desc get a single product ID
// Accss public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//route GET/api/products.similar/:id
// retirved simliar products based on the current product gender and category
//access public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProduct = await Product.find({
      _id: { $ne: id }, //exculed the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
