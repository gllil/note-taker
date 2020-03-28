const uuidv1 = require("uuid/v1");
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
       return readFileAsync("./db.json", "utf8");
    }

    write(note){
        return writeFileAsync("./db.json", JSON.stringify(note));
    }

    retrieveNotes(){
        return this.read().then(notes => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes))
                
            } catch (error) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    createNote(note){
        const { title, text } = note;

        if(!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank")
        }

        const newNote = { title, text, id: uuidv1() };

        return this.retrieveNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }   

    deleteNote(id){
        return this.retrieveNotes() 
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();