//form submission
document.getElementById('myform').addEventListener('submit', savebookmark);
function savebookmark(e) {
    //get form values
    var sitename = document.getElementById('sitename').value;
    var siteurl = document.getElementById('siteurl').value;

    if (!validateform(sitename, siteurl)) {
        return false;
    }

    /*if(!sitename || !siteurl) {
        alert('Please fill the form !!!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteurl.match(regex)){
        alert('Please use a valid URL')
        return false;
    }*/

    //console.log(sitename);
    //console.log(siteurl);
    // creating object to put in local storage
    var bookmark = {
        name: sitename,
        url: siteurl
    }

    //console.log(bookmark);
    /*
    //local-storage test
    localStorage.setItem('test', 'hello guys');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myform').reset();

    fetchbookmarks();
    //prevents form submission
    e.preventDefault();
}

function deletebookmark(url) {
    //console.log(url);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//     for (var i = 0; i < bookmarks.length; i++) {
//         if (bookmarks[i].url == url) {
//             bookmarks.splice(i, 1);
//         }
//     }
    bookmarks.splice(i, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchbookmarks();
}

//fetch bookmarks

function fetchbookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //console.log(bookmarks);

    var bookmarkresults = document.getElementById('bookmarksresults');

    bookmarkresults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkresults.innerHTML += `<div class="well"> +
            <div class="row">
            <div class="col-9">
                <h5>${bookmarks[i].name}</h5>    
            </div>
            <div class="col-3">
                <a class="btn btn-sm btn-success" href="https://${bookmarks[i].url}" target="_blank">Visit</a>
                <a onclick="deletebookmark(${i});" class="btn btn-danger text-light btn-sm" >Delete</a> 
            </div>
        </div>   
        <small>Created at : ${Date().slice(4, 15)}</small>                    
        </div>`;
    }
}
function validateform(sitename, siteurl) {
    if (!sitename || !siteurl) {
        alert('Please fill the form !!!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteurl.match(regex)) {
        alert('Please use a valid URL')
        return false;
    }

    return true;
}
