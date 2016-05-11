import comp from './stickerScroll';
import service from './stickerScroll.service';
import stickerElementModule from './stickerElement/stickerElement.module';

let stickerScrollModule = angular.module('components.stickerScroll', [
    stickerElementModule.name
])
    .service('StickerScrollService', service)
    .component('stickerScroll', comp);


export default stickerScrollModule;
