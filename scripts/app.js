$(document).on("ready", function() {

var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Load Quake List
quakeOne();	
// Load Map
initMap();

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

			// SANITY CHECK START
				let quakeTitle = json.features[0].properties.title;
				let quakeGeo = json.features[0].geometry.coordinates;
				let quakeTime = json.features[0].properties.time;
				console.log(quakeTitle);				
				console.log(quakeGeo);
				console.log(quakeTime);
			// SANITY CHECK END

			// Loop through json.features
			json.features.forEach((element) => {
				
				let lat = element.geometry.coordinates[1];
				let lng = element.geometry.coordinates[0];

				//Custom icon
				var customIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Bullseye1.png/50px-Bullseye1.png';

				// Marker call from Google API
				let marker = new google.maps.Marker({
					map: map,
					// 8. Restyle pins to provided image
					icon: customIcon,
					// 7. Take data from USGS and plug into Maps
					position: {
						lat: lat, 
						lng: lng
					}
				});

				let quakeTimeSince = timeSince(element.properties.time);
				// 3. Append onto html element
				$('#info').append("<p>" + element.properties.title + " - " + quakeTimeSince + " ago</p>");
			});
				
			}	
			
			function onError(xhr, status, errorThrown) {
				alert("Sorry, there was a problem!");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			}
}


// 4. API call to Google Maps
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
  		// Centers on SF
  		center: {lat: 37.7749, lng: -122.4194},
  		zoom: 4
	});
}

});


// BONUS - Time duration (Stack Overflow resource)
var DURATION_IN_SECONDS = {
  epochs: ['year', 'month', 'day', 'hour', 'minute'],
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60
};

function getDuration(seconds) {
  var epoch, interval;

  for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
    epoch = DURATION_IN_SECONDS.epochs[i];
    interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
    if (interval >= 1) {
      return {
        interval: interval,
        epoch: epoch
      };
    }
  }

};

function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var duration = getDuration(seconds);
  var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
  return duration.interval + ' ' + duration.epoch + suffix;
};


