const { Recipe } = require("../db")
const model = require("../controllers/recipes/recipeController");

async function getRecipeName(req, res) {
    const name = req.query.name;
    let recipeTotal = await model.getRecipeDb();
    if (name) {
        let recipeName = await recipeTotal.filter((el) =>
            el.name.toLowerCase().includes(name.toString().toLowerCase())
        );
        return recipeName;
    } else {
        return recipeTotal;
    }
}
module.exports = {
    getRecipeName
}