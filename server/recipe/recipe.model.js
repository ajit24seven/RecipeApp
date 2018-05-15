const mongoose = require("mongoose");
const config = require("../../config/database");

//Recipe Schema
const RecipeSchema = mongoose.Schema({
      
      title:            { type:String, require:true },
      description:      { type:String, require:true },
      cuisines:         { type:String, require:true },
      category:         { type:String, require:true },
      subcategory:      { type:String, require:true },
      microcategory:    { type:String, require:true },
      web_url:          { type:String, require:true },
      image_url:        { type:String, require:true },
      review_count:     { type:String, require:true },
      medal_count:      { type:String, require:true },
      favorite_count:   { type:String, require:true },
      servings:         { type:String, require:true },
      ingredients:      { type: [{type:String, require:true}]},
      directions:       { type: [{type:String, require:true}]},
      created_at:       { type: Date, default: Date.now, require:true },
      updated_at:       { type: Date, default: Date.now, require:true },
      rating:           { type:String, require:true },
      prep_time:        { type:String, require:true },
      cook_time:        { type:String, require:true },
      extra_time:       { type:String, require:true },
      ready_time:        { type:String, require:true },
      private:          { type:String, require:true },
      user_id:          { type:Number, require:true }
    
});

const Recipe = module.exports = mongoose.model("Recipe", RecipeSchema);

/* CREATE RECIPE */
module.exports.addRecipe = function(newRecipe, callback){   
    console.log(newRecipe)
    newRecipe.recipe_id = newRecipe.id;
    Recipe.create(newRecipe, callback); 
};

/* ALL RECIPE */
module.exports.getRecipes = function(callback){
    Recipe.find(callback);
};

/* SINGLE UPDATE RECIPE */
module.exports.getRecipe = function(id, callback){
    Recipe.findById(id, callback);
};

/* UPDATE RECIPE */
module.exports.updateRecipe = function(id, newRecipe, callback){
    Recipe.findByIdAndUpdate(id, newRecipe, callback);
};


/* DELETE RECIPE */
module.exports.deleteRecipe = function(id, callback){
    var query = {_id:id}
    Recipe.findByIdAndRemove(id, callback);
};

