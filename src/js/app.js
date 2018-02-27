//这是入口文件


//requirejs的配置设置了基准目录和特殊模块的目录
requirejs.config({
    bascUrl:'src/js',

    paths:{
        'jquery':'lib/bower_components/jquery/dist/jquery.min'
    }
});

//载入模块
console.log(1)
requirejs(['app/index'])

console.log(2)
