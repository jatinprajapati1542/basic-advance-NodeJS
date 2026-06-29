//my code
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");


function updateFilter() {

    var fieldVal = fieldEl.value;
    var typeVal = typeEl.value;
    var filter = valueEl.value;

    if (fieldVal) {
        table.setFilter(fieldVal, typeVal, filter);
    }
}

valueEl.addEventListener("keyup", updateFilter)

//ready code
//Define variables for input elements

// var fieldEl = document.getElementById("filter-field");
// var typeEl = document.getElementById("filter-type");
// var valueEl = document.getElementById("filter-value");

//Custom filter example
// function customFilter(data) {
//     return data.car && data.rating < 3;
// }

// //Trigger setFilter function with correct parameters
// function updateFilter() {
//     var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
//     var typeVal = typeEl.options[typeEl.selectedIndex].value;

//     var filter = filterVal == "function" ? customFilter : filterVal;

//     if (filterVal == "function") {
//         typeEl.disabled = true;
//         valueEl.disabled = true;
//     } else {
//         typeEl.disabled = false;
//         valueEl.disabled = false;
//     }

//     if (filterVal) {
//         table.setFilter(filter, typeVal, valueEl.value);
//     }
// }

// //Update filters on value change
// document.getElementById("filter-value").addEventListener("keyup", updateFilter);

// //Clear filters on "Clear Filters" button click
// document.getElementById("filter-clear").addEventListener("click", function () {
//     fieldEl.value = "";
//     typeEl.value = "=";
//     valueEl.value = "";

//     table.clearFilter();
// });

var table = new Tabulator("#userTable", {
    ajaxURL: "http://localhost:5000/api/users",
    ajaxResponse: function (url, params, response) {
        return response.data; //return the response data to tabulator
    },
    layout: "fitColumns",
    printAsHtml: true,
    printHeader: "<h1>Users Data<h1>",
    printFooter: "",
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [10, 25, 50, 100],
    placeholder: "No Data Set",
    columns: [
        { title: "Name", field: "name", headerFilter: "input" },
        { title: "Email", field: "email", headerFilter: "input" },
        { title: "Age", field: "age" },
        {
            title: "Action",
            formatter: function () {
                return `
                    <button onclick="viewUser()">View</button>
                    <button onclick="updateUser()">Update</button>
                    <button onclick="deleteUser()">Delete</button>
                `
            }
        }
    ],
});

//print button

document.getElementById("print-table").addEventListener("click", function () {
    table.print(false, true);
});


document.getElementById("download-csv").addEventListener("click", function () {
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function () {
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function () {
    table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function () {
    table.download("pdf", "data.pdf", {
        orientation: "portrait", //set page orientation to portrait
        title: "Example Report", //add title to report
    });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function () {
    table.download("html", "data.html", { style: true });
});


