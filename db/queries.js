const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY(id)");

    return rows;
}

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items ORDER BY(id)");
    return rows;
}

async function getSpecificCategoryInfo(categoryid) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE categories.id=($1)", [categoryid]);
    return rows;
};

async function getSpecificCategory(categoryid) {
    const { rows } = await pool.query("SELECT * FROM items WHERE items.categoryid= ($1) ORDER BY(id)", [categoryid]);
    return rows;

};

async function getSpecificItem(itemid) {
    const { rows } = await pool.query("SELECT * FROM items WHERE items.id=($1)", [itemid]);
    return rows;
};

async function CreateCategory(categoryTitle) {
    await pool.query("INSERT INTO categories (title) VALUES ($1)", [categoryTitle]);

}

async function CreateItem(itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory) {
    await pool.query("INSERT INTO items (title,description,price,quantity,categoryid) VALUES ($1,$2,$3,$4,$5)", [itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory]);

}

async function deleteCategory(categoryid) {
    await pool.query("DELETE FROM categories WHERE id=($1)", [categoryid]);
}

async function deleteItem(itemid) {
    await pool.query("DELETE FROM items WHERE id=($1)", [itemid]);
}

async function updateItem(itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory, itemId) {
    await pool.query("UPDATE items SET title=($1),description=($2),price=($3),quantity=($4),categoryid=($5) WHERE id=($6)", [itemTitle, itemDescription, itemPrice, itemQuantity, itemCategory, itemId])
}

async function updateCategory(categoryTitle, categoryId) {
    await pool.query("UPDATE categories SET title=($1) WHERE id=($2)", [categoryTitle, categoryId])
}

module.exports = { getSpecificCategoryInfo, getAllCategories, getAllItems, getSpecificCategory, getSpecificItem, CreateCategory, CreateItem, deleteCategory, deleteItem, updateItem, updateCategory };