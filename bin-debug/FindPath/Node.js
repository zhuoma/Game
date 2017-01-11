var Pnode = (function (_super) {
    __extends(Pnode, _super);
    function Pnode(x, y) {
        _super.call(this, x, y);
        this.walkable = true;
        this.costMultipier = 1; //消耗
    }
    var d = __define,c=Pnode,p=c.prototype;
    return Pnode;
}(Locations));
egret.registerClass(Pnode,'Pnode');
//# sourceMappingURL=Node.js.map