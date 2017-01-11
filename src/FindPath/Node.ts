class Pnode extends Locations {

	F: number;
	G: number;
	H: number;
	walkable: Boolean = true;
	parent: Pnode;
	costMultipier = 1;//消耗

	constructor(x: number, y: number) {
		super(x, y);
	}
}