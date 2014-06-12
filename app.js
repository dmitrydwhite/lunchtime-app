$(document).ready( function () {
  'use strict';



  var displayVenues = function (data, status, xhr) {
    console.log('getting to display venues');
    var coolPlace = data.response.groups[0].items[0].venue;
    $('<p>', {
      text: coolPlace.name
    }).prependTo('body');
    var photoTrace = coolPlace.photos.groups[0].items[0];
    var photoUrl = photoTrace.prefix + 'width960/' + photoTrace.suffix.slice(1);
    $('<img></img>', {
      src: photoUrl
    }).prependTo('body');
  };

  var requestFromFourSquare = function(loc) {
    console.log('starting foursquare request');
    var data = {
      client_id: 'BBXQZQD1XYLBS1MI3UNLIQMKFMEGYSBTYAZVYEMPRKPAPCNO',
      client_secret: 'SCRYCL2WJIORP054NIIFFPQ0KTL4OMMHNN3TMRS32FDSX15P',
      ll: loc,
      // query: 'restaurant',
      section: 'food',
      // limit: 1,
      venuePhotos: 1,
      v: '20140612',
      format: 'json'
    };


   	var url = 'https://api.foursquare.com/v2/venues/explore';

    $.ajax(url, { data: data, dataType: 'jsonp' })
      .then(function(data, status, xhr) {
        displayVenues(data, status, xhr);
      }, function(xhr, status, error) {

      });
  };

  var getLocation = function () {
    console.log('getting location');
    var requestLocation = function() {
      console.log('requesting location');
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


    function revealPosition(position) {
      var positionString = '';
      var latString = position.coords.latitude.toString().slice(0,6);
      var longString = position.coords.longitude.toString().slice(0,7);
      positionString = latString + ',' + longString;
      requestFromFourSquare(positionString);
    }

    requestLocation();
  };

  var findLunch = function () {
    getLocation();
  };




  findLunch();
});
