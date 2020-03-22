const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("/api/notes", (res, req) => {
    return res.json(notes)
})