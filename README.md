#### Sticker Scroll
**sticker-scroll** is a lightweight Angular directive for Ionic framework to have sticky affix elements.
Directive requires no additional dependencies. Just Ionic and Angular.
The inspiration of this project is: https://github.com/aliok/ion-affix
but it suffer by flickering effect when you try to affix a directive, so it works fine only for simply dom element.
The new `<sticker-scroll>` has great performance scroll animation.

Is similar to sticky header concept.
Affix an HTML element (compile it in Angular) and show it.
Developed in Es6 JavaScript and new command `.component()` Angular 1.5
A particular attention to performance. The old project (ion-affix) 


### Extend || Contribute
* Clone the repo
* Issue command `gulp`
* Check if the demos are working : <http://localhost:3000>
* I would appreciate if someone spends time and introduces E2E testing


### Release process
* Use new component of Angular 1.5
* Use Es6 JavaScript + Webpack
* Improove performance. Look and feel Native Instagram Scroll!
* Possible to stick a complex componente
* Possible to collapse sticker (via addClass(cssclass)) after X px


###TODO
* Calculate offset top of scroll content
* Attach in dom only next and prev sticker and not all