const colors = require("colors/safe");
const { Seeder } = require("mongo-seeding");
const config = require("config");
const dbConfig = {
  database: config.get("db"),
  dropDatabase: false,
  dropCollections: true,
};

const seeder = new Seeder(dbConfig);

const path = require("path");
const collections = seeder.readCollectionsFromPath(path.resolve("./dist/seeders"));

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
