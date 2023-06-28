const Product = require("../../../models/schema/productSchema");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create the product in the database
      const newProduct = Product.build({
        ...req.body,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create product" });
    }
  }
  if (req.method === "GET") {
    try {
      const products = await Product.findAll(); // Replace `Product` with your actual model name

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }
}
