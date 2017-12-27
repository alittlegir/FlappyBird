

(function () {
    window.Bird = Class.extend({
        init : function () {
            this.width = 255 / 3;
            this.height = 60;
            this.x = (game.canvas.width - this.width) * 0.5;
            this.y = 100;

            // 翅膀的状态 合法值： 0 1 2
            this.wing = 0;
            // 变化的量
            this.dy = 0;
            // 下落是的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            // 旋转的角度
            this.rotateAngle = 0;
            // 小鸟的状态 0:下落 1：上升
            this.state = 0;
            // 空气的阻力
            this.deleteY = 1;
            // 绑定事件
            this.bindClick();
            // 鸟死亡的状态
            this.die = false;
            // 死亡动画的索引
            this.dieAnimationIndex = 0;
        },

        render : function () {
            // 鸟死亡后抛热血
            if(this.die == true){
                // 裁剪的宽度和高度
                var sWidth = 1625 / 5;
                var sHeight = 828 / 6;
                // 求出列号和行号
                var maxCol = 5;
                var col = this.dieAnimationIndex % maxCol;
                var row = parseInt(this.dieAnimationIndex / maxCol);
                // 绘制热血
                 game.ctx.drawImage(game.allImageObj['blood'],col * sWidth,row * sHeight,sWidth,sHeight,this.x - 100,this.y,sWidth,sWidth);

                 // 绘制游戏结束
                var gameOverX = (game.canvas.width - 626) * 0.5;
                var gameOverY = (game.canvas.height - 144) * 0.5;
                game.ctx.drawImage(game.allImageObj['gameover'],gameOverX,gameOverY);

                return;
            }

            game.ctx.save();
            // 位移
            game.ctx.translate(this.x + this.width * 0.5,this.y + this.height * 0.5);
            // 旋转
            game.ctx.rotate(this.rotateAngle * Math.PI / 180);

            // 还原坐标系
            game.ctx.translate(-(this.x + this.width * 0.5),-(this.y + this.height * 0.5));
            // 绘制
            game.ctx.drawImage(game.allImageObj['bird'],this.wing * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);

            game.ctx.restore();
        },

        update : function () {

            if(this.die){
                // 更新死亡动画的索引
                this.dieAnimationIndex ++;
                if(this.dieAnimationIndex >= 30){
                    // 暂停游戏
                    game.pause();
                }
                return;
            }

            // 1.每5帧更新一次状态
            if(game.frameUtil.currentFrame % 5 == 0){
                // 更新翅膀的状态
                this.wing++;
                if(this.wing > 2){
                    this.wing = 0;
                }
            }

            // 2.根据小鸟的状态判断是下落还是上升
            if(this.state == 0){ // 下落
                // 小鸟下落
                this.dy = 0.01 * Math.pow((game.frameUtil.currentFrame - this.dropFrame),2);
                // 更新下落的角度
                this.rotateAngle += 1;

            } else if (this.state == 1){ // 上升
                // 阻力越来越大
                this.deleteY++;
                //  默认上升14
                this.dy = -15 + this.deleteY;
                if(this.dy >= 0){ // 小鸟再次下落
                    // 改变小鸟的状态
                    this.state = 0;
                    // 更新下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }

            }

            // 3.更新Y
            this.y += this.dy;

            // 4.封锁上空
            if(this.y <=0){
                this.y = 0;
            }

            // 5.碰到地板，游戏结束
            if(this.y >= game.canvas.height - this.height - 48){
                game.gameOver();
            }
        },
        
        bindClick : function () {
            //  备份this
            var self = this;
            game.canvas.onmousedown = function () {
                // 改变小鸟的状态
                self.state = 1;
                // 更新小鸟的角度
                self.rotateAngle = -25;
                // 复位空气的阻力
                self.deleteY = 1;
            }
        }
    });

})();
