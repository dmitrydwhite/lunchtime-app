'use strict';

$(document).ready( function () {

 function initialize(obj) {
      var mapOptions = {
        center: new google.maps.LatLng(obj.lat, obj.lon),
        zoom: 18
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);

      var marker = new google.maps.Marker({
    		position: mapOptions.center,
    		title:"Hello World!"

			});

		marker.setMap(map);

  }

  var getRandomVenue = function (max) {
    var random = Math.floor(Math.random() * (max - 1));
    var truePlaces = beenThere.indexOf(random);
    if (truePlaces === -1) {
      beenThere.push(random);
      return random;
    } else {
      return getRandomVenue(max);
    }
  };

  var displayVenues = function (data, status, xhr) {
    var numberReceived = data.response.groups[0].items.length;
    var nextPlace = getRandomVenue(numberReceived);
    var coolPlace = data.response.groups[0].
      items[nextPlace].venue;
    var photoTrace = coolPlace.photos.groups[0].items[0];
    var photoUrl = photoTrace.prefix +
      'width484/' + photoTrace.suffix.slice(1);
    $('<div>', {'class': 'picture'}).appendTo('.data_view');
    $('<img></img>', {
      src: photoUrl
    }).appendTo('.picture');
    $('<p>', {
      text: coolPlace.name
    }).insertBefore('.picture');
    $('<button>', {
      text: 'I\'ve Been Here, Find Another One'
    }).insertBefore('.picture').click(function() {
      if (beenThere.length === (numberReceived-1)) {
        beenThere = [];
        $('.data_view').empty();
        $('#map-canvas').empty();
        requestFromFourSquare(positionString);
      } else {
        $('.data_view').empty();
        $('#map-canvas').empty();
        displayVenues(data, status, xhr);
      }
    });
    $('<p>', {
      'class': 'address',
      text: coolPlace.location.address
    }).insertAfter('.picture');
    $('<p>', {
      text: coolPlace.location.crossStreet
    }).insertAfter('.address');
    var venueObj = {
    	lat: coolPlace.location.lat,
    	lon: coolPlace.location.lng
    };
    initialize(venueObj);
  };

  var requestFromFourSquare = function(loc) {
    var data = {
      client_id: 'BBXQZQD1XYLBS1MI3UNLIQMKFMEGYSBTYAZVYEMPRKPAPCNO',
      client_secret: 'SCRYCL2WJIORP054NIIFFPQ0KTL4OMMHNN3TMRS32FDSX15P',
      ll: loc,
      query: 'restaurant',
      section: 'food',
      limit: 30,
      venuePhotos: 1,
      v: '20140612',
      format: 'json'
    };


   	var url = 'https://api.foursquare.com/v2/venues/explore';

    $.ajax(url, { data: data, dataType: 'jsonp' })
      .then(function(data, status, xhr) {
        displayVenues(data, status, xhr);
      }, function(xhr, status, error) {
        // TODO: Error handling here.
      });
  };

  var getLocation = function () {
    function revealPosition(position) {
      var latString = position.coords.latitude.toString().slice(0,6);
      var longString = position.coords.longitude.toString().slice(0,7);
      positionString = latString + ',' + longString;
      requestFromFourSquare(positionString);
    }

    var requestLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          revealPosition(position);
        });
        }
       else {
        $('<p>', {text: 'Geo-Location does not appear ' +
          'to be supported at this time'}).prependTo('body');
      }
    };

    requestLocation();
  };

  var positionString = '';
  var beenThere = [];
  getLocation();
});
