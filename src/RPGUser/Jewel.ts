class Jewel {
	
	private name = "";
	private quality = 0;
	durabilityAdded = 0;
    pic:egret.Bitmap;
	constructor(pic:string,name:string,quality:number) {
		this.pic = this.createBitmapByName(pic);
		this.name = name;
		this.quality = quality;
		this.durabilityAdded = 5 * this.quality; 
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }//读入位图文件
}