const { Router } = require('express');
const reciperoutes = require("./recipesRouter");
const dietroutes = require("./dietRouter")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", reciperoutes);
router.use("/diet", dietroutes);

module.exports = router;
