var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITED"] = 4] = "SUBMITED";
})(TaskStatus || (TaskStatus = {}));
var TaskRelate;
(function (TaskRelate) {
    TaskRelate[TaskRelate["PROMULGATOR"] = 0] = "PROMULGATOR";
    TaskRelate[TaskRelate["DELIVERYMAN"] = 1] = "DELIVERYMAN";
    TaskRelate[TaskRelate["BOTH"] = 2] = "BOTH"; //两者都是
})(TaskRelate || (TaskRelate = {}));
var Animation;
(function (Animation) {
    Animation[Animation["UP"] = 0] = "UP";
    Animation[Animation["DOWN"] = 1] = "DOWN";
    Animation[Animation["LEFT"] = 2] = "LEFT";
    Animation[Animation["RIGHT"] = 3] = "RIGHT";
})(Animation || (Animation = {}));
//# sourceMappingURL=enum.js.map