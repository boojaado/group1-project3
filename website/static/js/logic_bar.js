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
        let sub =data.filter(x =>x["Year"]===yearfilter);
        let crime = sub.map(x => x["Crime_Type"]);
        let count = sub.map(x => x["Count"]); // the + casts to number
        makebar(crime, count);
    });
}



function makebar(crime, count) {
    var trace1 = {
        x: crime,
        y: count,
        name: 'crime',
        type: 'bar',
        marker: {
            color: '#442274'
        }
    };

    var data = [trace1];


    Plotly.newPlot('plot', data);
}