document.getElementById('myform').addEventListener('submit', savebookmark);

function savebookmark(e) {
    e.preventDefault();

    var sitename = document.getElementById('sitename').value;
    var siteurl = document.getElementById('siteurl').value;

    if (!validateform(sitename, siteurl)) {
        return false;
    }

    var bookmark = {
        name: sitename,
        url: siteurl
    };

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
}

function deletebookmark(i) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(i, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchbookmarks();
}

function fetchbookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkresults = document.getElementById('bookmarksresults');

    bookmarkresults.innerHTML = '';

    if (bookmarks && bookmarks.length > 0) {
        for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarkresults.innerHTML += `
                <div class="well">
                    <h5>${name}</h5>
                    <div class="button-group">
                        <a class="btn btn-success" href="https://${url}" target="_blank">Visit</a>
                        <a class="btn btn-danger" onclick="deletebookmark(${i});">Delete</a>
                    </div>
                    <small>Created at: ${new Date().toLocaleDateString()}</small>
                </div>
            `;
        }
    } else {
        bookmarkresults.innerHTML = '<p>No bookmarks available</p>';
    }
}

function validateform(sitename, siteurl) {
    if (!sitename || !siteurl) {
        alert('Please fill in all fields.');
        return false;
    }

    var expression = /^((http|https):\/\/)?([A-Za-z0-9]+\.[A-Za-z]{2,})+(\/.*)?$/;
    var regex = new RegExp(expression);

    if (!siteurl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

// Fetch bookmarks on page load
document.addEventListener('DOMContentLoaded', fetchbookmarks);
