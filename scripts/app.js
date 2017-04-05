// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// 1. API call to USGS
function quakeOne(){

		    $.ajax({
		    method: "GET",
		    url: weekly_quakes_endpoint,
		    success: onSuccess,
		    error: onError
		    
			});
			
			// 2. Take data from USGS 
			function onSuccess(json) {

				// Sanity check
				let quakeTitle = json.features[4].properties.title;
				let quakeGeo = json.features[4].geometry.coordinates;
				

				// Prints title
				console.log(quakeTitle);				

				// Prints coordinates of quake - to be added to GMaps API
				console.log(quakeGeo);

				// 3. Append onto html element
				json.features.forEach((element) => {
					$('#info').append($("<p>" + element.properties.title + "</p>"));
					})
				
			}	
			
			function onError(xhr, status, errorThrown) {
				alert("Sorry, there was a problem!");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			}
}
// Run quakeOne
quakeOne();	

// 4. API call to Google Maps
function initMap() {
	var locations = [
	   ['M 5.3 - 1km Andaman Islands, India region', 14.4749, 93.056 , 5],
	   ['M 4.8 - 1km SW of Nafpaktos, Greece', 38.3848, 21.8147, 4],
	   ['M 5.6 - 70km NNE of Isangel, Vanuatu', -18.989, 169.5773, 3],
	   ['M 5.1 - 62km NNW of Torbat-e Jam, Iran', 35.7887, 60.4269, 2],
	   ['M 4.5 - 7km ENE of Miyako, Japan', 39.6522, 142.0409, 1],
	   ['San Francisco', 37.78, -122.44 , 6]
 	];

 	var map = new google.maps.Map(document.getElementById('map'), {
	   zoom: 4,
	   center: new google.maps.LatLng(37.78, -122.44, 6),
	   mapTypeId: google.maps.MapTypeId.ROADMAP
 	});

 	var infowindow = new google.maps.InfoWindow();

    var marker, i;
    var markers = new Array();

    for (i = 0; i < locations.length; i++) {
      	marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
     });

    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    	return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
        }
    })(marker, i));
    }   
}


// forEach Loop with QuakeTimeSince

//json.features.forEach((element) => {
//	$('#info').append($("<p>" + .properties.title + " - " + quakeTimeSince + " ago</p>"));
//})

// 5. Take data from Maps
	// Req: simple map
// 6. Append onto html element
// 7. Take data from USGS and plug into Maps
// 8. Restyle pins to provided image






$(document).on("ready", function() {

  // CODE IN HERE!

});
