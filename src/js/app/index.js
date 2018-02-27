// (function (name, definition, context) {
//     if (typeof module != 'undefined' && module.exports) {
//         // 在 CommonJS 规范下 (node)
//         module.exports = definition();
//     } else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define']['cmd'])) {
//         //在 AMD 规范下(RequireJS) 或者 CMD 规范下(SeaJS)
//         define(definition);
//     } else {
//         //在浏览器环境下
//         context[name] = definition();
//     }
// })('sample', function () {

//     var sample = (function () {
//         "use strict";

//         var a = 1;

//         function inc() {
//             a++;
//         }

//         function get() {
//             return a;
//         }

//         return {
//             inc: inc,
//             get: get
//         }

//     })();

//     return sample;

// }, this);
console.log(3)
define(['jquery', 'com/carousel', 'com/gotop', 'com/waterfall'], function ($, Carousel, GoTop, Waterfall) {
    //轮播
    var clock
    var _carousel = new Carousel($('.carousel'))
    _carousel.init()
    _carousel.bind()
    _carousel.autoPlay()
    $(window).resize(function () {
        console.log('改变大小')
        if (clock) {
            clearTimeout(clock)
        }
        clock = setTimeout(function () {
            console.log('执行')
            _carousel.stopPlay()
            _carousel.off()
            _carousel = new Carousel($('.carousel'))
            _carousel.init()
            _carousel.bind()
            _carousel.autoPlay()
            _waterfall.layout()
        }, 800);
    })
    //gotop
    var _gotop = new GoTop($('body'))
    _gotop.createNode();
    _gotop.bindEvent();
    //瀑布流
    var _waterfall = new Waterfall($('.content'))
    _waterfall.init()
    _waterfall.layout()
});