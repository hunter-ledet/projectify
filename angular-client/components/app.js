angular.module('app')
  .controller('AppCtrl', function (itemsService, $scope) {
    itemsService.getImages('office', (data) => {
      this.items = data;
    });
    console.log($scope.username);
    console.log($scope.password);
    this.buttonClick = (callback) => {
      console.log('this is being clicked');
      $http.get('/users')
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
