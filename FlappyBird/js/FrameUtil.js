/**
 * Created by html5 on 2017/11/18.
 */
// 帧工具类：专门计算真实的fps和总的帧数
(function () {
    window.FrameUtil = Class.extend({
        init : function () {
            // 1.当前的帧数
            this.currentFrame = 0;
            // 2.开始帧数
            this.sFrame = 0;
            // 3.开始的时间
            this.sTime = new Date();
            // 4.真实的 fps
            this.realFps = 0;
        },

        // 计算,每一帧都要执行
        countFps : function () {
            // 累加当前的帧数
            this.currentFrame ++;

            // 当前的时间
            var currentTime = new Date();

            // 判断是否走过了1秒
            if(currentTime - this.sTime >= 1000){
                //  计算真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                // 更新开始的帧数
                this.sFrame = this.currentFrame;
                // 更新开始的时间
                this.sTime = new Date();

            }
        }

    });
})();