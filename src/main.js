const notesContainer = document.getElementById('app');
const addNotesBtn = notesContainer.querySelector('.add');

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotesBtn);
});

addNotesBtn.addEventListener("click", () => addNote());
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || '[]');
};

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
};

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add('note');
    element.value = content;
    element.placeholder = 'Empty Note';

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const deleteAsk = confirm('Do you really want to delete it?');
        if (deleteAsk) {
            deleteNote(id, element);
        }
    });

    return element;
};

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
};

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
};

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNotesBtn);

    notes.push(noteObject);
    saveNotes(notes);
};

