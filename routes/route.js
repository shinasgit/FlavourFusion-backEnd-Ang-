const express = require('express')
const recipeController = require("../controllers/recipeController")
const userController = require("../controllers/userController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const savedController = require("../controllers/savedController")

const router = express.Router()


router.get('/api/allRecipes',recipeController.getAllRecipe)

router.post('/api/register',userController.regUser)

router.post('/api/login',userController.loginUser)

router.get('/api/view-Recipe/:id',recipeController.GetARecipe)

router.get(`/api/relatedrecipe`,recipeController.getRelatedRecipe)

router.post(`/api/savedrecipe/:id`,jwtMiddleware,savedController.addToSavedRecipe)

router.get(`/api/getsavedrecipe`,jwtMiddleware,savedController.getSavedRecipe)

router.delete(`/api/deletesavedrecipe/:id`,jwtMiddleware,savedController.deleteSavedRecipe)




module.exports = router