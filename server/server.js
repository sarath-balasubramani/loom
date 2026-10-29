const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./models/Product");
const Subscriber = require("./models/Subscriber");

const app = express();
const PORT = process.env.PORT || 5000;

const catalogue = [
  { name: "Stoneware Mug", cat: "Kitchen",
    price: 1200, tile: "#DCE4E0", shape: "mug", feat: true,
    batch: "LL-0412", colors: ["#4A5A63", "#CDBFA0", "#5E7357"] },
  { name: "Walnut Serving Board", cat: "Kitchen",
    price: 2800, mrp: 3200, tag: "Sale", tile: "#E7DFD3",
    shape: "board", feat: true, batch: "LL-0388",
    colors: ["#6B4A33", "#C79A63"] },
  { name: "Handloom Linen Throw", cat: "Textiles",
    price: 4500, tile: "#E2E3EC", shape: "throw", feat: true,
    batch: "LL-0431", colors: ["#34467F", "#B5573A", "#8E9490"] },
  { name: "Brass Task Lamp", cat: "Lighting",
    price: 6900, tag: "New", tile: "#E9E5D6", shape: "lamp",
    feat: true, batch: "LL-0440", colors: ["#C99A2E", "#26292B"] },
  { name: "Waxed Canvas Tote", cat: "Carry & Desk",
    price: 2400, tile: "#E3E4D8", shape: "tote",
    batch: "LL-0397", colors: ["#5B6140", "#243452", "#BDAE8A"] },
  { name: "Cast Iron Skillet", cat: "Kitchen",
    price: 3600, tile: "#DEDFDC", shape: "skillet",
    batch: "LL-0359", colors: ["#2C2D30"] },
  { name: "Glazed Planter", cat: "Home",
    price: 1800, tile: "#E1E6DC", shape: "planter",
    batch: "LL-0425", colors: ["#E4E1D6", "#2B4AA8", "#9CB8A5"] },
  { name: "Stitch-bound Notebooks, Set of 3", cat: "Carry & Desk",
    price: 750, tile: "#E6E2DA", shape: "notebook",
    batch: "LL-0402", colors: ["#2E3A66", "#2F5A47", "#A8573E"] },
  { name: "Oak Three-Leg Stool", cat: "Home",
    price: 7800, mrp: 8800, tag: "Sale", tile: "#E8E2D6",
    shape: "stool", batch: "LL-0377",
    colors: ["#C9A271", "#6A5037"] },
  { name: "Glass Carafe and Tumbler", cat: "Kitchen",
    price: 1650, tile: "#DCE4E8", shape: "carafe",
    batch: "LL-0418", colors: ["#A9C7D6", "#8B8F95"] },
  { name: "Beeswax Taper Candles, Set of 6", cat: "Lighting",
    price: 980, tag: "New", tile: "#E4E0D4", shape: "candles",
    batch: "LL-0444", colors: ["#E3B94F", "#EFE6C8", "#3A3A3A"] },
  { name: "Waffle Towel Pair", cat: "Textiles",
    price: 1350, tile: "#E0E5E0", shape: "towels",
    batch: "LL-0409", colors: ["#8EA796", "#D9D6CC", "#2B3A5C"] }
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Loom & Lathe Backend!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Loom & Lathe API is running"
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Unable to load products"
    });
  }
});

app.post("/api/subscribers", async (req, res) => {
  const email = String(req.body.email || "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      message: "Enter a valid email address."
    });
  }
  try {
    await Subscriber.updateOne(
      { email: email.toLowerCase() },
      { $set: { email: email.toLowerCase() } },
      { upsert: true }
    );
    res.status(201).json({
      message: "You are on the list"
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to subscribe"
    });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully!");

    if (await Product.countDocuments() === 0) {
      await Product.insertMany(catalogue);
      console.log("Catalogue seeded");
    }

    app.listen(PORT, () => {
      console.log(
        `Loom & Lathe server running on port ${PORT}`
      );
    });
  })
  .catch(error => {
    console.error(
      "Database connection failed:",
      error.message
    );
  });
