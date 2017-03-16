var mongoose = require("mongoose");

var categorySchema = {
  _id: { type: String },
  parent: {
    type: String,
    ref: 'Category'
  },
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
};

var category = mongoose.Schema(categorySchema);
module.exports={
    category , categorySchema
}