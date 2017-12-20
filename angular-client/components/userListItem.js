angular.module('app')
  .component('userListItem', {
    bindings: {
      likes: '=',
      like: '=',
      user: '=',
    },
    controller(itemsService) {
      this.deleteLiked = (user, photo) => {
        console.log(user, 'user in deleteLiked')
        itemsService.deleteLiked(user, photo, (response) => {
          console.log(response)
          this.likes = response.data;
          console.log(response, 'this is repsonse in addLiked');
        });
      };
    },
    templateUrl: '/templates/user-list-item.html',
  });
