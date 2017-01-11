class TaskService {

	task001 = ["talk","001", "幽灵之声", "请和幽灵谈谈人生！", "npc_0", "npc_1","002",null,new Arms("rod_png","黑暗大法师法杖",45)]
	task002 = ["kill","002", "清道夫", "请干掉10个怪物证明你的实力", "npc_1", "npc_1","","10",null]

	npcList: Npc[] = new Array();
	taskPanel = new TaskPanel();
    private observerList: Observer[] = new Array();
	private taskList: Task[] = new Array();;

	constructor() {
		this.observerList.push(this.taskPanel);
		this.addTasks(this.task001, TaskStatus.ACCEPTABLE);
		this.addTasks(this.task002, TaskStatus.UNACCEPTABLE);
	}

	finish(id: string) {
        for (var i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].id == id) {
				this.taskList[i].status = TaskStatus.SUBMITED;
				for(var j = 0; j < this.taskList.length; j++) {
					if(this.taskList[j].id == this.taskList[i].nextTaskId) {
						this.taskList[j].status = TaskStatus.ACCEPTABLE;
					}
				}
				this.notify();
			}
		}
	}

	accept(id: string) {
        for (var i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].id == id) {
				if(this.taskList[i].tasktype == "talk"){
				    this.taskList[i].status = TaskStatus.CAN_SUBMIT;
				}else {
					this.taskList[i].status = TaskStatus.DURING;
				}
				this.notify();
			}
		}
	}
    
	addTasks(str:any[],sta:TaskStatus) {
		var task = new Task(str, sta);
		this.taskList.push(task);
		task.taskService = this;
	}

	getTasks(id:string):Task {
		for (var i = 0; i < this.taskList.length; i++) {
            if (id == this.taskList[i].id) {
				return this.taskList[i];
			}
		}
	}

	addNpc(npc: Npc) {
		npc.setTaskService(this);
        this.npcList.push(npc);
		this.observerList.push(npc);
		for (var i = 0; i < this.taskList.length; i++) {
			for (var j = 0; j < this.npcList.length; j++) {
				if (this.taskList[i].fromNpcId == this.npcList[j].id) {
					this.npcList[j].addTask(this.taskList[i]);
				}
				if (this.taskList[i].toNpcId == this.npcList[j].id) {
					this.npcList[j].addTask(this.taskList[i]);
				}
			}
		}
		this.notify();
	}

	notify() {
		for (var i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].status != TaskStatus.UNACCEPTABLE) {
				for (var j = 0; j < this.observerList.length; j++) {
					this.observerList[j].onChange(this.taskList[i]);
				}
			}
		}
	}
}