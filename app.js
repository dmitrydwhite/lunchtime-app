$(document).ready( function () {
  'use strict';

   var requestFromFourSquare = function() {
    var data = {
      client_id: 'BBXQZQD1XYLBS1MI3UNLIQMKFMEGYSBTYAZVYEMPRKPAPCNO',
      client_secret: 'SCRYCL2WJIORP054NIIFFPQ0KTL4OMMHNN3TMRS32FDSX15P',
      ll: getLocation(),
      section: 'food',
      limit: 1,
      venuePhoto: 1,
      format: 'json'
    };

   	var url = 'https://api.foursquare.com/v2/venues/search';
    $.ajax(url, { data: data, dataType: 'jsonp', jsonp: 'jsoncallback' })
      .then(function(data, status, xhr) {
        counter += 1;
        maxPages = data.photos.pages;

        displayPhotos(data, status, xhr);
      }, function(xhr, status, error){

      });
  };

  var getLocation = function () {
    function requestLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          return revealPosition(position);
        });
      } else {
        $('<p>', {text: 'Geo-Location does not appear ' +
          'to be supported at this time'}).prependTo('body');
      }
    }

    function revealPosition(position) {
      var positionString = '';
      var latString = position.coords.latitude.toString().slice(0,6);
      var longString = position.coords.longitude.toString().slice(0,7);
      positionString = latString + ',' + longString;
      return positionString;
    }

    requestLocation();
  };

  var findLunch = function () {
    getLocation();
    requestFromFourSquare();
  };




  findLunch();
});
