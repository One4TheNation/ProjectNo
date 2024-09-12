const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let ThoughtCheck = await connection.db
    .listCollections({ name: "Thoughts" })
    .toArray();
  if (ThoughtCheck.length) {
    await connection.dropCollection("Thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [];
  const Thoughts = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.insertMany(users);
  await Thought.insertMany(Thoughts);

  // loop through the saved Thoughts, for each Thought we need to generate a Thought response and insert the Thought responses
  console.table(users);
  console.table(Thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
