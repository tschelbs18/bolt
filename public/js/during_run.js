// 'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Page ready");
    initMap();
}

function initMap(){
    L.mapquest.key = 'RSVybMAp4DMw5EYKNG0Lrpc30Gqq7FQ8';

    // 'map' refers to a <div> element with the ID map
    var map = L.mapquest.map('map', {
      center: [32.88, -117.236],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12,
      zoomControl: false
    });

    //Add a marker to the map
    L.marker([32.88, -177.236]).addTo(map);
}