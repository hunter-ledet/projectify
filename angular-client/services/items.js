
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
      console.log(username, password, 'username and password in itemsService')
      let body = {
        username: username,
        password: password
      }
      $http.post('/users', body)
        .then((response) => {
          if (callback) {
            callback(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.checkUser = (username, password, callback) => {
      let body = {
        username: username,
        password: password
      }
      $http.get('/userCheck', body)
        .then((response) => {
          if (callback) {
            if (response.data.length <= 1) {
              console.warn('Not a user! Please Sign-Up!')
            } else {
              console.log(response)
              console.warn('Welcome!');
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  });

  // ad004fe2b4a3576b8558b8c9d052edb7c71bfbb7fcf484eabc0c21af46d8229d

  // 4dbd973d45c176990732278959987c06fd1a0d52d0143c1b33e4a8a8dba86719

