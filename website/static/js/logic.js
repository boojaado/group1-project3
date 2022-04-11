$(document).ready(function() {
    console.log("Page Loaded");
    getData();
    $("#selDataset").on("change", function() {
        getData();
    })
});

function getData() {
    let filepath = "static/data/HateCrimeGrouped.csv";

    d3.csv(filepath).then(function(data) {
        console.log(data);

        let crime = data.map(x => x["Crime_Type"]);
        let count = data.map(x => x["Count"]); // the + casts to number
        let year = data.map(x => x["Year"])
        makePlot(crime, count);
        createDropdown(year);
    });
}

function createDropdown(year) {
    var names = year;
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html = `<option> ${name}</option>`;
        $("#selDataset").append(html);
        console.log(name);
    }
}


function makePlot(crime, count) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];
    var trace1 = {
        x: crime,
        y: count,
        name: 'crime',
        type: 'bar'
            // mode: "markers"
    };

    var data = [trace1];

    var layout = { title: "crime count" };

    Plotly.newPlot('plot', data, layout);
}