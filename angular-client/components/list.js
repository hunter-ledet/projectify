angular.module('app')
  .component('list', {
    bindings: {
      items: '=',
    },
    controller(itemsService) {
      this.onSearch = (query) => {
        itemsService.getImages(query, (pictures) => {
          this.items = pictures;
        });
      };

      this.userCreate = (username, password) => {
        // password coming up as undefined and username is coming up fine. FIX
        console.log(username, password, 'this is username and pass in userCreate in');
        itemsService.createUser(username, password, (response) => {
          console.log(response);
        });
      };
    },
    templateUrl: '/templates/list.html',
  });
