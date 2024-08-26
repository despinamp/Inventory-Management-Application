const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/addcategory", categoriesController.addCategoryGet);
categoriesRouter.post("/addcategory", categoriesController.addCategoryPost);
categoriesRouter.post("/deletecategory/:categoryid", categoriesController.deleteCategory);
categoriesRouter.get("/:categoryid", categoriesController.getSpecificCategory);
categoriesRouter.get("/updatecategory/:categoryid", categoriesController.updateCategoryGet);
categoriesRouter.post("/updatecategory/:categoryid", categoriesController.updateCategoryPost);
module.exports = categoriesRouter;