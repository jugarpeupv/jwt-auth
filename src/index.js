require("dotenv").config();
const app = require("./app");
require("./database");
// settings
app.set("port", process.env.PORT || 2020);

// main function to  avoid  callback from listen process
async function main() {
  await app.listen(app.get("port"));
  console.log(`Server listening on port: ${app.get("port")}`);
}
// important to call the function
main();
