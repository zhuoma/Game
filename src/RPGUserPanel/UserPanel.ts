class UserPanel extends egret.DisplayObjectContainer {
    
    private user:User;
    private panel = this.createBitmapByName("userpanel_png");
    private button =  this.createBitmapByName("heroes_png");
    private hero_locate:Locations[] = [new Locations(245,203),new Locations(245,57)];
    private arms_locate:Locations[] = [new Locations(384,71),new Locations(384,150),new Locations(384,229)];
    private jewel_locate:Locations[] = [new Locations(468,87),new Locations(531,87),
                                        new Locations(468,168),new Locations(531,168),
                                        new Locations(468,246),new Locations(531,246)];

    private text1 = this.createText(55,67,15);
    private text2 = this.createText(55,87,15);
    private text3 = this.createText(55,107,15);
    private text4 = this.createText(55,127,15);
    private text5 = this.createText(55,147,15);
    private text6 = this.createText(55,167,15);

    constructor() {
        super(); 
        this.y = -355;
        this.addChild(this.panel);

        this.button.x = 237.5;
        this.button.y = 338;
        this.button.touchEnabled = true;
        this.button.addEventListener( egret.TouchEvent.TOUCH_TAP,this.move,this);
        this.addChild(this.button);
    }

    setUser(user:User) {  
        this.user = user;
        this.user.getHeroList()[0].addEventListener(updateDate.change,() => {
            this.upDate();
        },this)
        this.setUI();
        this.setDec();
    }

    upDate() {
        this.setUI();
        this.setDec();
    }

    private setUI() {
        for(var i = 0;i < this.user.getHeroList().length;i++) {
            this.user.getHeroList()[i].pic.x = this.hero_locate[i].x;
            this.user.getHeroList()[i].pic.y = this.hero_locate[i].y;
            this.addChild(this.user.getHeroList()[i].pic);
            var loc = 0;

            for(var j = 0;j < this.user.getHeroList()[i].getArmList().length;j++) {
                this.user.getHeroList()[i].getArmList()[j].pic.x = this.arms_locate[j].x;
                this.user.getHeroList()[i].getArmList()[j].pic.y = this.arms_locate[j].y;
                this.addChild(this.user.getHeroList()[i].getArmList()[j].pic);

                for(var z = 0;z < this.user.getHeroList()[i].getArmList()[j].getJewelList().length;z++) {
                    this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic.x = this.jewel_locate[loc].x;
                    this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic.y = this.jewel_locate[loc].y;
                    this.addChild(this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic);
                    loc++;
                }
                loc = (j + 1) * 2;
            }
        }
    }

    private setDec() {
        this.text1.text = "玩家:" + this.user.getName();
        this.text2.text = "总战斗力:" + this.user.fightingCapacity;
        this.text3.text = "英雄:" + this.user.getHeroList()[0].getName() + "  等级:" + this.user.getHeroList()[0].getLevel();
        this.text4.text = "生命值:" + this.user.getHeroList()[0].life;
        this.text5.text = "攻击力:" + this.user.getHeroList()[0].attack;
        this.text6.text = "防御力:" + this.user.getHeroList()[0].defense;
        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
        this.addChild(this.text4);
        this.addChild(this.text5);
        this.addChild(this.text6);
    }

    private move(){
        if(this.y < 0) {
            egret.Tween.get(this).to({y:0},500,egret.Ease.sineIn);
        }else {
            egret.Tween.get(this).to({y:-355},500,egret.Ease.sineIn);
        }
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
    }//格式化生成文字（具有相同特点）
}


