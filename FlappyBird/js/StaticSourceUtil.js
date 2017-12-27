/**
 * Created by html5 on 2017/11/18.
 */
// 加载本地数据 --》图片 视频
(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 所有的图片对象
            this.allImageObj = {};
        },

        // 加载图片dom对象
        // 返回：所有的图片对象,所有图片的个数，已经加载好的图片个数
        loadImage : function (jsonUrl,callBack) {
            // 0.备份this
            var self = this;
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();
            // 2.ajax三步走
            xhr.open('get',jsonUrl);
            xhr.send();
            // 3.判断请求是否成功
            // 当 readyState 等于 4 且状态为 200 时，表示请求成功
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState==4 && xhr.status==200)
                {
                    // 已经加载好的图片个数
                    var loadImageCount = 0;
                    // 获取请求的数据(json字符串)
                    var responseText = xhr.responseText;
                    // json字符串-》对象
                    var responseJson = JSON.parse(responseText);
                    // 获取数组
                    var dataArray = responseJson.images;
                    // 遍历数组创建图片对象
                    for (var i = 0; i < dataArray.length; i++) {
                        // 创建图片对象
                        var image = new Image();
                        image.src = dataArray[i].src;
                        image.index = i;
                        // 加载完毕后返回
                        image.onload = function () {
                            // 累加已经加载好的图片个数
                             loadImageCount ++;
                            var key = dataArray[this.index].name;
                            // key-->name属性的值
                            // value -》图片对象 this
                            self.allImageObj[key] = this;
                            // 返回数据
                            callBack(self.allImageObj,dataArray.length,loadImageCount);
                        }
                        
                    }
                }
            }
        }
    });
})();