
define(['jquery'], function ($) {
    function GoTop(ct) {
        this.ct = ct;
        this.target = $('<div class="go-top">点击回到顶部</div>');
    }
    GoTop.prototype.createNode = function () {
        this.ct.append(this.target);
    };
    GoTop.prototype.bindEvent = function () {
        var _this = this;
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            console.log(scrollTop);
            if (scrollTop > 500) {
                _this.target.fadeIn(1000);
            } else {
                _this.target.fadeOut(1000);
            }
        });
        this.target.on('click', function () {
            $("html,body").animate({ scrollTop: '0px' }, 1000);
            //$(window).scrollTop(0);//无过度动画
        });
    };
    return GoTop
})