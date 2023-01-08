import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Category = mongoose.Schema(
  {
    name: String,
  }
);

export const CategoryModel = mongoose.model('Category', Category);
export const CategoryTC = composeWithMongoose(CategoryModel);

