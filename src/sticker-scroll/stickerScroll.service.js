import { assign } from 'lodash';

export default class StickerScrollService{
    /*ngInject*/
    constructor(){
        assign(this, {
            _dataStickers:[],
            _currentSticker:null,
        })
    }

    set currentSticker(sticker){
        this._currentSticker = sticker;
    }

    get currentSticker(){
        return this._currentSticker;
    }

    addSticker(sticker, offset){
        this._dataStickers.push({element:sticker, offset:offset});
    }

    getSticker(index){
        return this._dataStickers[index];
    }

}