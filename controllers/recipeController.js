const Recipe = require("../models/recipeModel")

exports.getAllRecipe = async(req,res)=>{
    console.log("inside get recipe")
    try {
        const allRecipe = await Recipe.find()
        res.status(200).json(allRecipe)
    } catch (error) {
        res.status(500).json("Error"+error)
    }
}

exports.GetARecipe = async(req,res)=>{
    console.log("Inside get a recipe");
    const {id} = req.params
    console.log(id);
    try {
        const ARecipe = await Recipe.findOne({_id:id})
        res.status(200).json(ARecipe)
        
    } catch (error) {
        res.status(500).json("Error"+error)
    }
    
}