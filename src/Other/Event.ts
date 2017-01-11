class GetToEvent extends egret.Event {

    public static getTo: string = "Get";

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}

class taskAccept extends egret.Event {

    public static accept: string = "taskAccept";

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}

class taskFinish extends egret.Event {

    public static finish: string = "taskFinish";

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}

class updateDate extends egret.Event {

    public static change: string = "update";

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}