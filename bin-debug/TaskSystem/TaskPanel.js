var TaskPanel = (function () {
    function TaskPanel() {
        this.panel = new egret.DisplayObjectContainer();
        this.panelBitmap = this.createBitmapByName("task_panel_png");
        this.button = this.createBitmapByName("task_move_png");
        this.textField = this.createText(20, 20, 20);
        this.taskStatus = this.createText(20, 20, 20);
        this.taskTargetNumber = this.createText(20, 20, 20);
        this.button_use = true;
        this.panel.addChild(this.panelBitmap);
        this.button.x = -20;
        this.button.y = 108;
        this.button.touchEnabled = true;
        this.onButtonClick();
        this.panel.addChild(this.button);
        this.textField.width = 350;
        this.panel.addChild(this.textField);
        this.taskStatus.width = 350;
        this.taskStatus.y = 50;
        this.taskStatus.textColor = 0x00ff00;
        this.panel.addChild(this.taskStatus);
        this.taskTargetNumber.width = 350;
        this.taskTargetNumber.y = 70;
        this.panel.addChild(this.taskTargetNumber);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        var _this = this;
        if (task.status != TaskStatus.UNACCEPTABLE) {
            this.textField.text = task.name;
            var text;
            switch (task.status) {
                case 0:
                    text = "Unacceptable";
                    break;
                case 1:
                    text = "Acceptable";
                    break;
                case 2:
                    text = "During";
                    if (task.tasktype == "kill") {
                        this.taskTargetNumber.text = task.taskOngoing(false);
                    }
                    break;
                case 3:
                    text = "Can Submit";
                    if (task.tasktype == "kill") {
                        this.taskTargetNumber.text = task.taskOngoing(false);
                    }
                    break;
                case 4:
                    text = "Submited";
                    if (task.taskPayArm && task.taskHavePay) {
                        console.log(task.tasktype);
                        task.taskPayArm.pic.x = 60;
                        task.taskPayArm.pic.y = 150;
                        this.panel.addChild(task.taskPayArm.pic);
                        task.taskPayArm.pic.touchEnabled = true;
                        task.taskPayArm.pic.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            _this.user.getHeroList()[0].addArms(task.taskPayArm);
                            _this.panel.removeChild(task.taskPayArm.pic);
                        }, this);
                        task.taskHavePay = false;
                    }
                    break;
            }
            this.taskStatus.text = text;
        }
    };
    p.addUser = function (user) {
        this.user = user;
    };
    p.onButtonClick = function () {
        var _this = this;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.button_use == false) {
                _this.moveLeft();
                _this.button_use = true;
            }
            else {
                _this.moveRight();
                _this.button_use = false;
            }
        }, this);
    };
    p.moveLeft = function () {
        egret.Tween.get(this.panel).to({ x: 460 }, 500, egret.Ease.sineIn);
    };
    p.moveRight = function () {
        egret.Tween.get(this.panel).to({ x: 640 }, 500, egret.Ease.sineIn);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.createText = function (x, y, s) {
        var nomalText = new egret.TextField();
        nomalText.textColor = 0xffffff;
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        return nomalText;
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map