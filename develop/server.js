const express = require("express");
const path = require("path");
const store = require("./db/Store")


noteInfo = require("./db/db.json");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(noteInfo)
})


app.post("api/notes", (req, res) => {

})

app.delete("api/notes", (req, res) => {

})

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });

//   router.post
//   .addNotes(req.body === note in our constructor)

//   removeNotes(req.params.id)