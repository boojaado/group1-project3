$(document).ready(function() {
    doWork();
    console.log("Page Loaded");
    $("#selDataset").on("change", function() {
        doWork();
    })

});
//use ajax to call on data
function doWork(){
    var url = 'static/data/HateCrime_CrimeType.json';
    requestAjax(url);
}
function requestAjax(url){
    $.ajax({
        type: "get",
        url:url,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            createDropdown(data);
            createBarChart(data);
    
        },
        error: function(textStatus, errorMess) {
            console.log("no data")
            console.log(textStatus);
            console.log(errorMess)
        }
    })
}
//creating drop down with loop
function createDropdown(data) {
    var names = data.Year;
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html = `<option> ${name}</option>`;
        $("#selDataset").append(html);
    }
}
function createBarChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        type: 'bar',
        x: data.Crime_Type,
        y: sample.Count,
        text: sample.Count,
        orientation: 'h',
        marker: {
            color: 'firebrick'
        }
    }

    var data1 = [trace1];
    var layout = {
        "title": "Top 10 OTU ",
        xaxis: {
            title: {
              text: 'Sample Value',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            },
          },
          yaxis: {
            title: {
              text: 'OTU ID',
              font: {
                family: 'arial',
                size: 14,
                color: '#fffff'
              }
            }
          }
     
    }

    Plotly.newPlot('bar', data1, layout);
}