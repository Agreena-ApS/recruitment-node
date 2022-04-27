import colors from "colors/safe";
import { Seeder } from "mongo-seeding";
import config from "config";
const dbConfig = {
  database: `${config.get("db")}`,
  dropDatabase: false,
};

const seeder = new Seeder(dbConfig);
import * as path from "path";
const collections = seeder.readCollectionsFromPath(path.resolve("./seeders"));

(async () => {
  console.log(colors.bold("Seeding data started . . ."));
  try {
    collections.map((c) => c.name).forEach((c) => console.log(colors.green(c)));
    await seeder.import(collections);
    console.log(colors.bold("Seed data imported successfully"));
  } catch (err) {
    console.log(err);
  }
})();
