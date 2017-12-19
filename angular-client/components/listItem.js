angular.module('app')
  .component('listItem', {
    bindings: {
      item: '=',
    },
    controller(itemsService) {

    },
    templateUrl: '/templates/list-item.html',
  });
