const savedRecipes = require("../models/savedRecipeModel")

exports.addToSavedRecipe = async(req,res)=>{
    console.log("inside add to save recipe")
    const {id}= req.params
    const userId = req.payload
    const {name,image}= req.body
    try {
        const existingRecipe = await savedRecipes.findOne({id,userId})
        if(existingRecipe){
            res.status(402).json("Recipe is already Added")
        }else{
            const newRecipe = new savedRecipes({ recipeId:id,name,image,userId})
            await newRecipe.save()
            res.status(200).json("Recipe saved successfully",newRecipe)
        }
        res.status(200).json(allRecipe)
    } catch (error) {
        res.status(500).json("Error"+error)
    }
}

exports.getSavedRecipe = async(req,res)=>{
    console.log("Inside get saved");
    const userId = req.payload

    try {
        const existingRecipe = await savedRecipes.find({userId})
        
        res.status(200).json(existingRecipe)
    } catch (error) {
        res.status(500).json("Error"+error)
    }
}

exports.deleteSavedRecipe = async(req,res)=>{
    console.log("Inside deelete saved");
    const {id} = req.params

    try {
        const existingRecipe = await savedRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(existingRecipe,"Recipe deleted")

    } catch (error) {
        res.status(500).json("Error"+error)
    }
}
