
angular.module('app')
  .service('itemsService', function ($http) {
    this.getAll = function (callback) {
      $http.get('/items')
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // DO NOT FORGET TO ADD ENV VARIABLE KEY TO HEROKU DEPLOYMENT
    this.getImages = (query, callback) => {
      console.log(query);
      $http({
        method: 'GET',
        url: 'https://api.unsplash.com/search/photos/',
        params: {
          client_id: '3b782f54fbbad5e75f2ba99c63b61ef52d992a46e5ff935fbcda06c390f8e209',
          query,
          per_page: 5,
        },
      }).then((response) => {
        console.log(response);
        callback(response.data.results);
        // this callback will be called asynchronously
        // when the response is available
      }, (err) => {
        console.log(err, 'err in getImages');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    this.createUser = (username, password, callback) => {
      $http.post('/users')
        .then((response) => {
          if (callback) {
            callback(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });

