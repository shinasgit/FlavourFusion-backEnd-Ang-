const express = require('express')
const recipeController = require("../controllers/recipeController")
const userController = require("../controllers/userController")
const router = express.Router()

router.get('/api/allRecipes',recipeController.getAllRecipe)

router.post('/api/register',userController.regUser)

router.post('/api/login',userController.loginUser)

router.get('/api/view-Recipe/:id',recipeController.GetARecipe)


module.exports = router