var Player = (function () {
    function Player() {
        this.animate = new egret.DisplayObjectContainer();
        this.animationMode = 1;
        this.frameRate = 200;
        this.ifLeftRight = 0;
        this.timeOnEnterFrame = 0;
        this.speed = 0.15; //像素每毫秒
        this.getMoveStatus(1);
    }
    var d = __define,c=Player,p=c.prototype;
    p.setAnimationMode = function (mode) {
        this.animationMode = mode;
        switch (this.animationMode) {
            case 0:
                this.getMoveStatus(0);
                break;
            case 1:
                this.getMoveStatus(1);
                break;
            case 2:
                this.getMoveStatus(2);
                break;
            case 3:
                this.getMoveStatus(3);
                break;
        }
    };
    p.turnOver = function (mode) {
        this.setAnimationMode(mode);
    }; //外部使然的转向
    p.getMoveStatus = function (status) {
        var str;
        var animate;
        switch (status) {
            case 0:
                str = ["u1_png", "u2_png", "u3_png", "u4_png", "u5_png", "u6_png"];
                animate = this.createBitmapByName("u1_png");
                break;
            case 1:
                str = ["d1_png", "d2_png", "d3_png", "d4_png", "d5_png", "d6_png"];
                animate = this.createBitmapByName("d1_png");
                break;
            case 2:
                str = ["l1_png", "l2_png", "l3_png", "l4_png", "l5_png", "l6_png"];
                animate = this.createBitmapByName("l1_png");
                break;
            case 3:
                str = ["r1_png", "r2_png", "r3_png", "r4_png", "r5_png", "r6_png"];
                animate = this.createBitmapByName("r1_png");
                break;
        }
        this.animate.removeChildren();
        this.animate.addChild(animate);
        this.playAnimation(animate, str, this.frameRate);
    };
    p.playAnimation = function (bit, s, t) {
        var i = 1;
        var change = function () {
            var tw = egret.Tween.get(bit);
            tw.wait(t);
            tw.call(function changetex() {
                bit.texture = RES.getRes(s[i]);
            }, this);
            i++;
            if (i == s.length) {
                i = 1;
            }
            tw.call(change);
        };
        change();
    }; //播放帧动画
    p.moveTo = function (x, y) {
        this.targetX = x;
        this.targetY = y;
        var lengthX = this.targetX - this.animate.x;
        var lengthY = this.targetY - this.animate.y;
        if (lengthX >= 0) {
            if (lengthX >= Math.abs(lengthY)) {
                this.setAnimationMode(Animation.RIGHT);
            }
            else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                }
                else {
                    this.setAnimationMode(0);
                }
            }
        }
        else {
            if (Math.abs(lengthX) >= Math.abs(lengthY)) {
                this.setAnimationMode(2);
            }
            else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                }
                else {
                    this.setAnimationMode(0);
                }
            }
        } //人物朝向判断
        var pathLength = 0;
        pathLength = Math.pow(lengthX * lengthX + lengthY * lengthY, 1 / 2);
        this.xMove = lengthX / pathLength;
        this.yMove = lengthY / pathLength; //帧位移量
        this.animate.addEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        this.timeOnEnterFrame = egret.getTimer();
    };
    p.onMove = function (e) {
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        var getToTarget = new GetToEvent(GetToEvent.getTo);
        this.animate.x += this.speed * pass * this.xMove;
        this.animate.y += this.speed * pass * this.yMove;
        this.timeOnEnterFrame = egret.getTimer();
        if (this.animate.x - this.targetX < 3 && this.animate.x - this.targetX > -3 &&
            this.animate.y - this.targetY < 3 && this.animate.y - this.targetY > -3) {
            this.animate.removeEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
            this.animate.dispatchEvent(getToTarget);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    };
    return Player;
}());
egret.registerClass(Player,'Player');
//# sourceMappingURL=Characters.js.map