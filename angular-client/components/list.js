angular.module('app')
  .component('list', {
    bindings: {
      items: '=',
      buttonClick: '<',
    },
    controller(itemsService) {
      this.onSearch = (query) => {
        console.log(query, 'this is getting fired in list');
        itemsService.getImages(query, (pictures) => {
          this.items = pictures;
        });
      };

      this.userCreate = (username, password) => {
        console.log('this is being clicked');
        itemsService.createUser(username, password, (response) => {
          console.log(response);
        });
      };
    },
    templateUrl: '/templates/list.html',
  });
