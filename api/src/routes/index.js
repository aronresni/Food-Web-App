const { Router } = require('express');
const { appendFile } = require('fs');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesControllerId = require('../controllers/recipes/getrecipesIdController');
const recipesControllerName = require("../controllers/recipes/getrecipesNameController")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:id", recipesControllerId.getRecipeId)
router.get("/recipes/:name", recipesControllerName.getRecipeName)

module.exports = router;
