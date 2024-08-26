const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

const app = express();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
app.get("/", (req, res) => {
    res.render("index");
})
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`inventory management app running on port ${PORT}`));