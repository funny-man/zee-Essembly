console.log('进入轮播了')
define(['jquery'], function ($) {
    function Carousel($ct) {
        this.$ct = $ct
    }
    //init初始化
    Carousel.prototype.init = function () {
        //this.clock
        this.$ct.find('.img-ct li ').remove('.clone')
        this.$ct.find('.bullet li').remove()

        this.$imgsCt = this.$ct.find('.img-ct')

        this.$imgCt = this.$ct.find('.img-ct li ')


        this.$imgs = this.$ct.find('.img-ct li img')//就算后面在首尾clon了图片这里缓存的图片数量还是不变
        this.$nextBtn = this.$ct.find('.next')
        this.$preBtn = this.$ct.find('.pre')
        this.imgCount = this.$imgs.length//因为$imgs缓存的数据是不变的所以这个值也是不变的

        this.ctWidth = this.$ct.width()

        this.$imgs.css('width', this.ctWidth)
        //console.log(this.$imgs.height()+'aaa')
        this.imgHeight = this.$imgs.height()
        this.$ct.height(this.imgHeight)
        this.$imgsCt.width((this.imgCount + 2) * this.ctWidth)//通过js设置图片容器宽度；可以在里面增加图片不会出现宽度不够

        this.$bulletCt = this.$ct.find('.bullet')
        this.pageIndex = 0
        this.isLock = false//设置锁防止pageIndex通过在多次点击的时候超出了-1~3的范围

        this.$imgsCt.append(this.$imgCt.first().clone().addClass('clone'))
        this.$imgsCt.prepend(this.$imgCt.last().clone().addClass('clone'))//在首位分别克隆一个图片
        //----

        for (var i = 0; i < this.imgCount; i++) {
            this.$bulletCt.append('<li></li>')
        }//根据图片多少添加下面指示器的数量
        this.$bullet = this.$bulletCt.find('li')//根据选中所有指示器
        this.$bullet.eq(0).addClass('active') //为第一个指示器设置默认样式
        this.$imgsCt.css({ left: -this.$ct.width() })
        //----
    }
    //bind绑定事件
    Carousel.prototype.bind = function () {
        var _this = this
        this.$nextBtn.on('click', function () {
            if (_this.isLock) {
                return
            } else {
                _this.isLock = true;
                _this.playNext(1)
            }
        })
        this.$preBtn.on('click', function () {
            if (_this.isLock) {
                return
            } else {
                _this.isLock = true;
                _this.playPre(1)
            }
        })
        this.$bullet.on('click', function () {
            var index = $(this).index()
            if (_this.isLock) {
                return
            } if (index < _this.pageIndex) {
                _this.isLock = true;
                _this.playPre(_this.pageIndex - index)
            } else {
                _this.isLock = true;
                _this.playNext(index - _this.pageIndex)
            }
            console.log($(this).index())
        })
    }
    Carousel.prototype.off = function () {
        var _this = this
        this.$nextBtn.off('click')
        this.$preBtn.off('click')
        this.$bullet.off('click')
    }
    Carousel.prototype.playNext = function (len) {
        var _this = this
        console.log(this.ctWidth + 'vvv')
        this.$imgsCt.animate({ left: '-=' + _this.ctWidth * len }, function () {
            //console.log(_this)
            _this.pageIndex += len
            if (_this.pageIndex === _this.imgCount) {
                _this.$imgsCt.css({ left: -_this.ctWidth })
                _this.pageIndex = 0
            }
            _this.showBullet()
            _this.isLock = false;
        })
    }
    Carousel.prototype.playPre = function (len) {
        var _this = this
        this.$imgsCt.animate({ left: '+=' + _this.ctWidth * len }, function () {
            _this.pageIndex -= len
            if (_this.pageIndex < 0) {
                _this.$imgsCt.css({ left: -_this.ctWidth * _this.imgCount })
                _this.pageIndex = _this.imgCount - 1
            }
            _this.showBullet()
            _this.isLock = false;
        })
    }
    Carousel.prototype.autoPlay = function () {
        this.clock = setInterval(() => {
            this.playNext(1)
        }, 3000)
    }
    Carousel.prototype.stopPlay = function () {
        clearInterval(this.clock);
    }
    Carousel.prototype.showBullet = function () {
        this.$bullet.removeClass('active')
            .eq(this.pageIndex)
            .addClass('active')
    }

    return Carousel
    //carouselAll.init($('.carousel'))
});



