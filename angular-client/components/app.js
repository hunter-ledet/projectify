angular.module('app')
.controller('AppCtrl', function(itemsService) {
  itemsService.getImages('mountains', (data) => {
    this.items = data;
  });
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});