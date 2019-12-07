const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const path = require("path");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const auth = require("./routes/api/auth");
const app = express();

connectDB();

//Init middleware(bodyparser)
app.use(express.json({ extended: false }));

//define routes

app.use(auth);
app.use(posts);
app.use(profile);
app.use(users);

//serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("social app has started");
});
