const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    search = document.getElementById('searchTxt'),
    popupTitle = popupBox.querySelector("header p"),
    titleTag = popupBox.querySelector("input"),
    closeIcon = popupBox.querySelector("header i"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelectorAll("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notesContainer = document.getElementById("notesContainer");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
})
closeIcon.addEventListener("click", () => {
    isUpdate=false;
    titleTag.value="";
    descTag.value="";
    addBtn[0].innerText="Add Note";
   popupTitle.innerText="Add a New Note";
    popupBox.classList.remove("show");
})

function showNote() {
    
    notesContainer.innerHTML = "";
    document.querySelectorAll(".note").forEach(note =>note.remove());
    notes.forEach((note, index) => {
      const liClass = note.isImportant ? "note starred" : "note";
  
      const liTag = `<li class="${liClass}" style="background-color: ${note.isImportant ? 'gold' : ''}; color:${note.isImportant ? 'black' : 'white'}">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index},'${note.title}','${note.description}')"> <i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"> <i class="uil uil-trash"></i>Delete</li>
                    <li onclick="importantNote(${index})"> <i class="uil uil-heart${note.isImportant ? '-break' : ''}"></i>${note.isImportant ? 'Unstar' : 'Star'}</li>
                </ul>
            </div>
        </div>
      </li>`;
      addBox.insertAdjacentHTML("afterend", liTag);
    });
  }
showNote();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click",e =>{

        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })
}
function deleteNote(noteId){
    let confirmDel= confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId,1); //deletes one note of given id
    localStorage.setItem("notes", JSON.stringify(notes));//saving updated notes to local storage
    showNote();
}

function updateNote(noteId,title,desc){
    isUpdate=true;
    updateId = noteId;
    addBox.click();
    titleTag.value=title;
    descTag.value=desc;
    addBtn[0].innerText="Update Note";
   popupTitle.innerText="Update a Note";
    console.log(noteId,title,desc);
}

function importantNote(noteId) {
    notes[noteId].isImportant = !notes[noteId].isImportant;
    renderNotes();
  }

function renderNotes() {
    notesContainer.innerHTML = "";
    document.querySelectorAll(".note").forEach(note =>note.remove());
    notes.forEach((note, index) => {
        const liClass = note.isImportant ? "note starred" : "note";

        const liTag = `<li class="${liClass}" style="background-color: ${note.isImportant ? 'gold' : ''};">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${index},'${note.title}','${note.description}')"> <i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"> <i class="uil uil-trash"></i>Delete</li>
                        <li onclick="importantNote(${index})"> <i class="uil uil-heart${note.isImportant ? '-break' : ''}"></i>${note.isImportant ? 'Unstar' : 'Star'}</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

 for (var i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", e => {
        e.preventDefault();
    }
 )}
    addBtn[0].addEventListener("click", e => {
        let noteTitle = titleTag.value.toUpperCase(),
            noteDesc = descTag.value;

        if (noteTitle || noteDesc) {
            let dateObj = new Date(),
                day = dateObj.getDate(),
                month = months[dateObj.getMonth()],
                year = dateObj.getFullYear();

            let noteInfo = {
                title: noteTitle, description: noteDesc,
                date: `${month} ${day}, ${year}`
            }
            if(! isUpdate){
                notes.push(noteInfo); //adding new notes
            }
            else{
                isUpdate=false;
                notes[updateId]=noteInfo;
            }
            localStorage.setItem("notes", JSON.stringify(notes));//saving notes to local storage
            closeIcon.click();
            showNote();
        }
    })

    search.addEventListener("input",function(){

        let inputVal = search.value.toUpperCase();
        let noteCard = document.getElementsByClassName('note');
        Array.from(noteCard).forEach(function(element){
            let cardTxt = element.getElementsByTagName("p")[0].innerText; //searching by title
            if(cardTxt.includes(inputVal)){
                element.style.display = "block";
            }
            else{
                element.style.display = "none";
            }
            //console.log(cardTxt);

        })
    })

showNote();
renderNotes();