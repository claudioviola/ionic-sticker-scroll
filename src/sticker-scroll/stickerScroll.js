import controller from './stickerScroll.controller';

const stickerScroll = {
    transclude:true,
    controller: controller,
    controllerAs:'stickerScroll',
    bindings: {
        stickyClass:'@',
    },
    template:`
    <ion-content delegate-handle="mainScroll" class="sticker_scroll" scroll-event-interval="10" overflow-scroll="false">
        <div ng-transclude></div>
    </ion-content>`
};


export default stickerScroll;