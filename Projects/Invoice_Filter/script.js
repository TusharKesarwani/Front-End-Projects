//to store the json data we get from the json file
let invoices;

//for finding which icon to highlight (0 -> asc, 1 - desc) 
let clicks = [0, 0, 0, 0, 0, 0, 0, 0];

//function to fetch the json data from the invoices.json file
function loadinvoices() {
    //fetching the data from the invoices.json file
    fetch('invoices.json')
        .then((response) => response.json())
        .then((json) => {
            invoices = json.invoices;

            //function to display the invoices to the user
            displayInvoices();
        });
}

//function to display invoices to the screen in the table
function displayInvoices() {
    //selecting the invoice table to add data to it
    let tablebody = document.querySelector("#invoice_tbl tbody");
    tablebody.innerHTML = "";

    //iterating over all the invoices and adding them into the table
    invoices.forEach(e => {
        let row = document.createElement("tr");
        row.innerHTML += "<td>" + e.invoice_id + "</td>";
        row.innerHTML += "<td>" + e.client_name + "</td>";
        row.innerHTML += "<td>" + e.client_type + "</td>";
        row.innerHTML += "<td>" + e.date + "</td>";
        row.innerHTML += "<td>" + e.due_date + "</td>";
        row.innerHTML += "<td> $" + e.total + "</td>";
        row.innerHTML += "<td> $" + e.balance + "</td>";

        if (e.status == "Draft") {
            row.innerHTML += "<td><span class='status red'>Draft</span></td>";
        } else if (e.status == "Paid") {
            row.innerHTML += "<td><span class='status blue'>Paid</span></td>";
        } else {
            row.innerHTML += "<td><span class='status violet'>Partial Payment</span></td>";
        }

        //adding row to the invoice table
        tablebody.appendChild(row);
    });
}

//function to filter the invoices data
function filter() {
    //getting all the filter data
    let begindate = Date.parse(document.getElementById('date').value);
    let duedate = Date.parse(document.getElementById('duedate').value);
    let status = document.getElementById('status').value;
    let client = document.getElementById('client').value;

    //taking all invoices in the table
    let tablerows = document.querySelectorAll("#invoice_tbl tbody tr");

    //iterating over all the invoices in the table
    tablerows.forEach(e => {
        //removing hide class from the elements 
        e.classList.remove('hide');

        //filtering the invoices according to begin date
        if (begindate != NaN) {
            let date = e.querySelectorAll('td')[3].innerText;
            // console.log(date);
            // console.log(Date.parse(date));
            // console.log(begindate);

            if (begindate > Date.parse(date)) {
                e.classList.add('hide');
            }
        }

        //filtering the invoices according to begin date
        if (duedate != NaN) {
            let ddate = e.querySelectorAll('td')[4].innerText;
            // console.log(ddate);
            // console.log(Date.parse(ddate));
            // console.log(duedate);

            if (duedate < Date.parse(ddate)) {
                e.classList.add('hide');
            }
        }

        //filtering the invoices according to client-type
        if (client != "Any") {
            let client_type = e.querySelectorAll('td')[2].innerText;
            // console.log(client_type);
            // console.log(client);

            if (client != client_type) {
                e.classList.add('hide');
            }
        }

        //filtering the invoices according to status
        if (status != "Any") {
            let sts = e.querySelectorAll('td')[7].innerText;
            // console.log(sts);

            if (status != sts) {
                e.classList.add('hide');
            }
        }
    });
}

