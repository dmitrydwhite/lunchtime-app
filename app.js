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





  findLunch();
});
