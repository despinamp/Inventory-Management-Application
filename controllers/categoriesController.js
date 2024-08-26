const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters!"
const validateCategory = [
    body("categoryTitle").trim()
        .isLength({ min: 1, max: 30 }).withMessage(`Category title ${lengthErr}`)


]

exports.getAllCategories = async (req, res) => {
    const categories = await db.getAllCategories();

    res.render("allcategories", { categories: categories });
}

exports.addCategoryGet = async (req, res) => {
    res.render("createcategory");
}

exports.addCategoryPost = [validateCategory, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("createcategory", { errors: errors.array() });
    }
    const { categoryTitle } = req.body;
    await db.CreateCategory(categoryTitle);
    res.redirect("/categories");
}];

exports.getSpecificCategory = async (req, res) => {
    const categoryId = req.params.categoryid;
    const categoryitems = await db.getSpecificCategory(categoryId);
    const categoryinfo = await db.getSpecificCategoryInfo(categoryId);
    const categorytitle = categoryinfo[0].title;
    res.render("specificcategory", { categoryItems: categoryitems, categoryId: categoryId, categoryTitle: categorytitle })
}

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryid;
    await db.deleteCategory(categoryId);
    res.redirect("/categories");
}
exports.updateCategoryGet = async (req, res) => {
    const categoryId = req.params.categoryid;
    const category = await db.getSpecificCategoryInfo(categoryId);
    res.render("updatecategory", { category: category, categoryId: categoryId });
}

exports.updateCategoryPost = [validateCategory, async (req, res) => {
    const categoryId = req.params.categoryid;
    const category = await db.getSpecificCategoryInfo(categoryId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("updatecategory", { category: category, categoryId: categoryId, errors: errors.array() })
    }
    const { categoryTitle } = req.body;
    await db.updateCategory(categoryTitle, categoryId);
    res.redirect("/categories/" + categoryId);
}];

