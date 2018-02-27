define(['jquery'], function ($) {
    function Waterfall($ct) {
        this.$ct = $ct
    }

    Waterfall.prototype.init = function () {

        this.color = ['#8796f1', '#bc90ec', '#fea99a', '#8cc5f7', '#fe7b7a', '#ffd666', '#60dc9e', '#ffa468', '#f694bd', '#fbbc6b']
        this.width = [200, 236, 272, 308, 344, 380]
        this.$items = this.$ct.find('.item')
        this.$itemCount = this.$items.size()

        //设置随机高度随机颜色
        for (var i = 0; i < this.$itemCount; i++) {
            this.$items.eq(i).css({
                'height': this.width[this.random(0, 6)],
                'background-color': this.color[this.random(0, 10)]
            })
        }
    }
    Waterfall.prototype.random = function (min, max) {
        return min + Math.floor(Math.random() * (max - min))
    }//min到max的随机整数不包括max
    Waterfall.prototype.layout= function () {
        var rowsNumber = parseInt(this.$ct.width() / this.$items.outerWidth(true)) //计算横排的数量
        var itemArr = []
        for (var i = 0; i < rowsNumber; i++) {
            itemArr[i] = 0
        }//初始化数组让数组里面都是0，且数组个数是图片横排数量
        this.$items.each(function () {
            var minValue = Math.min.apply(null, itemArr)//计算数组中最小的的数字
            var minIndex = itemArr.indexOf(minValue)//最小数组的index
            $(this).css({
                top: minValue,
                left: $(this).outerWidth(true) * minIndex
            })
            itemArr[minIndex] += $(this).outerHeight(true)
        });
    }

    return Waterfall
})