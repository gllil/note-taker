const uuidv1 = require("uuid/v1");
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
       return readFileAsync("db/db.json", "utf8");
    }

    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.stringify)
                
            } catch (error) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNotes(note){
        const { title, text } = note;

        if(!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank")
        }

        const newNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }   

    removeNotes(id){
        return this.getNotes() 
            .then(notes => notes.filter(note => notes.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();