import { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Category = Schema(
  {
    name: String,
  }
);

const CategoryModel = mongoose.model('Category', Category);
const CategoryTC = composeWithMongoose(CategoryModel);

module.exports = {
    Category: Category,
    CategoryTC: CategoryTC,
};