var GetToEvent = (function (_super) {
    __extends(GetToEvent, _super);
    function GetToEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GetToEvent,p=c.prototype;
    GetToEvent.getTo = "Get";
    return GetToEvent;
}(egret.Event));
egret.registerClass(GetToEvent,'GetToEvent');
var taskAccept = (function (_super) {
    __extends(taskAccept, _super);
    function taskAccept(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=taskAccept,p=c.prototype;
    taskAccept.accept = "taskAccept";
    return taskAccept;
}(egret.Event));
egret.registerClass(taskAccept,'taskAccept');
var taskFinish = (function (_super) {
    __extends(taskFinish, _super);
    function taskFinish(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=taskFinish,p=c.prototype;
    taskFinish.finish = "taskFinish";
    return taskFinish;
}(egret.Event));
egret.registerClass(taskFinish,'taskFinish');
var updateDate = (function (_super) {
    __extends(updateDate, _super);
    function updateDate(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=updateDate,p=c.prototype;
    updateDate.change = "update";
    return updateDate;
}(egret.Event));
egret.registerClass(updateDate,'updateDate');
//# sourceMappingURL=Event.js.map