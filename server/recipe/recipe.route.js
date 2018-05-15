const express = require("express");
const router = express.Router();
const config = require("../../config/database");

//User Model
const Recipe = require("../../server/recipe/recipe.model");

router.post("/recipe", (req, res, next)=>{
    
    let newRecipe = new Recipe({
        title: req.body.title,
        image_url: req.body.image_url,
        description: req.body.description,
        cuisines: req.body.cuisines,
        category: req.body.category,
        subcategory: req.body.subcategory,
        microcategory: req.body.microcategory,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        extra_time: req.body.extra_time,
        ready_time: req.body.ready_time,
        servings: req.body.servings,
        ingredients:req.body.ingredients,
        directions:req.body.directions,
        private: req.body.private
    });


    Recipe.addRecipe(newRecipe, (err, recipe)=>{
        if(err){
            res.json({success:false, msg:"Faild to register user"});
        }else{
            res.json({success:true, msg:"Successfully added a recipe!"});
        }
    });
    
});

router.get("/recipe", (req, res, next)=>{
     Recipe.getRecipes((err, recipe)=>{
        if(err){
            res.json({success:false, msg:"Faild to register user"});
        }else{
            res.json({recipe, success:true, msg:"User Registered"});
        }
    })
});

router.get("/recipe/:id", (req, res, next)=>{
    let id = req.params.id;
     Recipe.getRecipe(id, (err, recipe)=>{
        if(err){
            res.json({success:false, msg:"Faild to register user"});
        }else{
            res.json({recipe, success:true, msg:"User Registered"});
        }
    })
});

router.put("/recipe/:id", (req, res, next)=>{
    let id = req.params.id;
    

     Recipe.updateRecipe(id, req.body, (err, recipe)=>{
        if(err){
            res.json({success:false, msg:"Faild to register user"});
        }else{
            res.json({recipe, success:true, msg:"User Registered"});
        }
    })
});

router.delete("/recipe/:id", (req, res, next)=>{
    let id = req.params.id;
    
     Recipe.deleteRecipe(id, (err, recipe)=>{
        if(err){
            res.json({success:false, msg:"Faild to register user"});
        }else{
            res.json({recipe, success:true, msg:"User Registered"});
        }
    })
});


module.exports = router; 