
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/Characters/Characters.js",
	"bin-debug/Characters/KillMosterDemo.js",
	"bin-debug/FindPath/Astar.js",
	"bin-debug/FindPath/Grid.js",
	"bin-debug/FindPath/Map.js",
	"bin-debug/Other/Locations.js",
	"bin-debug/FindPath/Node.js",
	"bin-debug/Main.js",
	"bin-debug/Other/enum.js",
	"bin-debug/Other/Event.js",
	"bin-debug/Other/LoadingUI.js",
	"bin-debug/RPGUser/Arms.js",
	"bin-debug/RPGUser/Hero.js",
	"bin-debug/RPGUser/Jewel.js",
	"bin-debug/RPGUser/RPGUser.js",
	"bin-debug/RPGUser/User.js",
	"bin-debug/RPGUserPanel/UserPanel.js",
	"bin-debug/TaskSystem/Npc.js",
	"bin-debug/TaskSystem/Observer.js",
	"bin-debug/TaskSystem/TalkPanel.js",
	"bin-debug/TaskSystem/Task.js",
	"bin-debug/TaskSystem/TaskPanel.js",
	"bin-debug/TaskSystem/TaskService.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};