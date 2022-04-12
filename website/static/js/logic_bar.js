$(document).ready(function() {
    console.log("Page Loaded");
    getData();

    $('#filter').on('change',function(){
        getData();
    });
});

function getData() {
    let filepath = "static/data/HateCrime_CrimeType.csv";

    d3.csv(filepath).then(function(data) {
        console.log(data);

        let yearfilter = $('#filter').val();
        // let row = data.filter(x =>x.year ===yearfilter)[0]
        // let crimetype=Object.keys(row)
        // crimetype.shift();
        // let counts = Object.values(row);
        // counts.shift();

        
        let sub =data.filter(x =>x["Year"]===yearfilter);
        // let year = data.map(x => x["Year"])
       
        let crime = sub.map(x => x["Crime_Type"]);
        let count = sub.map(x => x["Count"]); // the + casts to number
       
        makePlot(crime, count);
        // createDropdown(year);
    });
}



function makePlot(crime, count) {
    // let id = $("#selDataset").val();
    // let sample = data.samples.filter(x => x.id == id)[0];
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