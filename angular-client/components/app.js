angular.module('app')
  .controller('AppCtrl', function (itemsService, $http) {
    // itemsService.getImages('forrest', (data) => {
    //   this.items = data;
    // });
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
