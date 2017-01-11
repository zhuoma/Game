class Npc implements Observer {

    animate = new egret.DisplayObjectContainer();
    private animateBitmap = new egret.Bitmap();
    private emoji = new egret.Bitmap();

    id: string;
    private png: string[];

    taskService: TaskService;
    taskTalk = new TalkPanel();

    private taskRelate: TaskRelate[] = new Array();
    private ownTasks: Task[] = new Array();

    constructor(id: string, png: string[]) {
        this.id = id;
        this.png = png;

        this.animate.addChild(this.animateBitmap)
        this.getMoveStatus(1);
        this.animate.addChild(this.emoji);
        this.animate.touchEnabled = true;

        this.taskTalk.ownNpc = this;
    }


    onChange(task: Task) {
        for (var i = 0; i < this.ownTasks.length; i++) {
            if (task.id == this.ownTasks[i].id) {
                this.changeTaskStatus(task.status, i);
                this.taskTalk.setTaskInTaskPanel(task, this.taskRelate[i]);
            }
        }
    }//根据相关任务状态改变而改变

    setTaskService(taskService: TaskService) {
        this.taskService = taskService;
    }//给NPC绑定相关TaskService

    addTask(task: Task) {
        var sta;
        if (task.fromNpcId == this.id) {
            if (task.toNpcId == this.id) {
                sta = TaskRelate.BOTH;
            } else {
                sta = TaskRelate.PROMULGATOR;
            }
        }
        if (task.toNpcId == this.id && task.fromNpcId != this.id) {
            sta = TaskRelate.DELIVERYMAN;
        }
        this.ownTasks.push(task);
        this.taskRelate.push(sta);
    }//给NPC绑定相关任务

    private changeTaskStatus(str: TaskStatus, i: number) {
        switch (str) {
            case 0: this.taskOff();
                break;
            case 1: if (this.taskRelate[i] == 0 || this.taskRelate[i] == 2) {
                this.taskOn(1);
            }
                break;
            case 2: this.taskOn(2);
                break;
            case 3: this.taskOff();
                if (this.taskRelate[i] == 1 || this.taskRelate[i] == 2) {
                    this.taskOn(3);
                }
                break;
            case 4: this.taskOff();
                break;
        }
    }//任务状态符号

    private taskOff() {
        this.animate.removeChild(this.emoji);
        this.emoji = new egret.Bitmap();
        this.animate.addChild(this.emoji);
    }

    private taskOn(status: TaskStatus) {
        var str;
        this.animate.removeChild(this.emoji);
        switch (status) {
            case 1: str = "mission_acceptable_png";
                break;
            case 2: str = "mission_ongoing_png";
                break;
            case 3: str = "mission_finish_png";
                break;
        }
        this.emoji = this.createBitmapByName(str);
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    }

    onNpcClick(characterX: number, characterY: number, rangeX: number, rangeY: number): number {
        var result: number;
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
    }//NPC反应和人物面对面

    private animationMode = 1;

    private setAnimationMode(mode: Animation) {
        this.animationMode = mode;
        switch (this.animationMode) {
            case 0: this.getMoveStatus(0); break;
            case 1: this.getMoveStatus(1); break;
            case 2: this.getMoveStatus(2); break;
            case 3: this.getMoveStatus(3); break;
        }
    }

    private getMoveStatus(status: Animation) {
        var str;
        this.animate.removeChild(this.animateBitmap);
        switch (status) {
            case 0: str = [this.png[0], this.png[1], this.png[2], this.png[3]];
                this.animateBitmap = this.createBitmapByName(this.png[0]);
                break;
            case 1: str = [this.png[4], this.png[5], this.png[6], this.png[7]];
                this.animateBitmap = this.createBitmapByName(this.png[4]);
                break;
            case 2: str = [this.png[8], this.png[9], this.png[10], this.png[11]];
                this.animateBitmap = this.createBitmapByName(this.png[8]);
                break;
            case 3: str = [this.png[12], this.png[13], this.png[14], this.png[15]];
                this.animateBitmap = this.createBitmapByName(this.png[12]);
                break;
        }
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    }

    private animateFrame = 250

    private playAnimation(bit: egret.Bitmap, s: string[]): void {
        var t = this.animateFrame;
        var i = 1;
        var change: Function = function () {
            var tw = egret.Tween.get(bit);
            tw.wait(t);
            tw.call(function changetex(): void {
                bit.texture = RES.getRes(s[i]);
            }, this);
            i++;
            if (i == s.length) {
                i = 1;
            }
            tw.call(change);
        };
        change();
    }//播放帧动画 

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    }
}