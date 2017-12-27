(function () {
    window.Game = Class.extend({
        init : function (option) {
            option = option || {};
            // 0.备份this
            var self = this;
            // 1.fps
            this.fps = option.fps || 60;
            // 2.创建帧工具对象
            this.frameUtil = new FrameUtil();
            // 3.获取canvas和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.ctx = this.canvas.getContext('2d');
            // 4.创建加载数据对象
            this.staticSourceUtil = new StaticSourceUtil();
            // 5.保存所有的图片数据
            this.allImageObj = {};
            // 5.加载数据
            // 需要：所有的图片对象,所有图片的个数，已经加载好的图片个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
                // 所有的图片对象加载完毕在保存
                if(allImageCount == loadImageCount){ // 加载完毕
                    self.allImageObj = allImageObj;
                    // 运行游戏
                    self.run();
                }
            })

            // 记录游戏的运行状态
            this.isRun = true;
        },

        // 开始游戏
        run : function () {
            // 备份this
            var self = this;
            this.timer = setInterval(function () {
                self.runLoop();
            },1000/self.fps); // fps = 50   1000/fps-->1帧需要的时间

            // 1.创建房子
            this.fangzi = new Background({
                image : this.allImageObj['fangzi'],
                y : this.canvas.height - 256 - 100,
                width : 300,
                height : 256,
                speed : 2
            });
            // 2.创建树
            this.shu = new Background({
                image : this.allImageObj['shu'],
                y : this.canvas.height - 216 - 48,
                width : 300,
                height : 216,
                speed : 3
            });

            // 3.创建地板
            this.diban = new Background({
                image : this.allImageObj['diban'],
                y : this.canvas.height - 48,
                width : 48,
                height : 48,
                speed : 4
            });

            // 4.管道数组
            this.pipeArr = [new Pipe()];

            // 5.创建小鸟
            this.bird = new Bird();
        },

        // 游戏的运行循环,每一帧都要执行一次
        runLoop : function () {
            // 0.清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            // 1.计算真实的fps
            this.frameUtil.countFps();

            // 2.绘制fps 、/fno
            this.ctx.fillText('FPS /' + this.frameUtil.realFps,15,15);
            this.ctx.fillText('FNO /' + this.frameUtil.currentFrame,15,30);
            // 3.更新和渲染房子
            this.fangzi.update();
            this.fangzi.render();

            // 4.更新和渲染树
            this.shu.update();
            this.shu.render();

            // 5.更新和渲染地板
            this.diban.update();
            this.diban.render();

            // 6.每100帧创建一个新的管道
            if(this.frameUtil.currentFrame % 100 == 0 && this.isRun){
                this.pipeArr.push(new Pipe());
            }

            // 7.更新和渲染管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].render();
            }

            // 8.更新和渲染小鸟
            this.bird.update();
            this.bird.render();
        },

        // 暂停游戏
        pause : function () {
            clearInterval(this.timer);
        },

        // 结束游戏
        gameOver : function () {
            // 0.游戏结束
            this.isRun = false;
            // 1.暂停背景
            this.fangzi.pause();
            this.diban.pause();
            this.shu.pause();
            // 2.暂停管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }
            // 发去通知，告诉鸟挂了
            this.bird.die = true;
        }
    });
})();
