const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });

