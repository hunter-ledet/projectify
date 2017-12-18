
angular.module('app')
.service('itemsService', function($http) {
  this.getAll = function(callback) {
    $http.get('/items')
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  // DO NOT FORGET TO ADD ENV VARIABLE KEY TO HEROKU DEPLOYMENT
  this.getImages = function(query, callback) {
    $http({
      method: 'GET',
      url: 'https://api.unsplash.com/photos/',
      params: {
        client_id: 'ad004fe2b4a3576b8558b8c9d052edb7c71bfbb7fcf484eabc0c21af46d8229d',
        query: query,
        per_page: 5
      }
    }).then((response) => {
      console.log(response)
      callback(response.data);
        // this callback will be called asynchronously
        // when the response is available

      },(err) => {
        console.log(err, 'err in getImages')
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }
});