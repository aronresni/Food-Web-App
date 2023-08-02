const { Router } = require('express');
const { appendFile } = require('fs');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesController = require('../controllers/recipes/getrecipesIdController');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:id", recipesController.getRecipeId)

module.exports = router;
