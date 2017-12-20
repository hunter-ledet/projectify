angular.module('app')
  .component('listItem', {
    bindings: {
      likes: '=',
      item: '=',
      user: '=',
    },
    controller(itemsService) {
      this.addLiked = (user, photo) => {
        console.log(user, 'user in listItem')
        itemsService.addLiked(user, photo, (response) => {
          this.likes = response.data;
          console.log(response, 'this is repsonse in addLiked');
        })
      }
    },
    templateUrl: '/templates/list-item.html',
  });
