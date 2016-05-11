import { assign } from 'lodash';


export default class StickerScroll {
    /*ngInject*/
    constructor($scope, $compile, $element, $ionicPosition, $ionicScrollDelegate, StickerScrollService){
        assign(this, {
            $scope, $compile, StickerScrollService,
            $ionContent:angular.element($element.find('ion-content')),
            $target:null,
            currentSticker:null,
        });
        this.$ionContent.append('<stiker-list></stiker-list>');
        this.$target = this.$ionContent.find('stiker-list');
        let scrollStartEvent = $scope.$on('SCROLL_TO_START', (event, index) => {
            event.stopPropagation();
            //console.log('SCROLL_TO_START');
            //console.log(index);
            console.log();
            let sticker = angular.element($element.find('sticker-element')[index]);
            sticker = sticker.children().children().children();
            let stickerData = $ionicPosition.offset(sticker);
            console.log($ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition());
            let y = Math.round($ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top + stickerData.top);
            console.log(y);
            goToSticker(y);
        });

        $scope.$on("$destroy",  () => {
            console.log('Destroy StickerScroll');
            scrollStartEvent();
            this.$target.children().remove();
            this.currentSticker = null;
        });

        function goToSticker(y){
            console.log(y);
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, y, [true]);
        }
    }

    showSticker(index){
        //console.log('>show='+index);
        //this.$ionContent.append(stiker);
        //let stiker = this.StickerScrollService.getSticker(index);
        let sticker = this.$target.children()[index];
        this.StickerScrollService.currentSticker = angular.element(sticker);
        sticker.style.display='block';
        this.currentSticker = sticker;
    }

    hideSticker(index){
        //console.log('>hide='+index);
        let sticker = this.$target.children()[index];
        if(sticker)
            sticker.style.display='none';
    }

    addSticker(sticker, offset){
        this.StickerScrollService.addSticker(sticker, offset);
        this.$target.append(sticker);
    }

}