const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();

app.listen(5000, () => {
  console.log("Server is successfully running on port 5000");
});
