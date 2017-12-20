angular.module('app')
  .component('list', {
    bindings: {
      items: '=',
    },
    controller(itemsService) {
      this.user;

      this.onSearch = (query) => {
        itemsService.getImages(query, (pictures) => {
          this.items = pictures;
        });
      };

      this.likedImages = (username) => {
        // username is coming through here
        itemsService.getAll(username, (image) => {
          this.liked = image;
          console.log(this.liked, 'this is liked coming back from DB');
        });
      };

      this.userCreate = (username, password) => {
        // password coming up as undefined and username is coming up fine. FIX
        console.log(username, password, 'this is username and pass in userCreate in');
        itemsService.createUser(username, password, (response) => {
          console.log(response);
        });
      };

      this.userCheck = (username, password) => {
        itemsService.checkUser(username, password, (response) => {
        });
      };

      this.currentUser = (username) => {
        console.log(username, 'username in currentUser')
        this.user = username;
      }
    },
    templateUrl: '/templates/list.html',
  });
