const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const titleLengthErr = "must be between 1 and 100 characters!"
const descrLengthErr = "must be between 1 and 800 characters!"
const validateItem = [
    body("itemTitle").trim()
        .isLength({ min: 1, max: 50 }).withMessage((value, { req }) => `Item title ${titleLengthErr}.`),
    body("itemDescription").trim()
        .isLength({ min: 1, max: 500 }).withMessage((value, { req }) => `Item description ${descrLengthErr}.`)
        .escape()

]

exports.getAllItems = async (req, res) => {
    const items = await db.getAllItems();
    res.render("allitems", { items: items });
}

exports.addItemGet = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("createitem", { categories: categories });
}

exports.addItemPost = [validateItem, async (req, res) => {
    const errors = validationResult(req);
    const categories = await db.getAllCategories();
    if (!errors.isEmpty()) {
        return res.status(400).render("createitem", { categories: categories, errors: errors.array() });
    }
    const { itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory } = req.body;
    await db.CreateItem(itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory);
    res.redirect("/categories/" + itemCategory);
}]
exports.updateItemGet = async (req, res) => {
    const itemId = req.params.itemid;
    const categories = await db.getAllCategories();
    const item = await db.getSpecificItem(itemId);
    res.render("updateitem", { itemId: itemId, item: item, categories: categories });
}

exports.updateItemPost = [validateItem, async (req, res) => {
    const errors = validationResult(req);
    const itemId = req.params.itemid;
    const categories = await db.getAllCategories();
    const item = await db.getSpecificItem(itemId);
    if (!errors.isEmpty()) {
        res.status(400).render("updateitem", { itemId: itemId, item: item, categories: categories, errors: errors.array() })
    }
    const { itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory } = req.body;
    await db.updateItem(itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory, itemId);
    res.redirect("/items/" + itemId);
}]

exports.getSpecificItem = async (req, res) => {
    const itemId = req.params.itemid;
    const item = await db.getSpecificItem(itemId);
    const itemcategoryid = item[0].categoryid;
    const itemCategory = await db.getSpecificCategoryInfo(itemcategoryid);
    const categoryTitle = itemCategory[0].title;
    res.render("specificitem", { item: item, itemId: itemId, categoryTitle: categoryTitle });
}

exports.deleteItem = async (req, res) => {
    const itemId = req.params.itemid;
    const item = await db.getSpecificItem(itemId);
    const itemCategory = item[0].categoryid;
    await db.deleteItem(itemId);
    res.redirect("/categories/" + itemCategory);
}
