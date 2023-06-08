const app = require("./app");

const { db } = require("./database/db");

db.authenticate()
  .then(() => console.log("database authenticated "))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("database synced "))
  .catch((err) => console.log(err));

  app.listen(3000, () =>{
    console.log('Server Running ')
  })