var Npc = (function () {
    function Npc(id, png) {
        this.animate = new egret.DisplayObjectContainer();
        this.animateBitmap = new egret.Bitmap();
        this.emoji = new egret.Bitmap();
        this.taskTalk = new TalkPanel();
        this.taskRelate = new Array();
        this.ownTasks = new Array();
        this.animationMode = 1;
        this.animateFrame = 250;
        this.id = id;
        this.png = png;
        this.animate.addChild(this.animateBitmap);
        this.getMoveStatus(1);
        this.animate.addChild(this.emoji);
        this.animate.touchEnabled = true;
        this.taskTalk.ownNpc = this;
    }
    var d = __define,c=Npc,p=c.prototype;
    p.onChange = function (task) {
        for (var i = 0; i < this.ownTasks.length; i++) {
            if (task.id == this.ownTasks[i].id) {
                this.changeTaskStatus(task.status, i);
                this.taskTalk.setTaskInTaskPanel(task, this.taskRelate[i]);
            }
        }
    }; //根据相关任务状态改变而改变
    p.setTaskService = function (taskService) {
        this.taskService = taskService;
    }; //给NPC绑定相关TaskService
    p.addTask = function (task) {
        var sta;
        if (task.fromNpcId == this.id) {
            if (task.toNpcId == this.id) {
                sta = TaskRelate.BOTH;
            }
            else {
                sta = TaskRelate.PROMULGATOR;
            }
        }
        if (task.toNpcId == this.id && task.fromNpcId != this.id) {
            sta = TaskRelate.DELIVERYMAN;
        }
        this.ownTasks.push(task);
        this.taskRelate.push(sta);
    }; //给NPC绑定相关任务
    p.changeTaskStatus = function (str, i) {
        switch (str) {
            case 0:
                this.taskOff();
                break;
            case 1:
                if (this.taskRelate[i] == 0 || this.taskRelate[i] == 2) {
                    this.taskOn(1);
                }
                break;
            case 2:
                this.taskOn(2);
                break;
            case 3:
                this.taskOff();
                if (this.taskRelate[i] == 1 || this.taskRelate[i] == 2) {
                    this.taskOn(3);
                }
                break;
            case 4:
                this.taskOff();
                break;
        }
    }; //任务状态符号
    p.taskOff = function () {
        this.animate.removeChild(this.emoji);
        this.emoji = new egret.Bitmap();
        this.animate.addChild(this.emoji);
    };
    p.taskOn = function (status) {
        var str;
        this.animate.removeChild(this.emoji);
        switch (status) {
            case 1:
                str = "mission_acceptable_png";
                break;
            case 2:
                str = "mission_ongoing_png";
                break;
            case 3:
                str = "mission_finish_png";
                break;
        }
        this.emoji = this.createBitmapByName(str);
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    };
    p.onNpcClick = function (characterX, characterY, rangeX, rangeY) {
        var result;
        var lengthX = characterX - this.animate.x;
        var lengthY = characterY - this.animate.y;
        var pathLength = Math.pow(lengthX * lengthX + lengthY * lengthY, 1 / 2);
        if (Math.abs(pathLength) < (Math.max(rangeX, rangeY) + 5)) {
            if (lengthX > 5) {
                this.setAnimationMode(3);
                result = 2;
            }
            if (lengthX < -5) {
                this.setAnimationMode(2);
                result = 3;
            }
            if (lengthY > 5) {
                this.setAnimationMode(1);
                result = 0;
            }
            if (lengthY < -5) {
                this.setAnimationMode(0);
                result = 1;
            }
            this.taskTalk.moveUp();
            return result;
        }
    }; //NPC反应和人物面对面
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
    p.getMoveStatus = function (status) {
        var str;
        this.animate.removeChild(this.animateBitmap);
        switch (status) {
            case 0:
                str = [this.png[0], this.png[1], this.png[2], this.png[3]];
                this.animateBitmap = this.createBitmapByName(this.png[0]);
                break;
            case 1:
                str = [this.png[4], this.png[5], this.png[6], this.png[7]];
                this.animateBitmap = this.createBitmapByName(this.png[4]);
                break;
            case 2:
                str = [this.png[8], this.png[9], this.png[10], this.png[11]];
                this.animateBitmap = this.createBitmapByName(this.png[8]);
                break;
            case 3:
                str = [this.png[12], this.png[13], this.png[14], this.png[15]];
                this.animateBitmap = this.createBitmapByName(this.png[12]);
                break;
        }
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    };
    p.playAnimation = function (bit, s) {
        var t = this.animateFrame;
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
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    };
    return Npc;
}());
egret.registerClass(Npc,'Npc',["Observer"]);
//# sourceMappingURL=Npc.js.map