//function to sort the invoices data
function sortData(sortby) {

    //calling function to deactive( or remove active class) from all the icons 
    deactiveIcons();

    //selecting all the rows in the invoice table
    let rows = document.querySelectorAll("#invoice_tbl tbody tr");

    //to store the invoice data
    const data = [];

    //extracting all the data from the invoice table and store it into 2d array
    rows.forEach(e => {
        let columns_array = Array.from(e.getElementsByTagName('td'));
        columns_array = columns_array.map(col => col.innerText);

        //adding an extra column to 2d array if the row is hidden then pushing 1 otherwise 0
        if (e.classList.contains('hide')) {
            columns_array.push(1);
        } else {
            columns_array.push(0);
        }

        //pushing a row
        data.push(columns_array);
    });

    //sorting data according to the header which user clicked 
    if (sortby == "id") {
        //if the count of click is 0 then sorting in ascending order otherwise in descending order
        if (clicks[0] == 0) {
            data.sort(function (a, b) {
                return parseInt(a[0]) - parseInt(b[0]);
            });

            //to highlight the ascending icon 
            activeSortingOrder(0, 0)

            clicks[0] = 1;
        } else {
            data.sort(function (a, b) {
                return parseInt(b[0]) - parseInt(a[0]);
            });


            //to highlight the descending icon 
            activeSortingOrder(0, 1);

            clicks[0] = 0;
        }

    } else if (sortby == "name") {
        if (clicks[1] == 0) {
            data.sort(function (a, b) {
                if (a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (a[1] < b[1]) ? -1 : 1;
                }
            });

            activeSortingOrder(1, 0);

            clicks[1] = 1;
        } else {
            data.sort(function (a, b) {
                if (a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (b[1] < a[1]) ? -1 : 1;
                }
            });

            activeSortingOrder(1, 1);

            clicks[1] = 0;
        }
    } else if (sortby == "type") {
        if (clicks[2] == 0) {
            data.sort(function (a, b) {
                if (a[2] === b[2]) {
                    return 0;
                }
                else {
                    return (a[2] < b[2]) ? -1 : 1;
                }
            });

            activeSortingOrder(2, 0);
            clicks[2] = 1;
        } else {
            data.sort(function (a, b) {
                if (a[2] === b[2]) {
                    return 0;
                }
                else {
                    return (b[2] < a[2]) ? -1 : 1;
                }
            });

            activeSortingOrder(2, 1);
            clicks[2] = 0;
        }
    } else if (sortby == "date") {
        if (clicks[3] == 0) {
            data.sort(function (a, b) {
                return Date.parse(a[3]) - Date.parse(b[3]);
            });

            activeSortingOrder(3, 0);
            clicks[3] = 1;
        } else {
            data.sort(function (a, b) {
                return Date.parse(b[3]) - Date.parse(a[3]);
            });

            activeSortingOrder(3, 1);
            clicks[3] = 0;
        }
    } else if (sortby == "duedate") {
        if (clicks[4] == 0) {
            data.sort(function (a, b) {
                return Date.parse(a[4]) - Date.parse(b[4]);
            });

            activeSortingOrder(4, 0);
            clicks[4] = 1;
        } else {
            data.sort(function (a, b) {
                return Date.parse(b[4]) - Date.parse(a[4]);
            });

            activeSortingOrder(4, 1);
            clicks[4] = 0;
        }
    } else if (sortby == "total") {
        if (clicks[5] == 0) {
            data.sort(function (a, b) {
                let t1 = parseInt(a[5].substring(1));
                let t2 = parseInt(b[5].substring(1));

                return t1 - t2;
            });

            activeSortingOrder(5, 0);
            clicks[5] = 1;
        } else {
            data.sort(function (a, b) {
                let t1 = parseInt(a[5].substring(1));
                let t2 = parseInt(b[5].substring(1));

                return t2 - t1;
            });

            activeSortingOrder(5, 1);
            clicks[5] = 0;
        }
    } else if (sortby == "balance") {
        if (clicks[6] == 0) {
            data.sort(function (a, b) {
                let t1 = parseInt(a[6].substring(1));
                let t2 = parseInt(b[6].substring(1));

                return t1 - t2;
            });

            activeSortingOrder(6, 0);
            clicks[6] = 1;
        } else {
            data.sort(function (a, b) {
                let t1 = parseInt(a[6].substring(1));
                let t2 = parseInt(b[6].substring(1));

                return t2 - t1;
            });

            activeSortingOrder(6, 1);
            clicks[6] = 0;
        }

    } else {
        if (clicks[7] == 0) {
            data.sort(function (a, b) {
                if (a[7] === b[7]) {
                    return 0;
                }
                else {
                    return (a[7] < b[7]) ? -1 : 1;
                }
            });

            activeSortingOrder(7, 0);
            clicks[7] = 1;
        } else {
            data.sort(function (a, b) {
                if (a[7] === b[7]) {
                    return 0;
                }
                else {
                    return (b[7] < a[7]) ? -1 : 1;
                }
            });

            activeSortingOrder(7, 1);
            clicks[7] = 0;
        }
    }

    //displaying sorted data 
    displaySortedData(data);
}

//function to activate sorting order (ascending/descending)
function activeSortingOrder(col, order) {
    //selecting the ascending/descending icon and hightlighting it by adding a class named active
    let icon = document.querySelectorAll("#invoice_tbl thead tr th")[col].querySelectorAll("i")[order];
    icon.classList.add("active");
}

//to deactive all the asc/desc icons 
function deactiveIcons() {
    //selecting all icons which are active 
    let icons = document.getElementsByClassName('active');

    //deactiving the selected icons by remove a class named active 
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove('active');
    }
}

//this function is called when sorting is performed on the data
function displaySortedData(data) {
    let tablebody = document.querySelector("#invoice_tbl tbody");
    tablebody.innerHTML = "";

    //iterating over all the invoice data and adding them into the table
    data.forEach(e => {
        let row = document.createElement("tr");

        //if the row is hidden then adding hide class to it 
        if (e[8] == 1) {
            row.classList.add('hide');
        }

        row.innerHTML += "<td>" + e[0] + "</td>";
        row.innerHTML += "<td>" + e[1] + "</td>";
        row.innerHTML += "<td>" + e[2] + "</td>";
        row.innerHTML += "<td>" + e[3] + "</td>";
        row.innerHTML += "<td>" + e[4] + "</td>";
        row.innerHTML += "<td>" + e[5] + "</td>";
        row.innerHTML += "<td>" + e[6] + "</td>";

        if (e[7] == "Draft") {
            row.innerHTML += "<td><span class='status red'>Draft</span></td>";
        } else if (e[7] == "Paid") {
            row.innerHTML += "<td><span class='status blue'>Paid</span></td>";
        } else {
            row.innerHTML += "<td><span class='status violet'>Partial Payment</span></td>";
        }

        //adding row to the table
        tablebody.appendChild(row);
    });
}

