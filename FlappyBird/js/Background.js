/**
 * Created by html5 on 2017/11/18.
 */
(function () {
    window.Background = Class.extend({
        init : function (option) {
            option = option || {};
            // 图片
            this.image = option.image;
            // 坐标
            this.x = 0;
            this.y = option.y || 0;
            // 宽高
            this.width = option.width || 0;
            this.height = option.height || 0;
            // 速度
            this.speed = option.speed || 1;
            // 绘制的总个数
            this.count = parseInt(game.canvas.width / this.width) + 1;
        },

        // 绘制
        render : function () {
            for (var i = 0; i < 2 * this.count; i++) {
                game.ctx.drawImage(this.image,this.x + i * this.width,this.y,this.width,this.height);
            }

        },

        // 更新
        update : function () {
            this.x -= this.speed;
            // 还原离开屏幕背景的位置
            if(this.x <= -this.width*this.count){
                this.x = 0;
            }
        },

        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();