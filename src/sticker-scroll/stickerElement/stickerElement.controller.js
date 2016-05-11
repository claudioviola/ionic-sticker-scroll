export default function StickerElementController($scope, $element, $compile, $timeout, $ionicPosition, StickerScrollService){

    this.$onInit = () => {

    };

    this.$postLink = ()=>{

    };

    $timeout(()=>{
        main.stickerScroll = this.stickerScroll;
        main.ionicScroll = this.$ionicScroll;
        createSticker();
        initScroll(this.$ionicScroll);
    }, 0);

    $scope.$on("$destroy", function () {
        removeMe();
        angular.element(main.ionicScroll.element).off('scroll');
    });

    let main = this;
    let CALCULATION_THROTTLE_MS = 5;
    let isAffix=false;
    let $container;
    let scrollMin = 0;
    let scrollMax = 0;
    let scrollTransition = 0;

    let collapseScrollTop = 0;
    let lastScrollTop = 0;
    let lastUpScroll = 0;
    let lastDownScroll = 0;
    let collapseClass = this.collapseClass;
    let isCollapsible = this.isCollapsible == 'true' ? true : false;

    $container = getParentWithClass($element, this.groupListClass);

    let calculateScrollLimits = (scrollTop) => {
        //console.log('calculateScrollLimits');
        let containerPosition = position($container);
        let elementOffset = offset($element);
        let containerTop = containerPosition.top;
        let containerHeight = containerPosition.height;
        let affixHeight = elementOffset.height
        let offsetTopRelative = Math.round(elementOffset.top - containerTop);

        if (isAffix) {
            affixHeight = offset(StickerScrollService.currentSticker).height;
        }

        scrollMin = scrollTop + containerTop + offsetTopRelative;
        scrollMax = scrollMin + containerHeight - offsetTopRelative;
        scrollTransition = scrollMax - affixHeight;

    };

    var collapseSticker = function(scrollTop){
        let containerPosition = position($container);
        let elementPosition = position($element);
        let elementOffset = offset($element);
        let elementHeight = elementPosition.height;

        let containerTop = containerPosition.top;
        let current = StickerScrollService.currentSticker;

        if(scrollTop > lastScrollTop) {
            lastDownScroll = scrollTop;
            if(containerTop <= -elementHeight && !current.hasClass(collapseClass)){
                collapseScrollTop = scrollTop;
                current.addClass(collapseClass);
            }
        }
        if(scrollTop < lastScrollTop) {
            //console.log('upscroll');
            lastUpScroll = scrollTop;
            /* Rimuovi il collapse appena rientri nella storia precedente
            let offset = lastUpScroll - lastDownScroll;
            if(offset < -100 && current.hasClass(collapseClass)) {
                current.removeClass(collapseClass);
            }
            */
            if(containerTop > -150 && current.hasClass(collapseClass)){
                current.removeClass(collapseClass);
            }
        }
        lastScrollTop = scrollTop;

        if (containerTop >= -elementHeight && current.hasClass(collapseClass)) {
            //console.info('>REM collapseScrollTop='+collapseScrollTop);
            collapseScrollTop = 0;
            current.removeClass(collapseClass);
        }
    };


    // throttled version of the same calculation
    let throttledCalculateScrollLimits = throttle(
        calculateScrollLimits,
        CALCULATION_THROTTLE_MS,
        {trailing: false}
    );


    function createSticker(){
        let clone = $element.children().children().clone();
        clone.css({
            display:'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
        });
        if(collapseClass && !isCollapsible){
            clone.addClass(collapseClass);
        }

        let compiled = $compile(clone)($scope);
        main.stickerScroll.addSticker(compiled, offset($element));
    }

    function initScroll($ionicScroll){
        angular.element($ionicScroll.element).on('scroll', function (event) {
            let scrollTop = (event.detail || event.originalEvent && event.originalEvent.detail).scrollTop;

            if (scrollTop == 0) {
                calculateScrollLimits(scrollTop);
            }
            else {
                throttledCalculateScrollLimits(scrollTop);
            }

            // when we scrolled to the container, create the clone of element and place it on top
            if (scrollTop >= scrollMin && scrollTop <= scrollMax) {
                var cloneCreatedJustNow = false;
                if (!isAffix) {
                    isAffix = true;
                    main.stickerScroll.showSticker(main.index);
                    cloneCreatedJustNow = true;
                } else {
                    if(isCollapsible){
                        collapseSticker(scrollTop);
                    }
                }
                if (scrollTop > scrollTransition) {
                    translateUp(StickerScrollService.currentSticker[0], Math.floor(scrollTop - scrollTransition), cloneCreatedJustNow);
                } else {
                    translateUp(StickerScrollService.currentSticker[0], 0, cloneCreatedJustNow);
                }
            } else {
                removeMe();
            }
        });
    }



    function translateUp(element, dy, executeImmediately) {
        //console.log('>executeImmediately='+executeImmediately);
        var translateDyPixelsUp = dy == 0 ? 'translate3d(0px, 0px, 0px)' : 'translate3d(0px, -' + dy + 'px, 0px)';
        // if immediate execution is requested, then just execute immediately
        // if not, execute in the animation frame.
        if (executeImmediately) {
            applyTransform(element, translateDyPixelsUp);
        }
        else {
            // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
            // see http://ionicframework.com/docs/api/utility/ionic.DomUtil/
            requestAnimationFrame(function () {
                applyTransform(element, translateDyPixelsUp);
            });
        }
    }

    function applyTransform(element, transformString) {
        // do not apply the transformation if it is already applied
        if (element.style[ionic.CSS.TRANSFORM] == transformString) {
        }
        else {
            element.style[ionic.CSS.TRANSFORM] = transformString;
        }
    }

    function removeMe(){
        if (isAffix){
            main.stickerScroll.hideSticker(main.index);
            isAffix = false;
        }

    }

    // see https://api.jquery.com/closest/ and http://ionicframework.com/docs/api/utility/ionic.DomUtil/
    function getParentWithClass(elementSelector, parentClass) {
        return angular.element(ionic.DomUtil.getParentWithClass(elementSelector[0], parentClass));
    }

    // see http://underscorejs.org/#throttle
    function throttle(theFunction) {
        return ionic.Utils.throttle(theFunction);
    }

    // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    // see http://ionicframework.com/docs/api/utility/ionic.DomUtil/
    function requestAnimationFrame(callback) {
        return ionic.requestAnimationFrame(callback);
    }

    // see https://api.jquery.com/offset/
    // see http://ionicframework.com/docs/api/service/$ionicPosition/
    function offset(elementSelector) {
        return $ionicPosition.offset(elementSelector);
    }

    // see https://api.jquery.com/position/
    // see http://ionicframework.com/docs/api/service/$ionicPosition/
    function position(elementSelector) {
        return $ionicPosition.position(elementSelector);
    }
}


