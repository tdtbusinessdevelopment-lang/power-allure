import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, image } = req.body;

    const product = await Product.create({
      title,
      image
    });

    res.json({
      message: "Product saved!",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
