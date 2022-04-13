$(document).ready(function() {
    doWork();
});

function doWork() {
    var url = "static/data/HateCrime_Map.json";
    requestD3(url);
}

function requestD3(url,) {

    // Perform a GET request to the query URL., first for map and then plates
    d3.json(url).then(function(data) {
            console.log(data);
            createMap(data);
    });

}

