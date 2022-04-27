import mongoose from "mongoose";
import config from "config";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAutoPopulate from "mongoose-autopopulate";
mongoose.plugin(mongooseAutoPopulate);
mongoose.plugin(mongoosePaginate);

export async function connectDb() {
  const db: string = config.get("db");
  await mongoose.connect(db, config.get("dbOptions"), () => {
    console.info(`Connected to ${db}`);
  });
}
