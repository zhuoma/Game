var Cache: MethodDecorator = (target:any, propertyName, desc: PropertyDescriptor) => {
	const getter = desc.get;
	desc.get = function() {
		return getter.apply(this);
	}
	return desc;
}

class Hero extends egret.DisplayObjectContainer {

	private hero_name = "";
	private level = 1;
	private strength = 1;
	private physique = 1;
	private plus_attack = 0;
	private plus_defense = 0;
	private armsList:Arms[] = new Array();
	pic:egret.Bitmap;

	constructor(pic:string,name:string,level:number,strength:number,physique:number) {
		super();
		this.pic = this.createBitmapByName(pic);
		this.hero_name = name;
		this.level = level;
		this.strength = strength;
		this.physique = physique;
		this.updateData();
	}

	private updateData() {
        if(this.armsList.length > 0) {
			this.plus_attack = 0;
			this.plus_defense = 0;
			for(var i = 0;i < this.armsList.length;i++) {
				this.plus_attack += this.armsList[i].attack;
				this.plus_defense += this.armsList[i].defense;
			}
			var update: updateDate = new updateDate(updateDate.change);
			this.dispatchEvent(update);
		}
	}

	getLevel() {
		return this.level;
	}
    
    getName() {
		return this.name;
	}

	getArmList() {
		return this.armsList;
	}

	get life() {
		return (this.level * 0.1 + 1) * this.physique * 50 + this.plus_attack + this.plus_defense ;
	}

	get attack() {
		return (this.level * 0.08 + 1) * this.strength * 40 + this.plus_attack;
	}

	get defense() {
		return (this.level * 0.05 + 1) * this.physique * 30 + this.plus_defense;
	}
	
	get fightingCapacity() {
		return (this.level * 0.2 + 1) * (this.life * 0.2 + this.defense * 0.3 + this.attack * 0.5);
	}

	addArms(arm:Arms) {
		this.armsList.push(arm);
		this.updateData();
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }//读入位图文件
}