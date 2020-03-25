const express = require("express");
const path = require("path");
const store = require("./db/Store")


let noteInfo = require("./db/db.json");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    res.json(noteInfo);
})


app.post("api/notes", (req, res) => {
    store.addNotes(noteInfo.push(req.body));
    res.json(noteInfo);
})

app.delete("api/notes/:id", (req, res) => {
    store.removeNotes(req.params.id);
    res.json(noteInfo);
})

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });

//   router.post
//   .addNotes(req.body === note in our constructor)

//   removeNotes(req.params.id)