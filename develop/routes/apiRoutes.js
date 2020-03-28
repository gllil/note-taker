const router = require("express").Router();
const store = require("../db/store");

router.get("/api/notes", (req, res) => {
    store.retrieveNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/api/notes", (req, res) => {
    store.createNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

router.delete("/api/notes/:id", (req, res) => {
    store.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;