import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist"
import moment from "moment/moment";
import { DB, Util } from "./helper";


const $ = (elm) => document.querySelector(elm);
const $all = (elm) => document.querySelectorAll(elm);
const $createElm = (elm) => document.createElement(elm)
const log = (val) => console.log(val);

// Global variables
const newNoteBtn = $(".new-note-btn");
const delNoteBtn = $(".del-note-btn");
const searchBtn = $(".search-btn");
const editorMsg = $(".editor-msg");
const searchInp = $(".search-inp")

let createdNotesRenderer = $(".created-notes");

let activeNoteId = localStorage.getItem("active_note") ?? null;

delNoteBtn.onclick = deleteNote

// WYSIWYG editor config
const editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    placeholder: 'Type your note here.',
    onChange: (api, event) => {
        saveEditorjsContent()
    },
    onReady: () => {
        getActiveNoteEditorContent()
    },
    tools: {
        header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
                placeholder: 'Enter a header',
                levels: [1, 2, 3, 4],
                defaultLevel: 3
            }
        },
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        }
    },
});

// create new note button handler
newNoteBtn.onclick = () => {
    createNote()
}

// handler search button
let searchMode = false;
searchBtn.onclick = (e) => {
    newNoteBtn.classList.toggle("hidden")
    delNoteBtn.classList.toggle("hidden")
    if (searchMode) {
        searchInp.classList.remove("expand")
        searchInp.classList.add("not-expand")
        searchMode = false;
    }
    else {
        searchInp.classList.remove("not-expand")
        searchInp.classList.add("expand")
        searchMode = true;
    }
}
searchInp.onkeyup = (e) => handleSearch(e.target.value)

// handle creating of notes
function createNote() {
    const noteId = Util.uuid();
    const title = "New Note";
    const date = new Date();
    const formattedDate = moment().format('MMM Do YYYY, h:mm a');
    const description = "";


    // check first if key exists and update the data
    const noteExists = DB.get("notes");

    if (noteExists === null) {
        const dataSaved = DB.save("notes", [{
            id: noteId,
            title,
            date,
            description,
            formattedDate,
            editorCont: null
        }]);

        if (dataSaved === false) {
            alert("Error saving note, please try again.");
            return;
        }

        activeNoteId = noteId;

        // editor?.blocks?.render([])

        fetchAndRenderAllNotes();
    }
    else {
        const newNote = {
            id: noteId,
            title,
            date,
            description,
            formattedDate,
            editorCont: null
        }
        const combNotes = [...noteExists, newNote];

        const dataSaved = DB.save("notes", combNotes);

        if (dataSaved === false) {
            alert("Error saving note, please try again.");
            return;
        }
        activeNoteId = noteId;
        fetchAndRenderAllNotes()
        // editor?.blocks?.render([{}])
    }
}


// fetch all saved notes from local db
function fetchAndRenderAllNotes() {
    const allNotes = DB.get("notes") ?? [];
    if (allNotes.length === 0) {

        createdNotesRenderer.innerHTML = `
            <div class="msg">
                <p class="ppL flex-row"><ion-icon name="add"></ion-icon> Create Notes</p>
            </div>
        `
        editorMsg.classList.remove("hidden")
        editorMsg.classList.add("visible")
        newNoteBtn.classList.remove("disabled");
        newNoteBtn.removeAttribute("disabled");
        return;
    } else {
        editorMsg.classList.add("hidden")
        editorMsg.classList.remove("visible")

        // filter out empty notes
        const allNoteWithoutContent = allNotes.filter(n => n.editorCont === null);
        if (allNoteWithoutContent.length > 0) {
            // disable the create new note button
            newNoteBtn.classList.add("disabled");
            newNoteBtn.setAttribute("disabled", true);

        }
        else {
            newNoteBtn.classList.remove("disabled");
            newNoteBtn.removeAttribute("disabled");

        }

        createdNotesRenderer.innerHTML = ""
        allNotes.sort((a, b) => {
            if (a.date < b.date) return 1
            return -1
        }).map(d => {
            let card = $createElm("button");
            card.setAttribute("class", `card flex-col ${d.id === activeNoteId ? "active" : ""}`);
            card.setAttribute("data-id", d.id);
            card.onclick = handleNoteSelecting
            card.innerHTML = `
                <h2 class="title ppSB">${d.title}</h2>
                <div class="info flex-row">
                    <span class="note-createdAt ppMD">${d.formattedDate}</span>
                    <p class="subtitle ppMD">${Util.shortenWrd(d.description.length > 0 ? d.description : "Note additional text")}</p>
                </div>
            `
            createdNotesRenderer.append(card)
        })
    }
}

fetchAndRenderAllNotes()

// handle selecting of note
function handleNoteSelecting(e) {
    const dataset = e.target.dataset;
    const noteId = dataset["id"] ?? null;
    if (noteId === null) return;

    // delete any note that doesn't contain any content
    // check first if the selected note isn't the active selected note
    if (noteId !== activeNoteId) {
        const allNotes = DB.get("notes") ?? [];
        if (allNotes.length > 0) {
            const allNoteWithoutContent = allNotes.filter(n => n.editorCont === null);
            if (allNoteWithoutContent.length > 0) {
                const allNoteWithContent = allNotes.filter(n => n.editorCont !== null);

                const isNoteSaved = DB.save("notes", allNoteWithContent);

                localStorage.removeItem("active_note")

                if (isNoteSaved === false) {
                    alert("Empty notes could not be cleared.")
                }
                fetchAndRenderAllNotes()
            }
        }
    }


    activeNoteId = noteId;
    localStorage.setItem("active_note", noteId);
    fetchAndRenderAllNotes()
    getActiveNoteEditorContent()
}

