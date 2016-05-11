import controller from './stickerElement.controller';


const stickerElement = {
    transclude: true,
    require: {
        $ionicScroll: '^$ionicScroll',
        stickerScroll:'^stickerScroll'
    },
    controller: controller,
    controllerAs:'ctrl',
    bindings: {
        index:'@',
        collapseClass:'@',
        isCollapsible:'@',
        groupListClass:'@'
    },
    template:`<div ng-transclude></div>`
    };


export default stickerElement;
