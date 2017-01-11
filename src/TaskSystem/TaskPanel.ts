class TaskPanel implements Observer {

    panel = new egret.DisplayObjectContainer();
    panelBitmap = this.createBitmapByName("task_panel_png");
    button = this.createBitmapByName("task_move_png");
    textField = this.createText(20, 20, 20);
    taskStatus = this.createText(20, 20, 20);
    taskTargetNumber = this.createText(20, 20, 20);
    user:User;

    private button_use = true;

    constructor() {
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

    onChange(task: Task) {
        if (task.status != TaskStatus.UNACCEPTABLE) {
            this.textField.text = task.name;
            var text;
            switch (task.status) {
                case 0: text = "Unacceptable"; break;
                case 1: text = "Acceptable"; break;
                case 2: text = "During";
                        if(task.tasktype == "kill") { 
                            this.taskTargetNumber.text = task.taskOngoing(false);
                        }break;
                case 3: text = "Can Submit";
                        if(task.tasktype == "kill") { 
                            this.taskTargetNumber.text = task.taskOngoing(false);
                        }
                        break;
                case 4: text = "Submited"; 
                        if(task.taskPayArm && task.taskHavePay) {
                            console.log(task.tasktype);
                            task.taskPayArm.pic.x = 60;
                            task.taskPayArm.pic.y = 150;
					        this.panel.addChild(task.taskPayArm.pic);
                            task.taskPayArm.pic.touchEnabled = true;
                            task.taskPayArm.pic.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                                this.user.getHeroList()[0].addArms(task.taskPayArm);
                                this.panel.removeChild(task.taskPayArm.pic);
                            },this);
                            task.taskHavePay = false;
				        }
                        break;
            }
            this.taskStatus.text = text;
        }
    }

    addUser(user:User) {
        this.user = user;
    }

    private onButtonClick() {
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.button_use == false) {
                this.moveLeft();
                this.button_use = true;
            } else {
                this.moveRight();
                this.button_use = false;
            }

        }, this);
    }

    private moveLeft() {
        egret.Tween.get(this.panel).to({ x: 460 }, 500, egret.Ease.sineIn);
    }

    private moveRight() {
        egret.Tween.get(this.panel).to({ x: 640 }, 500, egret.Ease.sineIn);
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createText(x: number, y: number, s: number): egret.TextField {
        var nomalText = new egret.TextField();
        nomalText.textColor = 0xffffff;
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        return nomalText;
    }
}