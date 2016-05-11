import 'angular/angular';
import 'angular-animate/angular-animate';
import 'angular-sanitize/angular-sanitize';
import 'ionic-sdk/release/js/angular-ui/angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';

import stickerScroll from './sticker-scroll/stickerScroll.module';

const app = angular.module('sticker-scroll-demo', [
	'ionic',
	stickerScroll.name
]);
export default app;