// handle saving content from editorjs
function saveEditorjsContent() {
    if (activeNoteId) {
        const allNotes = DB.get("notes") ?? [];
        const otherNotes = allNotes.filter(n => n.id
            !== activeNoteId);
        const activeNote = allNotes.filter(n => n.id === activeNoteId)[0];


        editor.save().then((outputData) => {
            const firstblockData = outputData.blocks[0]?.data?.text;
            const secondblockData = outputData.blocks[1]?.data?.text ?? "No additional text";
            activeNote["title"] = firstblockData ?? "New Note";
            activeNote["description"] = secondblockData ?? "No additional data";
            activeNote["editorCont"] = JSON.stringify(outputData);

            if (typeof firstblockData === "undefined" || typeof secondblockData === "undefined") {
                activeNote["editorCont"] = null;
            }

            // save updated note to local db
            const comb = [activeNote, ...otherNotes];
            const isUpdated = DB.save("notes", comb);


            if (isUpdated === false) {
                alert("Failed saving note.")
            }
            fetchAndRenderAllNotes()
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }
}

// get active note editor content
function getActiveNoteEditorContent() {
    const activeNoteId = localStorage.getItem("active_note") ?? null;
    if (activeNoteId === null) {
        log("No active note selected!.")
        return {}
    }
    const allNotes = DB.get("notes") ?? [];

    const activeNote = allNotes.filter(n => n.id === activeNoteId)[0] ?? null;
    const content = activeNote !== null ? JSON.parse(activeNote?.editorCont) : null;
    if (content !== null) {
        editor?.blocks?.render(content)
        return;
    }
}

// handle deleting of note
function deleteNote() {
    const allLocalNotes = DB.get("notes") ?? [];
    const activeNoteId = localStorage.getItem("active_note") ?? null;
    if (activeNoteId === null || activeNoteId.length === 0) {

        // check if there are notes
        if (allLocalNotes.length === 0) return;
        // delete all notes
        const confirm = window.confirm("Are you sure you want to delete all note?");

        if (!confirm) return;
        DB.save("notes", []);

        localStorage.removeItem("active_note")

        fetchAndRenderAllNotes()
        getActiveNoteEditorContent()

        location.reload();
    }
    else {
        if (allLocalNotes.length === 0) return;
        // delete selected note
        // delete all notes
        const confirm = window.confirm("Are you sure you want to delete this note?");

        if (!confirm) return;
        const allNotes = DB.get("notes") ?? [];
        if (allNotes.length === 0) {
            window.alert("No notes were selected.");
            return;
        }
        const filteredSelectedNote = allNotes.filter(n => n.id !== activeNoteId);
        DB.save("notes", filteredSelectedNote);

        localStorage.removeItem("active_note")
        fetchAndRenderAllNotes()
        getActiveNoteEditorContent()

        location.reload();
    }
}

// search handler
function handleSearch(value) {
    const allNotes = DB.get("notes");
    const filteredNote = allNotes.filter(n => n.title.includes(value))

    if (value.length === 0) {
        createdNotesRenderer.innerHTML = ""
        allNotes.sort((a, b) => {
            if (a.date < b.date) return 1
            return -1
        }).map(d => {
            let card = $createElm("button");
            card.setAttribute("class", `card flex-col ${d.id === activeNoteId ? "active" : ""}`);
            card.setAttribute("data-id", d.id);
            card.onclick = handleNoteSelecting
            card.innerHTML = `
                <h2 class="title ppSB">${d.title}</h2>
                <div class="info flex-row">
                    <span class="note-createdAt ppMD">${d.formattedDate}</span>
                    <p class="subtitle ppMD">${Util.shortenWrd(d.description.length > 0 ? d.description : "Note additional text")}</p>
                </div>
            `
            createdNotesRenderer.append(card)
        })
    }
    if (filteredNote.length === 0) {
        createdNotesRenderer.innerHTML = ""
        createdNotesRenderer.innerHTML = `
            <div class="msg flex-col">
                😬
                <p class="ppL flex-row">
                    Note not found.
                </p>
            </div>
        `
    }
    if (filteredNote.length > 0) {
        createdNotesRenderer.innerHTML = ""
        filteredNote.sort((a, b) => {
            if (a.date < b.date) return 1
            return -1
        }).map(d => {
            let card = $createElm("button");
            card.setAttribute("class", `card flex-col ${d.id === activeNoteId ? "active" : ""}`);
            card.setAttribute("data-id", d.id);
            card.onclick = handleNoteSelecting
            card.innerHTML = `
                <h2 class="title ppSB">${d.title}</h2>
                <div class="info flex-row">
                    <span class="note-createdAt ppMD">${d.formattedDate}</span>
                    <p class="subtitle ppMD">${Util.shortenWrd(d.description.length > 0 ? d.description : "Note additional text")}</p>
                </div>
            `
            createdNotesRenderer.append(card)
        })
    }
}