tinymce.PluginManager.add("synonym", function (editor, url) {
  /*click call back to inser the selected word into the editor*/
  var clickCallback = function (e) {
    e.stopPropagation();
    if (e.target.classList.contains("synonym-result")) {
      editor.insertContent(e.target.textContent + " ");
      editor.windowManager.close(window);
    }
  };

  /*fetch synonyms from datamuse*/
  editor.fetchSynonyms = function (searchTerm) {
    var xhttp = new XMLHttpRequest();
    var resultsDOM = document.getElementById("results");
    resultsDOM.innerHTML =
      "<div class='loader-wrapper'><div class='spinner'></div></div>";
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          editor.populateSynonymsResults(
            JSON.parse(this.responseText),
            resultsDOM
          );
        } catch {
          editor.populateSynonymsResults(void 0, resultsDOM);
        }
      }
    };
    var cleansedSearchTerm = searchTerm.replace(" ", "+");
    var endPoint = "https://api.datamuse.com//words?ml=" + cleansedSearchTerm;
    xhttp.open("GET", endPoint, true);
    xhttp.send();
  };

  /*append results to the DOM*/
  editor.populateSynonymsResults = function (resultsArr, resultsDOM) {
    if (resultsDOM) {
      resultsDOM.removeEventListener("click", clickCallback);
      resultsDOM.innerHTML = "";
      if (resultsArr && resultsArr.length > 0) {
        var htmlStr = "";
        resultsArr.forEach(function (result) {
          htmlStr += `<div class="synonym-result">${result.word}</div>`;
        });
        if (htmlStr) resultsDOM.innerHTML = htmlStr;
        resultsDOM.addEventListener("click", clickCallback);
      } else if (resultsArr && resultsArr.length === 0) {
        resultsDOM.innerHTML = "No result found";
      } else
        resultsDOM.innerHTML = "Something Went Wrong.. Please Try Again...";
    }
  };

  /*add the custom button to the editor toolbar and customize the action events and UI*/
  editor.addButton("synonym", {
    text: "Lookup Synonyms",
    icon: false,
    onclick: function () {
      editor.windowManager.open(
        {
          title: "Lookup Synonyms",
          buttons: [], // passing empty array to remove the default ok, cancel  buttons
          body: [
            {
              type: "container",
              name: "instruction",
              html: "<h5>Type in the word(s) and press enter for the synonyms</h5>",
            },
            { type: "textbox", name: "searchWord" },
            {
              type: "container",
              name: "results",
              html: '<div class="results-wrapper"><h4>Synonyms: </h4><div id="results"></div>',
            },
          ],
          onsubmit: function (e) {
            e.preventDefault();
            var resultsDOM = document.getElementById("results");
            if (e.data && e.data.searchWord) {
              if (/^[a-zA-Z\s]*$/.test(e.data.searchWord)) {
                editor.fetchSynonyms(e.data.searchWord);
              } else resultsDOM.innerHTML = "Please enter a valid word.";
            } else if (e.data.searchWord.length === 0) {
              if (resultsDOM) {
                resultsDOM.innerHTML = "Please Enter a Word in the Input box.";
              }
            }
          },
        },
        { windowId: "synonym-loader" }
      );
    },
  });
});
