class User {

	private account = "";
	private password = "";
    private name = "";
	private heroList:Hero[] = new Array();

	constructor(account:string,password:string,name:string) {
		this.account = account;
		this.password = password;
		this.name = name;
	}
    
    getName() {
		return this.name;
	}

	getHeroList() {
		return this.heroList;
	}

    get fightingCapacity() {
        if(this.heroList.length > 0) {
			var sum = 0;
			for(var i = 0;i < this.heroList.length;i++) {
				sum += this.heroList[i].fightingCapacity;
			}
		}
		return sum;
	}

	addHeros(hero:Hero) {
		this.heroList.push(hero);
	}
}